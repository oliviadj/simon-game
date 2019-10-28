
///// constants
var gameOverMessage = "Game Over, Press Any Key to Restart";
var delayTime = 300;

//// variables
var steps = [];
var count = -1;
var userStepCount = -1;

// start playing
$(document).on("keydown", function(){
  if (steps.length == 0 ) {   // game hasn't started yet
    var buttonId = blinkButton();
    increaseStep(buttonId);
    showLevelHeader();
    blink(buttonId);
  }
});

$(".btn").on("click", function(event){

  blink(event.target.id);

  var userStep = false;
  if (userStepCount < count) {
    userStepCount++;
    userStep = checkUserSteps(event.target.id);
    //console.log("userStep = " + userStep + ", userStepCount = " + userStepCount);
  }

  if (userStep == false) {  // when user clicks wrongly
    gameOver();

  } else {
    if (userStepCount == count) {   // if user has finished all button clicks
      setTimeout(function(){  // setTimeout to give delay to the next blink

        var buttonId = blinkButton();
        increaseStep(buttonId);
        showLevelHeader();
        blinkAllSteps();  // show user all steps that he/she needs to click

        // reset user step count, so user can start fresh
        userStepCount = -1;

      }, (3*delayTime));
    } // else, we just wait user to do another click to finish the steps
  }

});

function checkUserSteps (clickedId) {
    if (steps[userStepCount] == clickedId) return true;
    else return false;
}

function gameOver(){
  // clear all variables
  steps.length = 0;
  count = -1;
  userStepCount = -1;

  // show game over message
  $("h1").text(gameOverMessage);

  // make the screen blink
  $("body").addClass("game-over");
  pressedSound("wrong");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, delayTime);
}

function blinkButton(){
  var number = Math.ceil(Math.random() * 4);
  var buttonId = buttonIdSelected(number);
  return buttonId;
}

function buttonIdSelected(number){
  // 1:green, 2:red, 3:yellow, 4:blue
  var id = "blue";
  if (number == 1) id = "green";
  else if (number == 2) id = "red";
  else if (number == 3) id = "yellow";
  return id;
}

function increaseStep(buttonId){
  count++;
  steps[count] = buttonId;
  //console.log("steps[" + count + "] = " + buttonId);
}

function showLevelHeader(){
  $("h1").text("level " + (count+1));
}

function blink(id){ // function to blink & sound the pressed button 
  //console.log("now blink : " + id);
  // 1:green, 2:red, 3:yellow, 4:blue
  if (id == "green") {
    $("#green").addClass("pressed");
    pressedSound(id);
    setTimeout(function(){
    	$("#green").removeClass("pressed");
    }, delayTime);

  } else if (id == "red") {
    $("#red").addClass("pressed");
    pressedSound(id);
    setTimeout(function(){
    	$("#red").removeClass("pressed");
    }, delayTime);

  } else if (id == "yellow") {
    $("#yellow").addClass("pressed");
    pressedSound(id);
    setTimeout(function(){
    	$("#yellow").removeClass("pressed");
    }, delayTime);

  } else {
    $("#blue").addClass("pressed");
    pressedSound(id);
    setTimeout(function(){
    	$("#blue").removeClass("pressed");
    }, delayTime);
  }
}

function pressedSound(id){
  var audio;
  switch(id) {
    case "green" :
      audio = new Audio("sounds/green.mp3");
      break;
    case "red" :
      audio = new Audio("sounds/red.mp3");
      break;
    case "yellow" :
      audio = new Audio("sounds/yellow.mp3");
      break;
    case "blue" :
      audio = new Audio("sounds/blue.mp3");
      break;
    default :
      audio = new Audio("sounds/wrong.mp3");
      break;
  }
  audio.play();
}

function blinkAllSteps(){
    var delay = 0;
    for (var i=0; i<steps.length; i++) {
      delay = delay + delayTime;  // has to use this delay, otherwise the buttons will blink at the same time
      setDelay(steps[i], delay);   // has to use this method (by creating another method, setDelay), because calling directly setTimeout in a loop causes wrong i value
    }
}

function setDelay(button, delay) {
  setTimeout(function(){
    blink(button);
  }, delay);
}
