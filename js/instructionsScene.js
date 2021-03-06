/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Instructions Scene

// This class is the Instructions Scene
class InstructionsScene extends Phaser.Scene {
	// This method is the constructor.
	constructor() {
		super({
			key: 'instructionsScene'
		})
		this.Text = null
		// Create text body #1
		this.TextStyle = {
			font: '55px Roboto',
			fill: '#218a8a',
			align: 'center'
		}
		// Create text body #2
		this.TextStyle2 = {
			font: '22px Calibri',
			fill: '#124c4c',
			align: 'left'
		}
		// Create text body #3
		this.TextStyle3 = {
			font: '22px Calibri',
			fill: '#124c4c',
			align: 'left',
			width: '50px'
		}
    // Create menu button
		this.menuButton = null
	}

	/* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
	 * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
	 * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to pink. 
	 */
	init(data) {
		// Initialize background color to pink
		this.cameras.main.setBackgroundColor('#fff0f0')
	}

	// Handle asynchronous external file loading in a blocking manner. Used to load assets.
	preload() {
		console.log('Instructions Scene')
		// Load image for menu button
		this.load.image('menuButton', 'images/menuButton.png')
	}

	/* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
	 * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
	 */
	create(data) {
		// Set title scene text to center, then up a bit
		this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) - 350, 'Skyline : Instructions', this.TextStyle).setOrigin(0.5)
		// Text for the goal of my video game in instructions page
		this.titleSceneText2 = this.add.text(1920 / 2, (1080 / 2) - 200, 'Goal : The goal of the game as a player is to get as high of a score as you possibly can. You can play against friends, family, and whoever ends up with the highest score, wins.', this.TextStyle2).setOrigin(0.5)
		// Text for how to play my video game in instructions page
		this.titleSceneText3 = this.add.text(1920 / 2, (1080 / 2), 'How to play : \n\n 1. You are a blue nissan skyline that is trying to stay alive as long as you can. \n 2. There are enemies that will spawn, come at you, and in order to destroy them, you must use your weapon (tires) to dissipate them. For each one you destroy, you gain a point. \n     Additionally, for every enemy you destroy, two more will spawn. \n 3. If the enemies end up colliding with you, you will then lose a life, if you lose three, you lose. \n 4. They are only dangerous from the front, so you can collide with them from behind. \n\n Stay alive as long as you can, and Have Fun!', this.TextStyle3).setOrigin(0.5)
		// Setting menu button to proper spot and making it interactive
		this.menuButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, 'menuButton').setScale(0.09)
		this.menuButton.setInteractive({
			useHandCursor: true
		})
		this.menuButton.on('pointerdown', () => this.clickButton3())
	}

	/* Replacing old content of the element with new provided content, and returning the element. This method is called once 
	 * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
	 */
	update(time, delta) {}

	clickButton3() {
		// Switch to menu scene when button is clicked
		this.scene.switch('menuScene')
	}
}

export default InstructionsScene