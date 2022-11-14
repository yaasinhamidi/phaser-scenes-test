class SceneBoot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        console.log('BootScene Entry');
        this.load.image('yellow-button','src/assets/images/yellow-button.png');
        this.load.image('empty','src/assets/images/empty.png');
    }

    create(){
        this.scene.start('Preload');
    }

}