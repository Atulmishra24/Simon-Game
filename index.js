var buttonColours = [ "red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var started = false;
var level =0;

$("body").keypress(function(){
if(!started){
    nextSequence();
    started=true;
}
   
})
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level : "+ level);
    var randomNumber = Math.floor((Math.random())*4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push( randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(randomChosenColour);
    
}

function playSound(name){
    var path = name+".mp3";
    var audio = new Audio(path);
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
       $("#"+currentColour).removeClass("pressed"); 
    }, );
   
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("sucess");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        console.log("loss");
        var wrongAudio = new Audio("wrong.mp3");
        wrongAudio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[]
    started=false;
}