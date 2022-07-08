var left = 0;
var counter = 0;
var isAlive = true;
var characterPositionMin;
var characterPositionMax;

// Handles (does something with) key presses for the document
$(document).keydown(function (e) {
  // Set characterPositionMin to the current position left of the character
  characterPositionMin = $("#character").position().left;

  // If SPACE (ASCII value 32) is pressed and the character is still alive then add the css animate class
  if (e.keyCode == 32 && isAlive) {
    $("#character").addClass("animate");

    // Remove the css animate class after 400 milliseconds
    setTimeout(function () {
      $("#character").removeClass("animate");
    }, 400);

    //Otherwise if RIGHT ARROW (ASCII value 39) is pressed and the character is still alive then..
  } else if (e.keyCode == 39 && isAlive) {
    // increase left by 10
    left += 10;

    // move the character right
    $("#character").css({
      left: left + "px",
    });

    //Otherwise if LEFT ARROW (ASCII value 37) is pressed and the character is still alive and the character won't move out of bounds then..
  } else if (e.keyCode == 37 && isAlive && characterPositionMin >= 10) {
    // decrease left by 10
    left -= 10;

    // move the character left
    $("#character").css({
      left: left + "px",
    });
  }
});

// Create a function that checks if the character is dead
function checkDead() {
  // Get the bottom position of the character and store it in a variable called characterBottom
  var characterBottom = parseInt($("#character").css("bottom"));

  // Get the left position of the block and store it in a variable called blockLeft
  // Why left? because the left side of the block can kill the character if they touch
  var blockLeft = parseInt($("#block").css("left"));

  // Get the left position of the character and store it in a variable called characterPositionMin
  characterPositionMin = $("#character").position().left;

  // Get the left position of the character and add 50px and store it in a variable called characterPositionMax
  // why 50? dino's width = 50px
  characterPositionMax = $("#character").position().left + 50;

  // Check if the character is colliding with the block:
  // If blockLeft is less than or equal to characterPositionMax
  // AND blockLeft is greater than or equal to characterPositionMin
  // AND block left is greater than or equal to -40 (from ccs value)
  // AND characterBottom is less than or equal to 20 (from css value) then
  if (
    blockLeft <= characterPositionMax &&
    blockLeft >= characterPositionMin &&
    blockLeft >= -40 &&
    characterBottom <= 20
  ) {
    // stop the block's animation
    $("#block").css({
      animation: "none",
    });

    // set the score counter to 0
    counter = 0;
    $("#scoreSpan").html(counter);

    // Add the class "rotated" to the character
    $("#character").addClass("rotated");

    // Dino is dead
    isAlive = false;

    // Handles the keydown event
    $(document).keydown(function (e) {
      //If r is pressed (ASCII value 82) then..
      if (e.keyCode == 82) {
        //reload the page
        location.reload();
      }
    });

    // Otherwise check if the character has jumped over the block
    // blockLeft is not equal to characterPositionMax
    // AND blockLeft is not equal to characterPositionMin
    // AND characterBottom is greater than or equal to 20 then..
  } else if (
    blockLeft != characterPositionMax &&
    blockLeft != characterPositionMin &&
    characterBottom >= 20
  ) {
    // increase score counter by 1
    counter += 1;
    $("#scoreSpan").html(counter);
  }
}

// Wait for the page to load to run the function
$(document).ready(function () {
// Run the checkDead function continuously every 10ms (value needs to be small enough to catch a death)
    setInterval(checkDead, 10); 
});
