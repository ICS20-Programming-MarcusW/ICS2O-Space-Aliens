/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Instructions Scene

// This class is the Title Scene
class InstructionsScene extends Phaser.Scene {
  // This method is the constructor.
  constructor () {
    super({ key: 'instructionsScene' })
    this.Text = null
    this.TextStyle = { font: '55px Roboto', fill: '#218a8a', align: 'center' }
    this.TextStyle2 = { font: '22px Calibri', fill: '#124c4c', align: 'left' }
    this.TextStyle3 = { font: '22px Calibri', fill: '#124c4c', align: 'left', width: '50px' }
    this.menuButton = null
  }

    /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to goldenrod. 
   */ 
  init (data) {
    this.cameras.main.setBackgroundColor('#fff0f0')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Instructions Scene')
    this.load.image('menuButton', 'images/menuButton.png')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    // Set title scene text to center, then down a little bit
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) - 350, 'Skyline : Instructions', this.TextStyle).setOrigin(0.5)
    //.................................
    this.titleSceneText2 = this.add.text(1920 / 2, (1080 / 2) - 200, 'Goal : The goal of the game as a player is to get as high as a score as you possibly can. You can play against friends, and whoever ends up with the highest score, wins.', this.TextStyle2).setOrigin(0.5)
    //...............................2
    this.titleSceneText3 = this.add.text(1920 / 2, (1080 / 2), 'How to play : \n\n 1. You are a blue nissan skyline that is trying to stay alive as long as you can. \n 2. There are enemies that will spawn and come at you and in order to kill them, you must use your weapon (tires) to dissipate them. \n 3. If the enemies end up colliding with you, you will then lose. \n 4. They are only dangerous from the front, so you can collide with them from behind. \n\n Have Fun!', this.TextStyle3).setOrigin(0.5)
    // 
    this.menuButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, 'menuButton').setScale(0.09)
    this.menuButton.setInteractive({ useHandCursor: true })
    this.menuButton.on('pointerdown', () => this.clickButton3())
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
  }

  clickButton3 () {
    // Start menu scene when button is clicked
    this.scene.start('menuScene')
  }
}

export default InstructionsScene