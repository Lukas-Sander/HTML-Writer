'use strict';

/**
 * main program. no other classes should be accessed from the plain script
 */
// TODO: split into Application, Frontend, Backend classes
class Main {
    #db;
    toolbar;
    #ace;
    #aceBeautify;
    #previewFrame = document.getElementById("preview");
    #previewDoc = this.#previewFrame.contentDocument || this.#previewFrame.contentWindow.document;
    #cacheTimeout;
    documentName;

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
            const data = await me.#db.getDocumentCache();
            me.#ace.setValue(data.content, -1);
            me.documentName = data.name;
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

    async startCachingListener() {
        const me = this;
        // Auto-cache on page close or when hidden
        window.addEventListener("beforeunload", () => { me.cacheDocument(); });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                clearTimeout(me.#cacheTimeout);
                me.cacheDocument();
            }
        });

        //start listener on code change with scheduler
        this.#ace.session.on("change", function () {
            clearTimeout(me.#cacheTimeout);
            me.scheduleUpdatePreview();
        });
    }

    scheduleUpdatePreview() {
        const me = this;
        clearTimeout(me.#cacheTimeout);
        me.#cacheTimeout = setTimeout(function () {
            me.cacheDocument();
        }, 10000);  //10 seconds wait time until we start caching
    }

    /**
     * save document cache into indexedDB
     */
    async cacheDocument() {
        const me = this;
        const content = me.#ace.getValue();
        const name = me.documentName;
        await me.#db.cacheDocumentDb(name, content);

        me.toolbar.updateDocumentName(name);

        const currentDate = new Date();
        this.toolbar.updateDocumentCachetime(currentDate.toLocaleString());
    }

    updateToolbarInfo() {
        this.toolbar.updateDocumentName(this.documentName);
    }

    async initContextMenu() {
        const me = this;
        const menu = document.querySelector('.context-menu');
        if(menu) {
            //create context menu items
            for (const [key, value] of Object.entries(settings.contextMenu.customMenuOptions)) {
                const li = document.createElement("li");
                li.innerText = value.text;
                li.addEventListener("click", () => {
                    value.onclick();
                });
                menu.append(li);
            }
            //initialize context menu
            document.getElementById("editor").addEventListener("contextmenu", function (e) {
                // e.preventDefault();

                menu.style.left = `calc(${e.pageX}px - 165px)`;
                menu.style.top = `${e.pageY}px`;
                menu.style.display = "block";
            });

            // Hide on click outside
            document.addEventListener("click", function (e) {
                // if (!menu.contains(e.target)) {
                menu.style.display = "none";
                // }
            });

            me.#previewFrame.addEventListener("load", () => {
                me.#previewDoc.addEventListener("click", () => {
                    menu.style.display = "none";
                });
            });

            window.addEventListener("blur", () => {
                menu.style.display = "none";
            });
            document.addEventListener('keydown', function(e) {
                if (menu.style.display === 'block') {
                    menu.style.display = "none";
                }
            });
        }
    }

    async initMobileButtons() {
        let container = document.getElementById('content');
        return new Promise(async (resolve) => {
            document.querySelectorAll('.switch-view').forEach((el) => {
                el.addEventListener('click', () => {
                    container.classList.toggle('view-preview');
                })
            });

            resolve();
        });
    }
}
