'use strict';

class Database {
    #db = null;

    constructor() {
        // const me = this;
    }

    init(dbName) {
        const me = this;

        return new Promise((resolve, reject) => {

            const request = indexedDB.open(dbName, 5);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                //
                // // Settings store (appSettings = whole settings JSON)
                // if (!db.objectStoreNames.contains('settings')) {
                //     db.createObjectStore('settings');
                // }

                // Document Cache store (id + name per file)
                if (!db.objectStoreNames.contains('documentCache')) {
                    const store = db.createObjectStore('documentCache', {keyPath: 'id'});
                }
                //
                // /**
                //  * Scripts store (id + URL + script content)
                //  * {
                //  *   name: 'ace',
                //  *   url: 'https://cdnjs.cloudflare.com/.../ace.js',
                //  *   code: '...script contents...'
                //  * }
                //  */
                // if (!db.objectStoreNames.contains('scripts')) {
                //     const store = db.createObjectStore('scripts', {keyPath: 'name'});
                //     store.createIndex('url', 'url', {unique: true});
                // }

                // // Templates store (name + html string)
                // if (!db.objectStoreNames.contains('templates')) {
                //     db.createObjectStore('templates', {keyPath: 'name'});
                // }
            };

            //upon success, save db instance in runtime
            request.onsuccess = (event) => {
                me.#db = event.target.result;

                //add event listener for persistent storage. once per start of tool
                document.addEventListener("click", me.#requestPersistentStorage, {once: true});

                resolve(me.#db);
            };

            request.onerror = () => {
                console.error('DB init failed:', request.error);
                reject(request.error);
            };

        });
    }

    /**
     * requests persistent storage once upon first page interaction, once.
     * @returns {Promise<void>}
     */
    #requestPersistentStorage = async () => {
        const me = this;
        if (navigator.storage && navigator.storage.persist) {
            const isPersistent = await navigator.storage.persisted();
            if (isPersistent) {
                console.debug("Persistent storage already granted.");
                return;
            }

            console.debug("Requesting persistent storage...");
            const granted = await navigator.storage.persist();
            console.debug(`Persistent storage granted: ${granted}`);
        } else {
            console.warn("Persistent storage API not supported.");
        }

        // Remove listener after the first attempt
        document.removeEventListener("click", me.#requestPersistentStorage);
    };

    async getDocumentCache() {
        const me = this;
        return new Promise(async (resolve, reject) => {
            const transaction = me.#db.transaction(['documentCache'], "readonly");
            const store = transaction.objectStore('documentCache');
            const getRequest = store.get(1); // ID 1 for the first entry

            getRequest.onsuccess = function (event) {
                const data = event.target.result;
                if (data) {
                    resolve(data.content);
                }
                else {
                    resolve(null);
                }
            };

            getRequest.onerror = function (event) {
                reject(event);
            }
        })
    }

    // /**
    //  * takes a number of names with corresponsing urls and returns the missing or mismatched entries.
    //  * name missing from db = missing
    //  * name match, url mismatch = mismatch
    //  * @param {Object} scriptsObj
    //  * @returns {Promise<*[]>}
    //  */
    // async getMissingScripts(scriptsObj) {
    //     const db = this.#db;
    //     const tx = db.transaction('scripts', 'readonly');
    //     const store = tx.objectStore('scripts');
    //
    //     const missingOrMismatched = [];
    //
    //     for (const [name, url] of Object.entries(scriptsObj)) {
    //         const request = store.get(name);
    //         const result = await new Promise(res => {
    //             request.onsuccess = () => res(request.result);
    //             request.onerror = () => res(null);
    //         });
    //
    //         if (!result || result.url !== url) {
    //             missingOrMismatched.push(name);
    //         }
    //     }
    //
    //     return missingOrMismatched;
    // }

    // /**
    //  * read scripts from db and return them as an array (containing objects)
    //  * @param keys
    //  * @returns {Promise<*[]>}
    //  */
    // async getScripts(keys) {
    //     const db = this.#db;
    //     const tx = db.transaction('scripts', 'readonly');
    //     const store = tx.objectStore('scripts');
    //
    //     const result = [];
    //     for (const key of keys) {
    //         const request = store.get(key);
    //         const script = await new Promise(res => {
    //             request.onsuccess = () => res(request.result);
    //             request.onerror = () => res(null);
    //         });
    //         if (script) {
    //             result.push(script);
    //         }
    //     }
    //     return result;
    // }

    // /**
    //  * save script in the db with a unique key and url
    //  * @param name name of the script, unique
    //  * @param url url origin of the script, should be unique
    //  * @param code textcontent of the script
    //  * @returns {Promise<boolean|Event|OfflineAudioCompletionEvent|((result?: PaymentComplete) => Promise<void>)>}
    //  */
    // async saveScript(name, url, code) {
    //     const me = this;
    //     const tx = me.#db.transaction('scripts', 'readwrite');
    //     tx.objectStore('scripts').put({name: name, url: url, code: code});
    //     return tx.complete;
    // }

    // /**
    //  * read settings from db and return them. its a json object
    //  * @returns {Promise<unknown>}
    //  */
    // async getSettings() {
    //     const db = this.#db;
    //     const tx = db.transaction('settings', 'readonly');
    //     const store = tx.objectStore('settings');
    //     const request = store.get(settingsKey);
    //
    //     return await new Promise(res => {
    //         request.onsuccess = () => res(request.result);
    //         request.onerror = () => res(null);
    //     });
    // }
}