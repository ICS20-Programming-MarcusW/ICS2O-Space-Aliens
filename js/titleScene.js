/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Title Scene

// This class is the Title Scene
class TitleScene extends Phaser.Scene {
  // This method is the constructor.
  constructor () {
    super({ key: 'titleScene' })
    // Create my variables (title scene background image, title scene text)
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }

  /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to goldenrod. 
   */ 
  init (data) {
    // Initialize background colour to goldenrod
    this.cameras.main.setBackgroundColor('#daa520')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Title Scene')
    // Load the nissan skyline image as a background
    this.load.image('titleSceneBackground', 'images/nissanSkyline.jpg')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    // Setting title scene image to proper scale and spot
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
    // Set title scene text to center, then down a little bit
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Skyline', this.titleSceneTextStyle).setOrigin(0.5)
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
    // Switch screen to the menu scene after 8000 milliseconds
    if (time > 8000){
      this.scene.switch('menuScene')
    }
  }  
}

export default TitleScene