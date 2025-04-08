const settings = {
    toolbar: {
        beautify: {
            tag: 'BUTTON',
            text: 'beautify',
            onclick: function() { toolbar.beautifyCode(); },
        },
        printPreview: {
            tag: 'BUTTON',
            text: 'print',
            onclick: function() { toolbar.printPreview(); },
        },
        saveDocument: {
            tag: 'BUTTON',
            text: 'save',
            onclick: function() { toolbar.saveDocument(); },
        },
        loadDocument: {
            tag: 'BUTTON',
            text: 'load',
            onclick: function() { toolbar.loadDocument(); },
        },
        documentFileInput: {
            id: 'documentLoadInput',
            tag: 'INPUT',
            type: 'file',
            style: {
                display: 'none',
            },
            accept: '.html',
            onchange: function(event) { toolbar.handleDocumentLoad(event); },
        }
    }
};
//TODO: later, add customizable shortcuts