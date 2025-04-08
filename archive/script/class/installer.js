class Installer {
    #deferredPrompt;


    constructor() {
        const me = this;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            me.#deferredPrompt = e;
        });
    }


    installPWA() {
        const me = this;
        if (me.#deferredPrompt) {
            me.#deferredPrompt.prompt();
        }
    }
}