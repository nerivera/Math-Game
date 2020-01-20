var dif = 2;

function change() {
  if ($("#inst").css("display") === "none") {
    $("#coat").css("display", "none");
    $("#inst").css("display", "block");
    $("#show").html("&larr;");
  } else {
    $("#inst").css("display", "none");
    $("#coat").css("display", "block");
    $("#show").html("?");
  }
}

function difThing(i) {
  return dif != i;
}

function changeDif(n, doit) {
  $(".difficulty").css("background-color", "white");
  $("#medium").css("color", "gold");
  switch (n) {
    case 1:
      $("#easy").css("background-color", "lightgray");
      break;
    case 3:
      $("#hard").css("background-color", "lightgray");
      break;
    default:
      $("#medium").css("background-color", "lightgray");
      $("#medium").css("color", "yellow");
  }
  dif = n;
  if (Boolean(doit)) {
    chooseVars();
  }
}
$(document).ready(function() {
  $(".difficulty").mouseenter(function() {
    $(this).css("background-color", "lightgray");
  });
  $(".difficulty").mouseleave(function() {
    $(this).css("background-color", "white");
    changeDif(dif, false);
  });
  $("#medium").mouseenter(function() {
    $("#medium").css("color", "yellow");
  });
  $("#medium").mouseleave(function() {
    if (dif != 2) {
      $("#medium").css("color", "gold");
    }
  });
});
var num1 = 0;
var num2 = 0;
var num3 = 0;
var num4 = 0;
var correct = false;
var isntRunning = true;
var good = 0;
var bad = 0;
var opTxtObj = {
  add: "+",
  sub: "-",
  mul: "&times;"
}

function randInt(min, max) {
  min = Math.round(Number(min));
  max = Math.round(Number(max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseVars() {
  switch (dif) {
    case 1:
      num1 = randInt(1, 2);
      num2 = randInt(0, 9);
      if ($("#type").val() === "sub") {
        num3 = randInt(1, num1);
        num4 = randInt(0, num2);
      } else if ($("#type").val() === "mul") {
        num1 = "";
        num3 = "";
        num4 = randInt(1, 9);
      } else {
        num3 = randInt(1, 2);
        num4 = randInt(0, 9);
      }
      break;
    case 3:
      num1 = randInt(2, 9);
      num2 = randInt(0, 9);
      num3 = randInt(2, 9);
      num4 = randInt(0, 9);
      if ($("#type").val() === "mul") {
        num1 = randInt(1, 2);
        num3 = randInt(1, 2);
      }
      break;
    default:
      num1 = randInt(1, 5);
      num2 = randInt(0, 9);
      if ($("#type").val() === "sub") {
        num3 = randInt(1, num1);
        num4 = randInt(0, num2);
      } else if ($("#type").val() === "mul") {
        num1 = 1;
        num3 = 1;
        num2 = randInt(0, 5);
        num4 = randInt(0, 5);
      } else {
        num3 = randInt(1, 5);
        num4 = randInt(0, 9);
      }
  }
  $("#math").html("<br>&nbsp" + String(num1) + String(num2) + "<br>" + opTxtObj[$("#type").val()] + String(num3) + String(num4));
}
$(document).ready(chooseVars);

function re() {
  switch ($("#type").val()) {
    case "sub":
      return String((((10 * num1) + num2) - ((10 * num3) + num4)));
      break;
    case "mul":
      return String((((10 * num1) + num2) * ((10 * num3) + num4)));
    default:
      return String((((10 * num1) + num2) + ((10 * num3) + num4)));
  }
}

function submit() {
  if (isntRunning) {
    isntRunning = false;
    switch ($("#type").val()) {
      case "sub":
        correct = String((((10 * num1) + num2) - ((10 * num3) + num4))) === $("#ans").val();
        break;
      case "mul":
        correct = String((((10 * num1) + num2) * ((10 * num3) + num4))) === $("#ans").val();
        break;
      default:
        correct = String((((10 * num1) + num2) + ((10 * num3) + num4))) === $("#ans").val();
    }
    if (correct) {
      $("#math").html("<br><span style=\"color:green; font-size:30px\">" + message(true) + "</span>");
      good++;

      console.log("correct, %d", (((10 * num1) + num2) + ((10 * num3) + num4)));
    } else {
      $("#math").html("<br><span style=\"color:red; font-size:30px\">" + message(false) + "<br>" + re() + "</span>");
      bad++;

      console.log("incorrect, %d", (((10 * num1) + num2) + ((10 * num3) + num4)));
    }
    $("#line").css("opacity", "0");
    $("#med").html("Score: " + (good - bad));
    setTimeout(function() {
      chooseVars();
      $("#ans").val("");
      $("#line").css("opacity", "100");
      isntRunning = true;
    }, 2000);
  }
}

function changeType() {
  $("#math").html("<br>&nbsp" + String(num1) + String(num2) + "<br>" + opTxtObj[$("#type").val()] + String(num3) + String(num4));
  chooseVars();
}
$(document).ready(function() {
  $("#ans").keydown(function(event) {
    if (event.which === 13) {
      submit();
    }
  });
  $("#show").mousedown(function() {
    $("#show").css("background-color", "lightgray");
  });
  $("#show").mouseup(function() {
    $("#show").css("background-color", "white");
  });
  $("#show").mouseleave(function() {
    $("#show").css("background-color", "white");
  });
});

function message(correct) {
  return correct ? ["Nice", "Good Job", "Cool", "Outstanding", "Awesome", "Keep It Up"][randInt(0, 5)] : ["Oops", "Next Time", "Uh Oh", "Whoops", "Try Again"][randInt(0, 4)];
}
