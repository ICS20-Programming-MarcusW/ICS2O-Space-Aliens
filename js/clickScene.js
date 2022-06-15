/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: June 2022
// This is the Click Scene

// This class is the click scene
class ClickScene extends Phaser.Scene {
  // This method is the constructor 
  constructor () {
    super({ key: 'clickScene' })
    this.Text = null
    // Create text body #1 to tell the user to launch game
    this.TextStyle = { font: '88px Roboto', fill: '#000000', align: 'center' }
    // Create launch button
    this.launchButton = null
  }

  /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to light pink. 
   */
  init (data) {
    // Initizalize background colour to white for click scene
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Click Scene')
    // Load background image
    this.load.image('clickSceneBackground', './images/clickSBI.gif')
    // Load button image
    this.load.image('launchButton', 'images/launchButton.png')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    // Setting splash scene image to proper scale and spot
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'clickSceneBackground').setScale(2.45)
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    // Launch button (making interactive and putting where I want on the screen)
    this.launchButton = this.add.sprite(1920 / 2, (1080 / 2) + 77, 'launchButton').setScale(0.4)
    this.launchButton.setInteractive({ useHandCursor: true })
    this.launchButton.on('pointerdown', () => this.clickButton())
    // Set click scene text to center, then adjust
    this.titleSceneText = this.add.text((1920 / 2) + 264, (1080 / 2) - 315, 'Launch Game By Clicking the Button', this.TextStyle).setOrigin(0.5)
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */
  update (time, delta) {
  }  
  clickButton () {
    // Switch screen after the button is clicked
    this.scene.switch('splashScene')
  }
}

export default ClickScene