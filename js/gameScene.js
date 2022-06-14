/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Game Scene

// This class is the Title Scene
class GameScene extends Phaser.Scene {
  // Create an enemy
  createAlien() {
    // this will get a number between 1 and 1080;
    const alienYLocation = Math.floor(Math.random() * 1080) + 1
    // this will get a number between 1 and 50;
    let alienYVelocity = Math.floor(Math.random() * 50) + 1 
    // this will add minus sign in 50% of cases
    alienYVelocity *= Math.round(Math.random()) ? 1 : -1 
    const anAlien = this.physics.add.sprite(2000, alienYLocation, 'alien')
    // Set the y coordinate velocity to -200
    anAlien.body.velocity.x = -150
    anAlien.body.velocity.y = alienYVelocity
    this.alienGroup.add(anAlien)
  }
  // This method is the constructor.
  constructor () {
    super({ key: 'gameScene' })
    // Create my variables (background, ship/sprite, missile/weapon)
    this.background = null
    this.ship = null
    this.crash = null
    this.fireMissile = false
    // Create score and set to 0
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '55px Arial', fill: '#ffffff', align: 'center' }
    // Create Game over text
    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    // Create text for lives
    this.lives = 3
    this.livesText = null
    this.livesTextStyle = { font: '55px Arial', fill: '#ffffff', align: 'center' }
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
    // Loading the images
    this.load.image('gameSceneBackground', 'images/trackBackground.PNG')
    // Right car image
    this.load.image('shipR', 'images/skylineCarRight.png')
    // Left car image
    this.load.image('shipL', 'images/skylineCarLeft.png')
    this.load.image('carCrash', 'images/carCrash.png')

    this.load.image('missile', 'images/tire.png')
    this.load.image('alien', 'images/enemyCar.png')
    // Loading the sounds
    this.load.audio('laser', 'sound/tireShot.wav')
    this.load.audio('explosion', 'sound/carCrash.wav')
    this.load.audio('boo', 'sound/cBoo.wav')
    
    //this.load.audio('bgMusic', '../sound/gcSound.mp3')
  }

  /* Creating a new object by using an existing object as the prototype for the new object. Used to create game objects. 
   * data = Any data passed via ScenePlugin.add() or ScenePlugin.start(). 
   */
  create (data) {
    // Scaling and setting background image to proper spot
    this.background = this.add.image(0, 0, 'gameSceneBackground').setScale(5.0)
    this.background.setOrigin(0, 0)
    // Text for the users score
    this.scoreText = this.add.text(20, 20, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    // Text for the users lives counter
    this.livesText = this.add.text(333, 20, 'Lives: ' + this.lives.toString(), this.livesTextStyle)
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'shipR')
    // Creating a group for the missiles
    this.missileGroup = this.physics.add.group()
    // Creating a group for the enemies
    this.alienGroup = this.add.group()
    this.createAlien()
    // Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function(missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createAlien()
      this.createAlien()
    }.bind(this))


      const myAudio = new Audio('../sound/gcSound.mp3'); 
      if (typeof myAudio.loop == 'boolean')
      {
          myAudio.loop = true;
      }
      else
      {
          myAudio.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);
      }
      myAudio.play();
    }

  wait(ms){
    var current = new Date().getTime();
    var end = current + ms;
    while(end < current) {
      current = new Date().getTime();
    }
  }

  /* Replacing old content of the element with new provided content, and returning the element. This method is called once 
   * per game step while the scene is running. time = current time. delta = the delta time in ms since the last frame. 
   */ 
  update (time, delta) {
    // Called 60 times a second, ideally!
    
    //const audio = new Audio(bgMusic)
    //audio.play()
    //var audio = new Audio('../sound/gcSound.mp3');
    //audio.play();
    // Create variables to get information about what is happening to each key
    // Look at scene, then for input from of the keyboard, then look for the left key
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    // Look at scene, then for input from of the keyboard, then look for the right key
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    // Look at scene, then for input from of the keyboard, then look for the up key
    const keyUpObj = this.input.keyboard.addKey('UP')
    // Look at scene, then for input from of the keyboard, then look for the down key
    const keyDownObj = this.input.keyboard.addKey('DOWN')
    // Look at scene, then for input from of the keyboard, then look for the space key
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    
    
    if (keyLeftObj.isDown === true) {
      // Subtract from x location once left key is pressed down
      this.ship.x = this.ship.x - 15
      // Destroy ship
      this.ship.destroy()
      // Paste left ship in same location
      this.ship = this.physics.add.sprite(this.ship.x, this.ship.y, 'shipL')
    }

    if (keyRightObj.isDown === true) {
      // Add to x location once right key is pressed down
      this.ship.x = this.ship.x + 15
      // Destroy ship
      this.ship.destroy()
      // Paste right ship in same location
      this.ship = this.physics.add.sprite(this.ship.x, this.ship.y, 'shipR') 
    }

    if (keyUpObj.isDown === true) {
      // Subtract from y location once up key is pressed down
      this.ship.y = this.ship.y - 15
    }

    if (keyDownObj.isDown === true) {
      // Add to y location once down key is pressed down
      this.ship.y = this.ship.y + 15
    }

    // Wrap sprite to other side once it exceeds limit horizontally
    if (this.ship.x < 0) {
      this.ship.x = 1920
    } else if (this.ship.x > 1920) {
      this.ship.x = 0
    }

    // Wrap sprite to other side once it exceeds limit vertically
    if (this.ship.y < 0) {
      this.ship.y = 1080
    } else if (this.ship.y > 1080) {
      this.ship.y = 0
    }

    // If space key is down, add missile to group
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // Fire missile 
        this.fireMissile = true
        // Create missile variable as physics sprite, placed on top of the space ship
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        // Add missile to group
        this.missileGroup.add(aNewMissile)
        // Add sound when tire is shot/space bar clicked
        this.sound.play('laser')
      }
    }

    // Set missile to false in order to fire another missile
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    // Function to move the missile and then destroy once it leeaves the screen
    this.missileGroup.children.each(function (item) {
      item.x = item.x + 15
      if (item.x < 0) {
        item.destroy()
      }
    })

    // test if enemy leaves screen
    this.alienGroup.children.each(function (item) {
    
      if ((item.x < 0) ||  (item.y < 0)) {
        // Put back to right side of screen
        item.x = 2000
        // generate a random y value on the screen
        const alienYCoordinate = Math.floor(Math.random() * 1080) + 1
        item.y = alienYCoordinate
      }
    })
    
    
    // Collisions between car and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('explosion')
      this.ship.destroy()

     
      
      if(this.crash != null){
        this.crash.destroy()
      }

      this.crash = this.physics.add.sprite(this.ship.x, this.ship.y, 'carCrash')
 
      
      this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'shipR')

      this.lives = this.lives - 1
      this.livesText.text = "Lives: " + this.lives
      if (this.lives === 0) {
        this.sound.play('boo')
        this.physics.pause()
        alienCollide.destroy()
        shipCollide.destroy()
        this.ship.destroy()        
        this.score = 0
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      }      
    }.bind(this))
    if(this.lives === 0){
      this.lives = 3
    }
    
  }
}

export default GameScene