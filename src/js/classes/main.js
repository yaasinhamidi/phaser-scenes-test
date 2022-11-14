class initGame {
    constructor() {
        if (typeof window.init !== "undefined") {
            return;
        }

        window.init = true;
        let marginX2 = false;
        const config = {
            type: Phaser[CONFIG.GAME_INFO.GRAPHICS_MODE],
            width: CONFIG.GAME_INFO.WIDTH,
            height: CONFIG.GAME_INFO.HEIGHT,
            parent: CONFIG.GAME_INFO.TAG_ID,
            scene: CONFIG.SCENES.ITEMS(),
            scale: {
                //mode: Phaser.Scale.FIT ,
                //autoCenter: Phaser.Scale.CENTER_VERTICALLY
            },
            resolution: CONFIG.GAME_INFO.RESOLUTION,
            input: {
                activePointers: 3,
            },
            /*plugins: {
                global: [
                    {
                        key: 'rexPerspectiveImagePlugin',
                        plugin: rexperspectiveimageplugin,
                        start: true
                    },
                ]
            },*/
            /*dom: {
                createContainer: true
            },*/
            transparent: CONFIG.GAME_INFO.TRANSPARENT,
        };

        if(CONFIG.GAME_INFO.GRAPHICS_MODE === 'HEADLESS'){
            config.autoFocus = false;
        }

        if (CONFIG.PHYSICS.ENABLE) {
            config.physics = {
                default: CONFIG.PHYSICS.DEFAULT,
                [CONFIG.PHYSICS.DEFAULT]: {
                    debug: CONFIG.PHYSICS.DEBUG,
                }
            };
        }



        const game = new Phaser.Game(config);

        game.centerX = game.config.width / 2;
        game.centerY = game.config.height / 2;
        game.scaleWidth = CONFIG.GAME_INFO.WIDTH / 640;
        game.scaleHeight = CONFIG.GAME_INFO.HEIGHT / 480;

        const gameElement = document.getElementById(CONFIG.GAME_INFO.TAG_ID);
        const canvas = gameElement.getElementsByTagName("canvas")[0];

        game.element = gameElement;

        if (config.width < config.height) {
            canvas.style.height = "100%";
            gameElement.style.height = "100%";
            gameElement.style.width = "auto";
        } else {
            canvas.style.width = "100%";
            gameElement.style.width = "100%";
            gameElement.style.height = "100%";
        }
        const onResizeWindow = function () {

        };

        window.addEventListener("resize", onResizeWindow.bind(config, canvas));

        onResizeWindow();

        // load fonts

    }
}