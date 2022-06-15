/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Menu Scene

// This class is the Menu Scene
class MenuScene extends Phaser.Scene {
	// This method is the constructor.  
	constructor() {
		super({
			key: 'menuScene'
		})
		// Create my audio
		this.myAudio2 = null
		// Create my variables (menu scene background, start button, instructions button)
		this.menuSceneBackgroundImage = null
		// Start button to lead to game scene
		this.startButton = null
		// Instructions button to lead to instrucitons page
		this.instructionsButton = null
	}

	/* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
	 * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
	 * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to white. 
	 */
	init(data) {
		// Initialize background colour to white
		this.cameras.main.setBackgroundColor('#ffffff')
	}

	// Handle asynchronous external file loading in a blocking manner. Used to load assets.
	preload() {
		console.log('Menu Scene')
		// Load images for the menu scene
		// Background image
		this.load.image('menuSceneBackground', 'images/nissanSkyline2.jpg')
		// Start button image
		this.load.image('startButton', 'images/pressStart.gif')
		// Instructions button image
		this.load.image('instructionsButton', 'images/instructionsButton.png')
	}

	/* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
	 * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
	 */
	create(data) {
		// Scaling and setting background image to proper spot
		this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.75)
		this.menuSceneBackgroundImage.x = 1920 / 2
		this.menuSceneBackgroundImage.y = 1080 / 2
		// Setting button to proper spot and making it interactive
		this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
		this.startButton.setInteractive({
			useHandCursor: true
		})
		this.startButton.on('pointerdown', () => this.clickButton())
		// Setting instructions button to proper spot and making it interactive
		this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, 'instructionsButton').setScale(0.25)
		this.instructionsButton.setInteractive({
			useHandCursor: true
		})
		this.instructionsButton.on('pointerdown', () => this.clickButton2())
		// Assign the aduio variable to the proper sound
		this.myAudio2 = new Audio('../sound/mcSound.mp3');
		if (typeof this.myAudio2.loop == 'boolean') {
			// Loop the audio 
			this.myAudio2.loop = true;
		} else {
			// Add event listener
			this.myAudio2.addEventListener('ended', function() {
				// Rewind the time of sound to 0 (the start)
				this.currentTime = 0;
				this.play();
			}, false);
		}
		// Play the audio
		this.myAudio2.play();
	}

	/* Replacing old content of the element with new provided content, and returning the element. This method is called once 
	 * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
	 */
	update(time, delta) {}

	clickButton() {
		// Pause sound when button is clicked (going to next scene)
		// Start game scene when button is clicked
		this.myAudio2.pause();
		this.myAudio2.currentTime = 0;
		this.scene.switch('gameScene')
	}
	clickButton2() {
		// Switch to instructions scene when button is clicked
		this.scene.switch('instructionsScene')
	}
}

export default MenuScene