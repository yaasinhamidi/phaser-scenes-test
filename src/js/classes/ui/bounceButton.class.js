class BounceButton extends Phaser.GameObjects.Container {
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        super(config.scene);


        this.isItDisable = false;

        this.init(config);

        this.spawnButton();
    }

    init(config) {
        this.scene = config.scene;
        this.config = config;
    }

    spawnButton() {
        this.x = this.config.x;
        this.y = this.config.y;

        if (typeof this.config.background.atlas === "undefined") {
            this.background = this.scene.add.image(
                0, 0,
                this.config.background.value
            );

        } else {
            this.background = this.scene.add.image(
                0, 0,
                this.config.background.atlas,
                this.config.background.value
            );
        }
        this.add(this.background);

        const textStyle = {
            fontSize: 12 * this.scene.game.scaleHeight * 3,
            fontFamily: CONFIG.DEFAULT.FONT_NAME /*+ 'Bold'*/,
            padding: 10,
            lineSpacing: 20,
            align: 'center',
            fill: '#431A00',
            /*stroke: '#F2D48B',
            strokeThickness: 2,*/
            /*shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#F2D48B',
                blur: 1,
                stroke: false,
                fill: true
            },*/
            wordWrap: {
                width: this.background.displayWidth - 10,
            }
        }


        if (typeof this.config.text !== "undefined") {
            switch (this.config.text.type) {
                case "image":
                    this.text = this.scene.add.image(
                        0, 0,
                        this.config.text.value
                    );

                    break;

                case "text":
                    if (typeof this.config.text.style !== 'undefined') {
                        const keys = Object.keys(this.config.text.style);
                        for (let i = 0; i < keys.length; i++) {
                            textStyle[keys[i]] = this.config.text.style[keys[i]];
                        }
                    }
                    this.text = this.scene.add.text(
                        0, -5,
                        this.config.text.value,
                        textStyle
                    );
                    this.text.setOrigin(0.5, 0.5);
                    break;

            }

            this.add(this.text);
            if (typeof this.config.text.margin !== "undefined") {
                if (typeof this.config.text.margin.x !== "undefined") {
                    this.text.x += this.config.text.margin.x;
                }
                if (typeof this.config.text.margin.y !== "undefined") {
                    this.text.y += this.config.text.margin.y;
                }
            }
        }


        this.alternativeBackground = this.scene.add.image(
            0, 0,
            "empty"
        );

        this.add(this.alternativeBackground);

        this.alternativeBackground.displayHeight = this.background.displayHeight;
        this.alternativeBackground.displayWidth = this.background.displayWidth;

        this.interactiver = this.alternativeBackground.setInteractive();

        this.alternativeBackground.on("pointerdown", this.onPush, this);
        this.alternativeBackground.on("pointerup", this.onPull, this);
        this.alternativeBackground.on("pointerout", this.onOut, this);

        this.scene.children.bringToTop(this.background);
        this.scene.children.bringToTop(this.alternativeBackground);

        if (typeof this.text !== "undefined") {
            this.scene.children.bringToTop(this.text);
        }

        this.scene.add.existing(this);

        this.firstScale = this.background.scale;

    }

    onPush() {
        if (this.isItDisable) {
            return;
        }
        this.pushTween("push");
    }

    onPull() {
        if (typeof this.config.onPush === "function") {
            this.config.onPush();
        }
        this.pushTween("pull");
    }

    onOut() {
        if (this.isItDisable) {
            return;
        }
        this.pushTween("pull");
    }

    pushTween(status) {
        const pressure = (status === "push" ? 0.9 : 1);
        if (typeof this.text !== "undefined") {
            this.config.scene.tweens.add({
                targets: this.text,
                scale: this.firstScale * pressure,
                ease: 'Linear',
                duration: 100,
            });
        }
        this.config.scene.tweens.add({
            targets: this.background,
            scale: this.firstScale * pressure,
            ease: 'Linear',
            duration: 100,
        });
    }

    destroy(fromScene) {
        this.background.destroy();
        this.alternativeBackground.destroy();
        if (typeof this.text !== "undefined") {
            this.text.destroy();
        }
    }

}