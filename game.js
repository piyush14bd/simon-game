var gamepattern = [];

var userclickedpattern = [];

var buttoncolors = ["red", "blue", "green", "yellow"]

var level = 0;

var started = false;


$(".btn").click(function () {

    var userchosencolor = $(this).attr("id")

    userclickedpattern.push(userchosencolor);

    playsound(userchosencolor)

    checkanswer(userclickedpattern.length-1);

});

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level" + level)
        nextsequence();
        start = true;
    }
})


function nextsequence() {
    userclickedpattern = [];

    level++;
    $("level-title").text("level" + level);

    var randomnumber = Math.floor(Math.random() * 4);
    var randomchosennumber = buttoncolors[randomnumber]

    gamepattern.push(randomchosennumber)
    $("#" + randomchosennumber).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomchosennumber)

}


function playsound(name) {
    var audio = new Audio("/sounds" + name + ".mp3");
    audio.play();


}

function animatepress(currentcolor) {
    $("#" + currentcolor).addclass("pressed");
    setTimeout(() => {
        $("#" + currentcolor).removeclass("pressed");

    }, 100);
}


function checkanswer(currentlevel) {

    if (gamepattern[currentlevel] == userclickedpattern[currentlevel] && gamepattern.length==currentlevel+1) {
        setTimeout(() => {
            nextsequence();

            
        }, 1000);


    }
    else{
        playsound(wrong)
        $("body").addclass("game-over")
        $("level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeclass("game-over")

        }, 200);

        startover();
    }
}
function startover(){
    level = 0;
    gamepattern = [];
    start = false;
}

