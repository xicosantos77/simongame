

var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];                                                //to store info about next round
var userClickedPattern = [];                                         //to store user clicked pattern
var started = false;                                                 //Variable created in order to know if the game has started.
var level = 0;                                                       //Level of the game

$(document).keypress(function(){                                     //Detects if a key is pressed
  if (!started){
    $("#level-title").text("Level " + level);                        //Changes the h1 to the correspondant level. This only runs if (var started = false) is observed to be false.
    nextSequence();                                                  //Calls nextSequence to start the game
    started = true;                                                  //Changes the value of the boolean started
  }
})

$(".btn").click(function() {                                         //Event listener for a click, and performs the function
  var userChosenColour = $(this).attr("id");                         //Looks for he ID of the clicked button
  userClickedPattern.push(userChosenColour);                         //Adds userChosenColour to the array

  playSound(userChosenColour);                                       //Calls for playSound (plays the sound correspondant to the button the user clicks)
  animatePress(userChosenColour);                                    //Calls for animatePress (changes the color of the button when clicked)
  console.log(userClickedPattern);                                   //Outputs the array userClickedPattern

  checkAnswer(userClickedPattern.length - 1);                        //Calls for the function to check if the answer is correct.
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){  //Compares each input to the corresponding input on the userClickedPattern
    console.log("Success!");                                          //Output Sucess is information is equal
    if (gamePattern.length === userClickedPattern.length){            //Compares the length of both arrays
      setTimeout(function(){                                          //Starts next level after 1 second
        nextSequence();
      },1000);
    }
  } else {

    console.log("wrong");                                             //Outputs wrong if the information doesnt match
    playSound("wrong");                                               //Plays the game-over sound

    $("body").addClass("game-over");                                  //Makes the color of the HTML, red
    setTimeout(function(){                                            //sets a timer for how long the class remains active
      $("body").removeClass("game-over");                             //removes the color red after 200ms
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart!");  //Changes the main title if the player hits the wrong button

    startOver();

  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;                                                           //increases the number of level by 1
  $("#level-title").text("Level " + level);                          //updates the value of level to be shown in the h1

  var randomNumber = Math.floor(Math.random() * 4);                  //random selection of the buttons
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  //flashing animation of the buttons

  playSound(randomChosenColour);                                     //plays the sound associated  with the color of the button pressed
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");                  //adding sound to the buttons
  audio.play();                                                      //plays the audio
}

function animatePress(currentColour){                                //changes the color of the button to grey by adding the "pressed" class in CSS
  $("#" + currentColour).addClass("pressed");                        //adds the class to the button
  setTimeout(function(){                                             //sets a timer for how long the class remains active
    $("#" + currentColour).removeClass("pressed");                   //removes the class after 100 miliseconds
  }, 100);
}

function startOver(){                                                 //resets all variables
  level = 0;                                                          //sets level to zero
  gamePattern = [];                                                   //resets the game pattern to an empty array
  started = false;                                                    //resets the started boolean to false
}
