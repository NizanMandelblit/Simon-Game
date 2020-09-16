var userClickedPattern = [];
var gamePattern = [];
var level = 0;


var buttonColours = ["red", "blue", "green", "yellow"];


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level.toString());
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer([userClickedPattern.length - 1]);
})


function playSound(name) {
    var audio;
    switch (name) {
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;

        case "green":
            audio = new Audio("sounds/green.mp3");
            audio.play();
            break;


        case "red":
            audio = new Audio("sounds/red.mp3");
            audio.play();
            break;

        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;

    }
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    var delayInMilliseconds = 1000; //1 second

    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, delayInMilliseconds);
}

var flag = 1;

$(document).keypress(function (event) {
    if (flag) {
        $("h1").text("level " + level.toString());
        nextSequence();
    }
    flag = 0;


})


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            var delayInMilliseconds = 1000; //1 second

            setTimeout(function () {
                nextSequence();
            }, delayInMilliseconds);
        }
    } else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        var delayInMilliseconds = 2000; //2 second
        $("h1").text("Game Over, press any key to restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, delayInMilliseconds);
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    flag = 1;
}