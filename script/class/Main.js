'use strict';

/**
 * main program. no other classes should be accessed from the plain script
 */
class Main {
    #db;
    #scriptLoader;
    toolbar;
    #ace;
    #aceBeautify;
    #previewFrame = document.getElementById("preview");
    #previewDoc = this.#previewFrame.contentDocument || this.#previewFrame.contentWindow.document;
    #cacheTimeout;

    /**
     * save the db instance into runtime and initialize it
     * @returns {Promise<unknown>}
     */
    async initDb(dbName) {
        const me = this;
        return new Promise(async (resolve) => {
            me.#db = new Database();
            await me.#db.init(dbName);
            resolve();
        });
    }

    /**
     * load settings from db and save them into runtime
     * @returns {Promise<unknown>}
     */
    async loadSettings() {
        const me = this;
        return new Promise(async (resolve) => {
            // me.#settings = await me.#db.getSettings();
            resolve();
        });
    }

    /**
     * init scriptloader.
     * then fetch-save (if necessary).
     * then load scripts into app
     * @returns {Promise<void>}
     */
    async initScripts() {
        const me = this;
        return new Promise(async (resolve) => {
            me.#scriptLoader = new ScriptLoader(me.#db);
            const l = me.#scriptLoader;
            // await l.init();
            await l.loadCore();
            await l.injectScripts();
            resolve();
        });
    }

    /**
     * initializes and starts toolbar
     * @returns {Promise<void>}
     */
    async initToolbar() {
        const me = this;
        me.toolbar = new Toolbar(me.#db, me.#ace, me.#aceBeautify);
        window.toolbar = me.toolbar;

        await me.toolbar.init(me);   //loads toolbar from db config
    }

    async initAce() {
        const editor = ace.edit("editor");

        editor.setTheme("ace/theme/monokai");
        editor.getSession().setOption("wrap", true);
        editor.session.setMode("ace/mode/html");
        this.#aceBeautify = ace.require("ace/ext/beautify");

        this.#ace = ace.edit("editor");
    }

    async loadDocumentFromCache() {
        const me = this;
        return new Promise(async (resolve) => {
            const content = await me.#db.getDocumentCache();
            me.#ace.setValue(content, -1);
            me.updatePreview();
            resolve();
        });
    }

    updatePreview() {
        const me = this;
        const scrollY = me.#previewFrame.contentWindow.scrollY;

        me.#previewDoc.open();
        me.#previewDoc.write(me.#ace.getValue());
        me.#previewDoc.close();

        me.#previewDoc.body.scrollTop = scrollY;
    }

    async startPreviewUpdateListener() {
        const me = this;
        this.#ace.session.on("change", function () {
            me.updatePreview();
        });
    }
}
