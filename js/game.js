/* global Phaser */

// Copyright (c) 2022 Marcus Wehbi All rights reserved
//
// Created by: Marcus Wehbi
// Created on: May 2022
// This is the Phaser3 configuration file

// statements to import the scenes
import ClickScene from './clickScene.js'
import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js'
import GameScene from './gameScene.js'
import InstructionsScene from './instructionsScene.js'

// Create our game scenes
const clickScene = new ClickScene()
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const instructionsScene = new InstructionsScene()

//* Game scene */
const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	// set background color (goldenRod)
	backgroundColor: 0xdaa520,
	scale: {
		mode: Phaser.Scale.FIT,
		// we place it in the middle of the page.
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

const game = new Phaser.Game(config)
// console.log(game)

// load scenes
// NOTE: remember any "key" is global and CAN NOT be reused!
game.scene.add('clickScene', clickScene)
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene', gameScene)
game.scene.add('instructionsScene', instructionsScene)

// start click scene
game.scene.start('clickScene')