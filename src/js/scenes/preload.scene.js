class ScenePreload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        console.log('PreloadScene Entry');

        this.load.script('src/js/classes/ui/bounceButton.class');
    }

    create(){
        this.scene.start('Title');
    }
}