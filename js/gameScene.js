/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Game Scene

// This class is the Game Scene
class GameScene extends Phaser.Scene {
	// Create an enemy truck
	createETruck() {
		// this will get a number between 1 and 1080;
		const ETruckYLocation = Math.floor(Math.random() * 1080) + 1
		// this will get a number between 1 and 50;
		let ETruckYVelocity = Math.floor(Math.random() * 50) + 1
		// this will add minus sign in 50% of cases
		ETruckYVelocity *= Math.round(Math.random()) ? 1 : -1
		const anETruck = this.physics.add.sprite(2000, ETruckYLocation, 'enemy')
		// Set the y coordinate velocity to -200
		anETruck.body.velocity.x = -150
		anETruck.body.velocity.y = ETruckYVelocity
		// Group for all enemy trucks
		this.ETruckGroup.add(anETruck)
	}
	// This method is the constructor.
	constructor() {
		super({
			key: 'gameScene'
		})
		// Create my variables
		// Create audio and set to null
		this.myAudio = null
		// Create background and set to null
		this.background = null
		// Create car and set to null
		this.car = null
		// Create crash and set to null
		this.crash = null
		// Create fire missile and set to false
		this.fireMissile = false
		// Create score and set to 0
		this.score = 0
		this.scoreText = null
		this.scoreTextStyle = {
			font: '55px Arial',
			fill: '#ffffff',
			align: 'center',
			position: 'absolute'
		}
		// Create Game over text
		this.gameOverText = null
		this.gameOverTextStyle = {
			font: '65px Arial',
			fill: '#ff0000',
			align: 'center'
		}
		// Create text for lives
		this.lives = 3
		this.livesText = null
		this.livesTextStyle = {
			font: '55px Arial',
			fill: '#ffffff',
			align: 'center'
		}
	}

	/* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
	 * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
	 * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to white. 
	 */
	init(data) {
		// Initialize backgroudn color to white
		this.cameras.main.setBackgroundColor('#ffffff')
	}

	// Handle asynchronous external file loading in a blocking manner. Used to load assets.
	preload() {
		console.log('Game Scene')
		// Loading the images
		this.load.image('gameSceneBackground', 'images/trackBackground.PNG')
		// Right car image
		this.load.image('carR', 'images/skylineCarRight.png')
		// Left car image
		this.load.image('carL', 'images/skylineCarLeft.png')
		// Car crash / destruction image
		this.load.image('carCrash', 'images/carCrash.png')
		// Tire image
		this.load.image('missile', 'images/tire.png')
		// Enemy car image
		this.load.image('enemy', 'images/enemyCar.png')
		// Loading the sounds
		// Tire sound for weapon/missile
		this.load.audio('laser', 'sound/tireShot.wav')
		// Explosion sounds for collisions with car
		this.load.audio('explosion', 'sound/carCrash.wav')
		// Explosion sounds for collisions with tire
		this.load.audio('explosion2', 'sound/tireCOL.wav')
		// Game over sound
		this.load.audio('boo', 'sound/cBoo.wav')
	}

	/* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
	 * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
	 */
	create(data) {
		// Scaling and setting background image to proper spot
		this.background = this.add.image(0, 0, 'gameSceneBackground').setScale(5.0)
		this.background.setOrigin(0, 0)
		this.car = this.physics.add.sprite(1920 / 2, 1080 - 100, 'carR')
		// Creating a group for the missiles
		this.missileGroup = this.physics.add.group()
		// Creating a group for the enemies
		this.ETruckGroup = this.add.group()
		this.createETruck()
		// Collisions between missiles and enemy trucks
		this.physics.add.collider(this.missileGroup, this.ETruckGroup, function(missileCollide, ETruckCollide) {
			// Destroy the enemy and missile
			ETruckCollide.destroy()
			missileCollide.destroy()
			// Play collision sound
			this.sound.play('explosion2')
			// Update score
			this.score = this.score + 1
			this.scoreText.setText('Score: ' + this.score.toString())
			// Create two more enemy trucks
			this.createETruck()
			this.createETruck()
		}.bind(this))

		// Assign the aduio variable to the proper sound
		this.myAudio = new Audio('../sound/gcSound.mp3');
		if (typeof this.myAudio.loop == 'boolean') {
			// Loop the audio
			this.myAudio.loop = true;
		} else {
			// Add event listener
			this.myAudio.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
		}
		// Play the audio
		this.myAudio.play();
		// Text for the users score
		this.scoreText = this.add.text(20, 20, 'Score: ' + this.score.toString(), this.scoreTextStyle)
		// Text for the users lives counter
		this.livesText = this.add.text(333, 20, 'Lives: ' + this.lives.toString(), this.livesTextStyle)
	}

	/* Replacing old content of the element with new provided content, and returning the element. This method is called once 
	 * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
	 */
	update(time, delta) {
		// Called 60 times a second, ideally!
		// Create variables to get information about what is happening to each key
		// Look at scene, then for input from of the keyboard, then look for the left key
		const keyLeftObj = this.input.keyboard.addKey('LEFT')
		// Look at scene, then for input from of the keyboard, then look for the right key
		const keyRightObj = this.input.keyboard.addKey('RIGHT')
		// Look at scene, then for input from of the keyboard, then look for the up key
		const keyUpObj = this.input.keyboard.addKey('UP')
		// Look at scene, then for input from of the keyboard, then look for the down key
		const keyDownObj = this.input.keyboard.addKey('DOWN')
		// Look at scene, then for input from of the keyboard, then look for the space key
		const keySpaceObj = this.input.keyboard.addKey('SPACE')

		if (keyLeftObj.isDown === true) {
			// Subtract from x location once left key is pressed down
			this.car.x = this.car.x - 15
			// Destroy sprite
			this.car.destroy()
			// Paste left sprite in same location
			this.car = this.physics.add.sprite(this.car.x, this.car.y, 'carL')
		}

		if (keyRightObj.isDown === true) {
			// Add to x location once right key is pressed down
			this.car.x = this.car.x + 15
			// Destroy sprite
			this.car.destroy()
			// Paste right sprite in same location
			this.car = this.physics.add.sprite(this.car.x, this.car.y, 'carR')
		}

		if (keyUpObj.isDown === true) {
			// Subtract from y location once up key is pressed down
			this.car.y = this.car.y - 15
		}

		if (keyDownObj.isDown === true) {
			// Add to y location once down key is pressed down
			this.car.y = this.car.y + 15
		}

		// Wrap sprite to other side once it exceeds limit horizontally
		// If the sprite exceeds limits at the left of the screen, set to the right, otherwise if it exceeds limits at the right of the screen, set to the left side of the screen
		if (this.car.x < 0) {
			this.car.x = 1920
		} else if (this.car.x > 1920) {
			this.car.x = 0
		}

		// Wrap sprite to other side once it exceeds limit vertically
		// If the sprite exceeds limits at the top of the screen, set to the bottom, otherwise if it exceeds limits downwards, set to top of the screen
		if (this.car.y < 0) {
			this.car.y = 1080
		} else if (this.car.y > 1080) {
			this.car.y = 0
		}

		// If space key is down, add missile to group
		if (keySpaceObj.isDown === true) {
			if (this.fireMissile === false) {
				// Fire missile 
				this.fireMissile = true
				// Create missile variable as physics sprite, placed on top of the space sprite
				const aNewMissile = this.physics.add.sprite(this.car.x, this.car.y, 'missile')
				// Add missile to group
				this.missileGroup.add(aNewMissile)
				// Add sound when tire is shot/space bar clicked
				this.sound.play('laser')
			}
		}

		// Set missile to false in order to fire another missile
		if (keySpaceObj.isUp === true) {
			this.fireMissile = false
		}

		// Function to move the missile and then destroy once it leaves the screen
		this.missileGroup.children.each(function(item) {
			item.x = item.x + 15
			if (item.x < 0) {
				item.destroy()
			}
		})

		// If no enemy truck is destroyed from the user, wrap it around the screen
		this.ETruckGroup.children.each(function(item) {
			// If enemy truck exceeds left side, or upside, or downside
			if ((item.x < 0) || (item.y < 0) || (item.y > 1080)) {
				// Put back to right side of screen
				item.x = 2000
				// Generate a random y value on the screen to place enemy truck
				const ETruckYCoordinate = Math.floor(Math.random() * 1080) + 1
				// Give the random y coordinate to the enemies
				item.y = ETruckYCoordinate
			}
		})


		// Collisions between car and enemies
		this.physics.add.collider(this.car, this.ETruckGroup, function(carCollide, ETruckCollide) {
			// PLay collision noise
			this.sound.play('explosion')
			// Destroy car and enemy truck
			this.car.destroy()
			ETruckCollide.destroy()
			// If crash is not null, then destroy the crash (create new one)
			if (this.crash != null) {
				this.crash.destroy()
			}
			// Set crash (image) to same spot as car (spot where collision occurs)
			this.crash = this.physics.add.sprite(this.car.x, this.car.y, 'carCrash')

			// Create new car
			this.car = this.physics.add.sprite(1920 / 2, 1080 - 100, 'carR')
			// Update lives
			this.lives = this.lives - 1
			// Update lives text
			this.livesText.text = "Lives: " + this.lives
			if (this.lives === 2) {
				this.createETruck()
			} else if (this.lives === 1) {
				this.createETruck()
			}

			if (this.lives === 0) {
				// When you have no more lives
				// Pause audio
				this.myAudio.pause();
				// Play game over audio
				this.sound.play('boo')

				// Loop to destroy all items (enemy trucks) when the game is over so that you can see your score
				this.ETruckGroup.children.each(function(item) {
					item.destroy()
				})
				// Pause physics
				this.physics.pause()
				// Destroy car and enemy car
				ETruckCollide.destroy()
				carCollide.destroy()
				this.car.destroy()
				// Set score back to 0
				this.score = 0
				// Game over text
				this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
				// Make them click screen to play again
				this.gameOverText.setInteractive({
					useHandCursor: true
				})
				this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
			}
		}.bind(this))
		// Reset lives to 3
		if (this.lives === 0) {
			this.lives = 3
		}

	}
}

export default GameScene