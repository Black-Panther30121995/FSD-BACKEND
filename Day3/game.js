// Global Variables
let game;

// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Dynamically load images and sounds from config.json
        for (const key in _CONFIG.imageLoader) {
            this.load.image(key, _CONFIG.imageLoader[key]);
        }
        for (const key in _CONFIG.soundsLoader) {
            this.load.audio(key, [_CONFIG.soundsLoader[key]]);
        }

        // Load any default assets you may need
        this.load.image('heart', 'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/heart.png');
        this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");
        this.load.bitmapFont('pixelfont',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.png',
            'https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/pix.xml');

        // Add event listeners
        addEventListenersPhaser.call(this);

        // Display a loading progress bar
        displayProgressLoader.call(this);
    }

    create() {
        // Set up game variables
        this.vfx = new VFXLibrary(this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.score = 0;
        this.level = 0;
        this.playerSpeed = 400;
        this.playerSpeedOnTouch = this.playerSpeed * 2;

        this.maxEnemySpeed = 1000;
        this.enemySpeed = 100;
        this.enemySpeedInc = 40;

        this.maxEnemies = 15;
        this.minSpawnerInterval = 100;
        this.enemySpawnTimeInteval = 500;

        this.pointerDown = false;
        this.px = 0;
        this.py = 0;

        // Load sounds
        this.sounds = {};
        for (const key in _CONFIG.soundsLoader) {
            this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
        }

        // Background setup
        this.bg = this.add.sprite(0, 0, 'background').setOrigin(0);
        const scale = Math.max(this.game.config.width / this.bg.displayWidth, this.game.config.height / this.bg.displayHeight);
        this.bg.setScale(scale);

        // Start background sound loop
        this.sounds.background.setVolume(3).setLoop(true).play();

        // Score and level UI setup
        this.scoreText = this.add.bitmapText(this.width / 2, 10, 'pixelfont', 'Score: 0', 35).setDepth(11).setTint(0xffa500).setOrigin(0.5, 0);
        this.levelText = this.add.bitmapText(20, 20, 'pixelfont', 'Level: 0', 28).setDepth(11);
        this.levelUpText = this.add.bitmapText(this.width / 2, 100, 'pixelfont', 'LEVEL UP', 50).setOrigin(0.5, 0.5).setAlpha(0).setDepth(11);

        // Initialize hearts (lives)
        this.lives = 3;
        this.hearts = [];
        for (let i = 0; i < this.lives; i++) {
            let x = 40 + (i * 35);
            this.hearts[i] = this.add.image(x, 100, "heart").setScale(0.025).setDepth(11);
        }

        // Set up pause button
        this.pauseButton = this.add.image(this.game.config.width - 60, 60, "pauseButton");
        this.pauseButton.setInteractive({ cursor: 'pointer' });
        this.pauseButton.setScale(2).setScrollFactor(0).setDepth(11);
        this.pauseButton.on('pointerdown', () => this.pauseGame());

        // Keyboard input for movement
        this.cursor = this.input.keyboard.createCursorKeys();

        // Set up the player sprite
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'player');
        this.player.setScale(0.15).setDepth(11);
        this.player.body.setSize(this.player.body.width / 1.5, this.player.body.height / 1.5);
        this.player.setCollideWorldBounds(true);

        // Particle effects setup
        this.particleEmitter = this.vfx.createEmitter('avoidable', 0, 0, 0.02, 0, 600).setAlpha(0.5);
        this.whiteParticle = this.vfx.addCircleTexture('whiteCircle', 0xffffff, 1, 8);
        this.followEmitter = this.vfx.createEmitter('whiteCircle', 0, 0, 1, 0, 600).setAlpha(0.8);
        this.followEmitter.startFollow(this.player);
        this.playerParticleEmitter = this.vfx.createEmitter('player', 0, 0, 0.03, 0, 1000).setAlpha(0.5);

        // Enemies group setup
        this.enemies1 = this.physics.add.group();

        // Timer for enemy spawn
        this.enemyTimer = this.time.addEvent({ delay: this.enemySpawnTimeInteval, callback: this.spawnEnemy, callbackScope: this, loop: true });

        // Timer for score and level increment
        this.time.addEvent({ delay: 1000, callback: this.incrementScoreAndLevel, callbackScope: this, loop: true });

        // Handle touch input
        this.input.on('pointerdown', () => {
            this.pointerDown = true;
        });
        this.input.on('pointerup', () => {
            this.pointerDown = false;
        });
        this.input.keyboard.disableGlobalCapture();
    }

    update(time, delta) {
        if (this.gameOverFlag) return;
        this.player.setVelocity(0);

        // Player movement logic
        this.followEmitter.stop();
        if (this.cursor.left.isDown) {
            this.followEmitter.start();
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.cursor.right.isDown) {
            this.followEmitter.start();
            this.player.setVelocityX(this.playerSpeed);
        }

        if (this.cursor.up.isDown) {
            this.followEmitter.start();
            this.player.setVelocityY(-this.playerSpeed);
        } else if (this.cursor.down.isDown) {
            this.followEmitter.start();
            this.player.setVelocityY(this.playerSpeed);
        }

        // Move player to touch position if pointer is down
        if (this.pointerDown && !this.player.body.hitTest(this.input.x, this.input.y)) {
            this.physics.moveTo(this.player, this.input.x, this.input.y, this.playerSpeedOnTouch);
        }

        // Collide player with enemies
        this.physics.world.collide(this.player, this.enemies1, this.playerHit, null, this);
    }

    updateScore(points) {
        this.score += points;
        this.updateScoreText();
    }

    updateLevel(lvl = 1) {
        this.level = lvl;
        this.updateLevelText();
    }

    incrementScoreAndLevel() {
        let oldLevel = this.level;
        this.updateScore(10);
        this.level = Math.floor(this.score / this.levelScoreThreshold);
        this.updateLevel(this.level);
        if (oldLevel < this.level) {

            if (this.gameOverFlag) return;
            this.vfx.blinkEffect(this.levelUpText, 400, 3);
            this.sounds.success.setVolume(0.7).setLoop(false).play()
            if (this.enemySpawnTimeInteval > this.minSpawnerInterval && !(this.level % 3)) {
                this.enemySpawnTimeInteval -= 20;
            }
            if (this.enemySpeed < this.maxEnemySpeed) {
                this.enemySpeed += this.enemySpeedInc;
            }
            if (!(this.level % 3)) {
                this.maxEnemies -= 1;
            }
            this.time.removeEvent(this.enemyTimer);
            this.enemyTimer = this.time.addEvent({ delay: this.enemySpawnTimeInteval, callback: this.spawnEnemy, callbackScope: this, loop: true });
        }
    }

    spawnEnemy() {
        if (this.enemies1.getChildren().length > this.maxEnemies) {
            this.enemies1.remove(this.enemies1.getChildren()[0], true, true);
        }
        let enemy;
        let x, y, tox, toy;
        let randu = Phaser.Math.Between(0, 3);

        if (randu === 0) {
            x = Phaser.Math.Between(0, this.game.config.width - 20);
            y = 0;
        } else if (randu === 1) {
            x = Phaser.Math.Between(0, this.game.config.width - 20);
            y = this.game.config.height;
        } else if (randu === 2) {
            x = 0;
            y = Phaser.Math.Between(0, this.game.config.height - 20);
        } else {
            x = this.game.config.width;
            y = Phaser.Math.Between(0, this.game.config.height - 20);
        }

        tox = Phaser.Math.Between(0, this.game.config.width);
        toy = Phaser.Math.Between(0, this.game.config.height);

        enemy = this.enemies1.create(x, y, "avoidable");
        enemy.setScale(0.14);
        enemy.body.setSize(enemy.body.width / 1.5, enemy.body.height / 1.5);
        this.physics.moveTo(enemy, tox, toy, this.enemySpeed);
        Math.random() < 0.5 ? -50 : 50;
        enemy.setAngularVelocity(Math.random() < 0.5 ? -80 : 80);
        this.tweens.add({
            targets: enemy,
            scale: enemy.scale + 0.02,
            duration: 600,
            yoyo: true,
            loop: -1,
            ease: "sine.inout",
        });
    }

    // Placeholder function to handle collision logic
    playerHit(player, enemy) {
        // Decrease lives when player is hit
    this.lives--;

    // Play sound when the player is hit
    this.sounds.damage.setVolume(0.7).setLoop(false).play();

    // Create explosion particles at enemy's position
    this.particleEmitter.explode(100, enemy.x, enemy.y);

    // Destroy the enemy object
    enemy.destroy();

    // Remove heart icons based on remaining lives
    this.hearts[this.lives].destroy();

    // Add screen shake effect
    this.vfx.shakeCamera(200, 0.01);

    // Check if lives are over (game over condition)
    if (this.lives <= 0) {
        this.gameOverFlag = true;
        this.hearts[this.lives].destroy();  // Destroy the last heart
        this.followEmitter.stop();  // Stop the follow emitter
        this.physics.pause();  // Pause the physics world
        this.sound.stopAll();  // Stop all sounds
        this.player.setTint(0xff0000);  // Tint the player red (indicating damage)

        // After a short delay, trigger game over animation and reset
        this.time.delayedCall(1000, () => {
            // Trigger particle explosion on the player's position
            this.playerParticleEmitter.explode(400, player.x, player.y);

            // Play game over sound
            this.sounds.loose.setVolume(0.7).setLoop(false).play();

            // Add a more intense screen shake effect
            this.vfx.shakeCamera(300, 0.04);

            // Destroy the player object
            this.player.destroy();

            // Wait for 2 seconds before calling game over function
            this.time.delayedCall(2000, () => {
                this.gameOver();
            });
        });
    }

    // Add rotation effect to the player (or any other desired visual effect)
    this.vfx.rotateGameObject(this.player, 400);
    }

    // Pause Game logic (if needed)
    pauseGame() {
        // Pause game implementation
        // If the game is already paused, resume it
    if (this.scene.isPaused()) {
        this.scene.resume();  // Resume the game scene
        this.sounds.background.resume();  // Resume background music
        this.pauseButton.setTexture('pauseButton');  // Change button back to 'pause'
    } else {
        // If the game is not paused, pause it
        this.scene.pause();  // Pause the game scene
        this.sounds.background.pause();  // Pause background music
        this.pauseButton.setTexture('playButton');  // Change button to 'play'
    }
    }

    // Update Score Text
    updateScoreText() {
        this.scoreText.setText('Score: ' + this.score);
    }

    // Update Level Text
    updateLevelText() {
        this.levelText.setText('Level: ' + this.level);
    }
}

// Game configuration
const gameConfig = {
    type: Phaser.AUTO,
    width: _CONFIG.deviceOrientationSizes.landscape.width,
    height: _CONFIG.deviceOrientationSizes.landscape.height,
    scene: GameScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// Initialize and start the game
game = new Phaser.Game(gameConfig);
