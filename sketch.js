var canvas;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var runners, runner1, runner2, runner3, runner4;
var ground_img,runner1_img,runner2_img,runner3_img,runner4_img,track_img;

function preload(){
  ground_img=loadImage("../spriteImages/ground.png");
  runner1_img=loadImage("../spriteImages/runner1.png");
  runner2_img=loadImage("../spriteImages/runner2.png");
  runner3_img=loadImage("../spriteImages/runner3.png");
  runner4_img=loadImage("../spriteImages/runner4.png");
  track_img=loadImage("../spriteImages/track1.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 10, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 4 && gameState===0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.update(2);
    game.end();
  }
}