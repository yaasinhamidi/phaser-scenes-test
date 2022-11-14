CONFIG = {
    GAME_INFO: {
        HEIGHT: 720,
        WIDTH: 1280,
        TITLE:'Scenes Test',
        RESOLUTION: window.devicePixelRatio || 1,
        GRAPHICS_MODE: 'AUTO',
        HEADLESS: false,
        TAG_ID: "game_scene",
        NO_SLEEP: true,
        SHOW_VERSION_: true,
        TRANSPARENT: true,
    },
    PATH: {
        CSS: "css/",
        JS: "js/",
        PHASER: "phaser/",
        IMAGES: "assets/images/",
        AUDIO: "assets/sounds/",
        FONTS: "assets/fonts/",
        LANGUAGES: "assets/languages/",
        SCENES: "scenes/",
        UTILS: "utils/",
        UI: "ui/",
        MODEL_CONTROLLER: "modelController/",
        COMPONENTS: "components/",
        SERVICES: "services/",
        CLASSES: "classes/",
        NODE_MODULES: "node_modules/",
        LIBS: "libs/",
    },
    TAG_NAME: {
        SCRIPT: "script",
        STYLE: "link",
        GAME: "div",
    },
    PHYSICS: {
        ENABLE: true,
        DEFAULT: 'arcade',
        DEBUG: false
    },
    DEBUG: true,
    DEFAULT: {
        LANGUAGE: "en",
        FONT_NAME: "tahoma",
    },
    SCENES: {
        LIST: [
            "boot",
            "preload",
            "title",
            "preloadGameAssets",
            "game",
        ],
        ITEMS: function () {
            return [
                SceneBoot,
                ScenePreload,
                SceneTitle,
                ScenePreloadGameAssets,
                SceneGame,
            ];
        }
    }
}


FILES_TO_LOAD = [
    {
        "list": [
            "style",
        ],
        "tagName": CONFIG.TAG_NAME.STYLE,
        "mainPath": CONFIG.PATH.CSS,
        "otherAttributes": {
            "rel": "stylesheet",
            "type": "text/css",
            "href": "{$mainPath}{$item}.css",
        }
    },
    {
        "list": [
            (CONFIG.DEBUG ? CONFIG.PATH.PHASER + "dist/phaser" : CONFIG.CDN.PHASER + "phaser.min") + "",
            (CONFIG.PHYSICS.ENABLE && CONFIG.PHYSICS.DEFAULT === "arcade") ?
                (CONFIG.DEBUG ? CONFIG.PATH.PHASER + "dist/phaser-arcade-physics"
                    : CONFIG.CDN.PHASER + "phaser-arcade-physics.min") + "" : null,
            (CONFIG.PHYSICS.ENABLE && CONFIG.PHYSICS.DEFAULT === "matter") ?
                (CONFIG.DEBUG ? "dist/" : "") + "matter-js/build/matter" : null,
        ],
        "tagName": CONFIG.TAG_NAME.SCRIPT,
        "mainPath": (CONFIG.DEBUG ? "../" + CONFIG.PATH.NODE_MODULES
            : CONFIG.CDN.MAIN + CONFIG.CDN.JS),
        "otherAttributes": {
            "src": "{$mainPath}{$item}.js",
        }
    },
    {
        "list": ["main",],
        "tagName": CONFIG.TAG_NAME.SCRIPT,
        "mainPath": CONFIG.PATH.JS + CONFIG.PATH.CLASSES,
        "otherAttributes": {
            "src": "{$mainPath}{$item}.js",
        }
    },
    {
        "list": CONFIG.SCENES.LIST,
        "tagName": CONFIG.TAG_NAME.SCRIPT,
        "mainPath": CONFIG.PATH.JS + CONFIG.PATH.SCENES,
        "otherAttributes": {
            "src": "{$mainPath}{$item}.scene.js",
        }
    },
    {
        "list": [
            CONFIG.DEFAULT.LANGUAGE
        ],
        "tagName": CONFIG.TAG_NAME.SCRIPT,
        "mainPath": CONFIG.PATH.LANGUAGES,
        "otherAttributes": {
            "src": "{$mainPath}{$item}.language.js",
        }
    }
];