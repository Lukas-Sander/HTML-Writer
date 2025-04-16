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
    },
    contextMenu: {
        /**
         * defines which context menu to use
         * both - custom and browser context menu
         * custom - only custom context menu
         * browser - only browser context menu
         */
        display: 'both',
        // cut
        // paste as base64
        // paste as raw text
        // insert template
        // select all
        // undo
        // redo
        // emoji
        // inspect
        // beautify
        // toggle comment?
        customMenuOptions: {
            copy: {
                text: 'Custom Context Function',
                onclick: function() {
                    navigator.clipboard.writeText(toolbar.ace.getSelectedText());
                }
            },
            paste: {
                text: "Paste",
                onclick: async () => {
                    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

                    if (isSafari) {
                        // For Safari, fall back to a textarea method
                        const textarea = document.createElement('textarea');
                        document.body.appendChild(textarea);
                        textarea.focus();
                        textarea.select();

                        // Try executing the paste command (works in some cases)
                        try {
                            document.execCommand('paste');
                            const clipboardText = textarea.value;
                            if (clipboardText) {
                                const editor = toolbar.ace;
                                const selection = editor.getSelection();
                                const range = selection.getRange();
                                if (!range.isEmpty()) {
                                    editor.session.replace(range, clipboardText);
                                } else {
                                    editor.session.insert(editor.getCursorPosition(), clipboardText);
                                }
                            }
                        } catch (err) {
                            console.error('Paste failed:', err);
                            alert('Unable to paste from clipboard. Please paste manually.');
                        }

                        // Clean up the temporary textarea
                        document.body.removeChild(textarea);
                    } else {
                        // For non-Safari browsers, use the Clipboard API
                        const clipboardText = await navigator.clipboard.readText();
                        if (!clipboardText) return;

                        const editor = toolbar.ace;
                        const selection = editor.getSelection();
                        const range = selection.getRange();

                        if (!range.isEmpty()) {
                            editor.session.replace(range, clipboardText);
                        } else {
                            editor.session.insert(editor.getCursorPosition(), clipboardText);
                        }
                    }
                }
            }
        },
    }
};
//TODO: later, add customizable shortcuts