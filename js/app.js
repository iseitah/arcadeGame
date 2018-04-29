 
// Matching Game Project by Seitah Abdullah
// This  script called by index.html
 
//Strict whole script
'use strict';

// Variables
var STR_X = 200;
var STR_Y = 440;
var score = 0; //Start with zero
var hasHit = false;
window.onload = function() {
    document.getElementById("scoreData").innerHTML = score;
    countDown(60,"timerData"); //The player has 60 seconds to win (the score should be greater than or equal 10)
};
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // intial loction for enemy
    this.x = x;
    this.y = y;
    //Using Math.random() to speed bugs randomly 
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) { //Canvas width 505
        this.x += this.speed * dt;
    }
    else {
        this.x = -100;
    }
    //call checkCollisions function
    this.checkCollisions();
};

//collisions detect
Enemy.prototype.checkCollisions = function(){
     //To reset the player whenever hits the bugs
     if ((this.x - 40 <= player.x &&  this.x + 40 >= player.x) && (this.y - 40 <= player.y && this.y + 40 >= player.y)){
        if (score >0){
            score--; //If score greater than zero, decrease by one
            document.getElementById("scoreData").innerHTML = score;
        };
        player.reset();
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player = function(){
    this.sprite = 'images/char-princess-girl.png';
    // intial location for the player
    this.x = STR_X;
    this.y = STR_Y;
};

player.prototype.update = function(){
   //If the player reach the water, player go to starting point agin
    if (this.y < 40){
      score++; //Increase the score +1
      document.getElementById("scoreData").innerHTML = score; 
      this.reset(); //reset the player
    };
};

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
};

player.prototype.reset = function(){
    this.x = STR_X;
    this.y = STR_Y;
};

//Handle the input for player, when the player move (up, down, left and right)
player.prototype.handleInput = function(input){

    //Check the pressedKey before move the player
    //Left movement, make sure the player is not in last left square
    if (input == 'left' && this.x > 0){
        //update the x position
        this.x -=100;
    }
    //Right movement, make sure the player is not in last right square
    if (input == 'right' && this.x < 400){
        //update the x position
        this.x +=100;
    }
    //Up movement, make sure the player is not in last top square
    if (input == 'up' && this.y > 0){
        //update the y position
        this.y -=90;
    }

    //Down movement, make sure the player is not in last down square
    if (input === 'down' && this.y < 400){
        //update the y position
        this.y +=90;
    }

};
// Now instantiate your objects.
var enemy1 = new Enemy(-100 , 220);
var enemy2 = new Enemy(-150 , 140);
var enemy3 = new Enemy(-230 , 60);
var enemy4 = new Enemy(-290 , 140);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1 , enemy2 , enemy3 , enemy4];
// Place the player object in a variable called player
var player = new player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Count down Function (1 min)
function countDown(seconds,element){
    var elm = document.getElementById(element);
    elm.innerHTML = seconds;
    ////If the score < 10 & time ==0 the player lose
    if (seconds == 0 && score < 10){ 
        elm.innerHTML = "Time Out!";
        window.location.href = "lose.html"; //go to GameOver page
    }
    //Decrease one in a second
    if (seconds>0){ 
        seconds--;
        var timer = setTimeout('countDown ('+seconds+',"'+element+'")',1000);
    }
    //If the score => 10, the player win
    if (seconds == 0 && score >= 10){
        elm.innerHTML = "You did it!"; 
        window.location.href = "win.html"; //go to YOU Win page
    }

};
