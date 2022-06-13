/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Menu Scene

// This class is the Title Scene
class MenuScene extends Phaser.Scene {
  // This method is the constructor.
  constructor () {
    super({ key: 'menuScene' })
    // Create my variables (menu scene background, start button)
    this.menuSceneBackgroundImage = null
    this.startButton = null
    // Instructions button to lead to instrucitons page
    this.instructionsButton = null
  }

  /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to white. 
   */ 
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Menu Scene')
    // Load background image and start button
    this.load.image('menuSceneBackground', 'images/nissanSkyline2.jpg')
    this.load.image('startButton', 'images/pressStart.gif')
    this.load.image('instructionsButton', 'images/instructionsButton.png')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    // Scaling and setting background image to proper spot
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.75)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    // Setting button to proper spot and making it interactive
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    // Setting instructions button to proper spot and making it interactive
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, 'instructionsButton').setScale(0.25)
    this.instructionsButton.setInteractive({ useHandCursor: true })
    this.instructionsButton.on('pointerdown', () => this.clickButton2())
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
  }
  
  clickButton () {
    // Start game scene when button is clicked
    this.scene.start('gameScene')
  }
  clickButton2 () {
    // Start game scene when button is clicked
    this.scene.start('instructionsScene')
  }
}

export default MenuScene