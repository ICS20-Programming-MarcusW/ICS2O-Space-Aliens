/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Splash Scene

// This class is the splash scene
class SplashScene extends Phaser.Scene {
	// This method is the constructor 
	constructor() {
		super({
			key: 'splashScene'
		})
		// Create audio 
		this.myAudio2 = null
	}

	/* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
	 * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
	 * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to light pink. 
	 */
	init(data) {
		// Initialize background colour to light pink
		this.cameras.main.setBackgroundColor('#fff0ff')
	}

	// Handle asynchronous external file loading in a blocking manner. Used to load assets.
	preload() {
		console.log('Splash Scene')
		// Load background image for splash scene
		this.load.image('splashSceneBackground', './images/splashSceneImage.png')
	}

	/* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
	 * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
	 */
	create(data) {
		// Setting splash scene image to proper scale and spot
		this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
		this.splashSceneBackgroundImage.x = 1920 / 2
		this.splashSceneBackgroundImage.y = 1080 / 2
		// Assign the aduio variable to the proper sound
		this.myAudio2 = new Audio('../sound/splash.mp3');
		if (typeof this.myAudio2.loop == 'boolean') {
			// Do not loop the audio
			this.myAudio2.loop = false;
		} else {
			// Add event listener
			this.myAudio2.addEventListener('ended', function() {
				// Rewind the time of sound to 0 (the start)
				this.currentTime = 0;
				this.play();
			}, false);
		}
		// Play audio
		this.myAudio2.play();
	}

	/* Replacing old content of the element with new provided content, and returning the element. This method is called once 
	 * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
	 */
	update(time, delta) {
		if (time > 7000) {
			// Switch screen to title scene after 7000 milliseconds
			this.scene.switch('titleScene')
		}
	}
}

export default SplashScene