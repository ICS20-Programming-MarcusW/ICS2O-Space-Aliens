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
  }

  /* Get the scene up and running, initialize data object with content of another data object (our particular scene). 
   * This method is called by the Scene Manager when the scene starts, before preload() and create(). data = Any data passed 
   * via ScenePlugin.add() or ScenePlugin.start(). Background colour is set to goldenrod. 
   */ 
  init (data) {
    this.cameras.main.setBackgroundColor('#daa520')
  }

  // Handle asynchronous external file loading in a blocking manner. Used to load assets.
  preload () {
    console.log('Title Scene')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
  }  
}

export default TitleScene