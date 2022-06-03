/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Splash Scene

// This class is the splash scene
class SplashScene extends Phaser.Scene {
  // This is the constructor method
  constructor () {
    super({ key: 'splashScene' })
  }

  /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to light pink. 
   */
  init (data) {
    this.cameras.main.setBackgroundColor('#fff0ff')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './images/splashSceneImage.png')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */
  update (time, delta) {
    if (time > 4000){
      this.scene.switch('titleScene')
    }
  }  
}

export default SplashScene
