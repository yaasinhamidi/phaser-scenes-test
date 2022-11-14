
if (!Object.keys) Object.keys = function (o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on non-object');
    let ret = [], p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) ret.push(p);
    return ret;
}

class Loader {
    constructor(operator) {
        if (typeof operator !== "undefined" && typeof window.loader === "undefined") {
            window.loader = true;
            switch (operator) {
                case "primary":

                    this.loadConfig();
                    break;
            }
        }
    }

    initLoader() {
        const preloads = {
            roller: `
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            `,
            ellipsis: `
                <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        `
        };
        const beforePreloader = document.createElement('div');
        beforePreloader.id = "before-preloader";
        let TextBeforePreloader;
        switch (CONFIG.DEFAULT.LANGUAGE) {
            case "en":
                TextBeforePreloader = `
            <div id="before-preloader-text" class='ltr' style="color:#fff;">
                On initializing
                <br/>
                We sincerely thank you for your patience.
            </div>
        `;
                break;
        }
        beforePreloader.innerHTML = TextBeforePreloader + preloads.ellipsis;
        document.body.append(beforePreloader);
    }

    loadConfig() {
        this.loadAssets(
            ["config"],
            "script",
            "js/classes/",
            {"src": "{$mainPath}{$item}.js"},
            this.appendPrimaryHTMLTagsAndRenamePageTitle.bind(this)
        );
    }

    appendPrimaryHTMLTagsAndRenamePageTitle() {
        if (CONFIG.DEBUG && typeof window.gameLoaded === 'undefined') {
            const watcher = document.createElement('script');
            watcher.src = `//${window.location.hostname}:35729/livereload.js?snipver=1`;
            watcher.async = true;
            watcher.defer = true;
            document.body.append(watcher)
        }
        this.initLoader();
        const GameElement = document.createElement(CONFIG.TAG_NAME.GAME);
        GameElement.id = CONFIG.GAME_INFO.TAG_ID;
        document.title = CONFIG.GAME_INFO.TITLE;
        document.body.append(GameElement);
        this.loadFiles();
    }

    loadFiles(files) {

        if (typeof files === "undefined") {
            files = FILES_TO_LOAD;
        } else {
            files.shift();
        }

        if (files.length !== 0) {
            const file = files[0];
            this.loadAssets(
                file.list,
                file.tagName,
                file.mainPath,
                file.otherAttributes,
                this.loadFiles.bind(this, files)
            );
        } else {
            this.initGame();
        }
    }

    loadAssets(list, tagName, mainPath, otherAttributes, callBack) {
        if (list[0] !== null) {
            const element = document.createElement(tagName),
                otherAttributesKeys = Object.keys(otherAttributes);
            for (let i = 0; i < otherAttributesKeys.length; i++) {
                element.setAttribute(
                    otherAttributesKeys[i],
                    otherAttributes[otherAttributesKeys[i]]
                        .replace("{$mainPath}", "src/"+mainPath)
                        .replace("{$item}", list[0])
                );
            }
            if (tagName === "script") {
                element.async = true;
            }
            element.onload = this.shiftAssets.bind(this, list, tagName, mainPath, otherAttributes, callBack);
            document.head.appendChild(element);
            element.onerror = function () {
                alert("Something wrong please refresh page!");
            };
        } else {
            this.shiftAssets.bind(this, list, tagName, mainPath, otherAttributes, callBack)();
        }
    }

    shiftAssets(list, tagName, mainPath, otherAttributes, callBack) {
        list.shift();
        if (list.length !== 0) {
            this.loadAssets(list, tagName, mainPath, otherAttributes, callBack)
        } else if (typeof callBack === "function") {
            callBack();
        }
    }

    initGame() {
        new initGame();
    }
}

new Loader("primary");