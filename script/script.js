'use strict';
document.addEventListener('DOMContentLoaded', async () => {
    const dbName = 'htmlWriterDatabase';

    const main = new Main();
    await main.initDb(dbName);
    await main.loadSettings();
    // await main.initScripts();
    await main.initAce();
    await main.initToolbar();
    await main.loadDocumentFromCache();
    main.updateToolbarInfo();
    await main.startPreviewUpdateListener();
    await main.startCachingListener();
});





    //
    //     const cacheTime = document.querySelector('.info-saved .value');
    //     // Initialize Ace Editor
    //     let htmlContent = "";
    //     const editor = ace.edit("editor");
    //     const beautify = ace.require("ace/ext/beautify"); // get reference to extension
    //     editor.setTheme("ace/theme/monokai");
    //     editor.session.setMode("ace/mode/html");
    //     editor.getSession().setOption("wrap", true);
    //
    //     var previewFrame = document.getElementById("preview");
    //     var previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    //
    //     // Initialize IndexedDB
    //     // const dbName = "htmlEditorDB";
    //     const storeName = "editorContent";
    //     // let db;
    //
    //     const request = indexedDB.open(dbName, 1);
    //     request.onerror = function (event) {
    //     console.error("Error opening IndexedDB:", event);
    // };
    //     request.onsuccess = function (event) {
    //     db = event.target.result;
    //     loadContentFromDB();
    // };
    //     request.onupgradeneeded = function (event) {
    //     db = event.target.result;
    //     db.createObjectStore(storeName, { keyPath: "id" });
    // };
    //
    //     function updatePreview() {
    //     const scrollY = previewFrame.contentWindow.scrollY;
    //     previewDoc.open();
    //     previewDoc.write(editor.getValue());
    //     previewDoc.close();
    //
    //     previewBody = previewDoc.body;
    //     previewBody.scrollTop = scrollY;
    // }
    //
    //     function printPreview() {
    //     previewFrame.contentWindow.focus(); // Ensure the iframe is focused
    //     previewFrame.contentWindow.print(); // Print the iframe content
    // }
    //
    //     function beautifyCode() {
    //     beautify.beautify(editor.session);
    // }
    //
    //     function saveFile() {
    //     const content = editor.getValue();
    //     const blob = new Blob([content], { type: "text/html" });
    //     const a = document.createElement("a");
    //     a.href = URL.createObjectURL(blob);
    //     a.download = "myfile.html";
    //     a.click();
    //     URL.revokeObjectURL(a.href);
    // }
    //
    //     function loadFile() {
    //     document.getElementById("fileInput").click();
    // }
    //
    //     function handleFileLoad(event) {
    //     const file = event.target.files[0];
    //     if (!file) return;
    //
    //     const reader = new FileReader();
    //     reader.onload = function (e) {
    //     editor.setValue(e.target.result, -1);
    //     updatePreview();
    // };
    //     reader.readAsText(file);
    // }
    //
    //     function loadContentFromDB() {
    //     const transaction = db.transaction([storeName], "readonly");
    //     const store = transaction.objectStore(storeName);
    //     const getRequest = store.get(1); // ID 1 for the first entry
    //
    //     getRequest.onsuccess = function (event) {
    //     const data = event.target.result;
    //     if (data) {
    //     htmlContent = data.content;
    //     editor.setValue(htmlContent, -1);
    //     updatePreview();
    // }
    // };
    // }
    //
    //     function cacheContent() {
    //     const content = editor.getValue();
    //     const transaction = db.transaction([storeName], "readwrite");
    //     const store = transaction.objectStore(storeName);
    //
    //     store.put({ id: 1, content: content });
    //
    //     const currentDate = new Date();
    //     cacheTime.innerText = currentDate.toLocaleString();
    // }
    //
    //     setInterval(cacheContent, 10000);
    //
    //     // Auto-save on page close or when hidden
    //     window.addEventListener("beforeunload", () => { cacheContent(); });
    //     document.addEventListener("visibilitychange", () => {
    //     if (document.hidden) {
    //     cacheContent();
    // }
    // });
    //
    //     editor.session.on("change", function () {
    //     updatePreview();
    // });
    //
    //     updatePreview();