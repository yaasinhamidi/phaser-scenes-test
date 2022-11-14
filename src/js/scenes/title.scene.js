class SceneTitle extends Phaser.Scene {
    constructor() {
        super("Title");
    }

    preload() {
        console.log('TitleScene Entry');
    }

    create(){
        new BounceButton({
            scene: this,
            x: this.game.centerX,
            y: this.game.centerY + 112,
            text: {
                type: "text",
                value: 'Push To enter to Game Scene',
                style: {
                    fontSize: 50,
                    fill: '#FFFFFF',
                    stroke: '#0C5F87',
                    strokeThickness: 2,
                },
            },
            background: {
                value: "yellow-button",
            },
            onPush: this.GoToGameScene.bind(this),
        });
    }

    GoToGameScene(){
        this.scene.start('GameScene');
    }
}