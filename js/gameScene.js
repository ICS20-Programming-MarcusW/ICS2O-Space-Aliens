/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Game Scene

// This class is the Title Scene
class GameScene extends Phaser.Scene {
  // This method is the constructor.
  constructor () {
    super({ key: 'gameScene' })
    this.background = null
    this.ship = null
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
    console.log('Game Scene')
    // images
    this.load.image('gameSceneBackground', 'images/raceTrack.jpg')
    this.load.image('ship', 'images/skyCar.webp')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    this.background = this.add.image(0, 0, 'gameSceneBackground').setScale(5.0)
    this.background.setOrigin(0, 0)
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.12)
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
    // called 60 times a second.
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    
    if (keyLeftObj.isDown === true) {
      this.ship.x = this.ship.x - 15
    }

    if (keyRightObj.isDown === true) {
      this.ship.x = this.ship.x + 15
    }

    if (this.ship.x < 0) {
      this.ship.x = 1920
    } else if (this.ship.x > 1920) {
      this.ship.x = 0
    }
  }  
}

export default GameScene