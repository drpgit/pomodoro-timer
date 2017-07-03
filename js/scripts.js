// Back-end logic goes here

var pomodoro = 25;
var pomMinutes = 25;
var pomSeconds = 0;
var reset = false;
var sound = new Audio('media/alarm_buzz.mp3');

function refreshPomodoro() {
  $(".timer-set").html(pomodoro);
  $(".display-minutes").html(pomodoro);
}

function timerMinus() {
  if (pomodoro > 1) {
    pomodoro -= 1;
    pomMinutes -=1;
  }
  refreshPomodoro();
}

function timerPlus() {
  if (pomodoro < 55) {
    pomodoro += 1;
    pomMinutes += 1;
  }
  refreshPomodoro();
}

function timerStart() {
  if (reset) {
    sound.pause();
    $(".start-text").html("START");
    $(".timer-set").html(pomodoro);
    pomMinutes = pomodoro;
    pomSeconds = 0;
    $(".display-minutes").html(pomodoro);
    $(".display-seconds").html("00");
    reset = false;
  } else {
    $(".start-text").html("RESET");
    reset = true;
    var begin = setInterval(function() {
      if (pomMinutes === 0 && pomSeconds === 0) {
        sound.play();
        clearInterval(begin);
      } else if (reset === false) {
        clearInterval(begin);
      } else if (pomMinutes >= 0 && pomSeconds >= 0) {
        if (pomSeconds === 0) {
          pomSeconds = 59;
          pomMinutes -= 1;
        } else {
          pomSeconds -=1;
        }
        $(".display-minutes").html(pomMinutes);
        if (pomSeconds < 10) {
          $(".display-seconds").html("0" + pomSeconds);
        } else {
          $(".display-seconds").html(pomSeconds);
        }
      }
    }, 1000);
  }
}

// Front-end logic goes here

$(document).ready(function() {

  $(".timer-minus").on("click", function() {
    timerMinus();
  });
  $(".timer-plus").on("click", function() {
    timerPlus();
  });
  $(".start-reset").on("click", function() {
    timerStart();
  });

});
