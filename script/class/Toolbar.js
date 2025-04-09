'use strict';

class Toolbar {
    #ace;
    #aceBeautify;
    #container;
    #tools;
    #main;
    #documentNameDOM;
    #cacheTimeDOM;

    constructor(db, ace, aceBeautify) {
        const me = this;
        me.#ace = ace;
        me.#aceBeautify = aceBeautify;
    }

    async init(main) {
        const me = this;
        me.#main = main;
        me.#container = document.querySelector('#toolbar');
        me.#tools = me.#container.querySelector('.toolbar-tools');
        me.#documentNameDOM = me.#container.querySelector('#documentName');
        me.#cacheTimeDOM = me.#container.querySelector('#documentCacheTime');

        for (const [key, value] of Object.entries(settings.toolbar)) {
            me.#addToolbarEntry(key, value);
        }
    }

    #addToolbarEntry (key, conf) {
        const entry = document.createElement(conf.tag);

        switch (conf.tag) {
            case 'BUTTON':
                entry.innerText = conf.text;
                entry.addEventListener('click', conf.onclick);
                break;
            case 'INPUT':
                entry.type = conf.type;
                entry.style.display = conf.style.display;
                entry.accept = conf.accept;
                entry.id = conf.id;
                entry.addEventListener('change', conf.onchange);
                break;
            default:
                break;
        }
        this.#tools.appendChild(entry);

    }
    beautifyCode() {
        this.#aceBeautify.beautify(this.#ace.session);
    }
    printPreview() {
        const previewFrame = document.getElementById("preview");
        previewFrame.contentWindow.focus(); // Ensure the iframe is focused
        previewFrame.contentWindow.print(); // Print the iframe content
    }

    saveDocument() {
        const content = this.#ace.getValue();
        const blob = new Blob([content], { type: "text/html" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "DOCUMENTNAME.html";
        a.click();
        URL.revokeObjectURL(a.href);
    }

    loadDocument() {
        document.getElementById("documentLoadInput").click();
    }

    handleDocumentLoad(event) {
        const me = this;
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            me.#ace.setValue(e.target.result, -1);
            me.#main.updatePreview();
            me.#main.documentName = file.name;
            me.#main.cacheDocument();
        };
        reader.readAsText(file);
    }

    updateDocumentName(name) {
        this.#documentNameDOM.innerText = name;
    }

    updateDocumentCachetime(timeStr) {
        this.#cacheTimeDOM.innerText = timeStr;
    }
}
