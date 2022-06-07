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
    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to goldenrod. 
   */ 
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Menu Scene')
    this.load.image('menuSceneBackground', 'images/nissanSkyline2.jpg')
    this.load.image('startButton', 'images/pressStart.gif')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.75)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
  }
  
  clickButton () {
    this.scene.start('gameScene')
  }
}

export default MenuScene