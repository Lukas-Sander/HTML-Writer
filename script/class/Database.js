'use strict';

class Database {
    #db = null;

    constructor() {
    }

    init(dbName) {
        const me = this;

        return new Promise((resolve, reject) => {

            const request = indexedDB.open(dbName, 5);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Document Cache store (filename: string, content: largetext)
                if (!db.objectStoreNames.contains('documentCache')) {
                    const store = db.createObjectStore('documentCache', {keyPath: 'id'});
                }
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
                    resolve(data);
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

    async cacheDocumentDb(name, content) {
        const me = this;
        return new Promise((resolve, reject) => {
            const transaction = me.#db.transaction(['documentCache'], "readwrite");
            const store = transaction.objectStore('documentCache');

            store.put({ id: 1, name: name, content: content });

            transaction.oncomplete = () => {
                resolve();
            };
            transaction.onerror = () => {
                reject();
            };
        })
    }
}