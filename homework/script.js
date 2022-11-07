let messageConteiner = document.querySelector(".messageConteiner");
let countTime;
let time;

$(document).ready(function () {
  const array = $(".picture");
  let currentIndex = 8;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  array.map(function (i, el) {
    $(".elementsField").append(el);
  });
});

$(".btn-Close").on("click", function () {
  messageConteiner.style.display = "none";
  $(".btn-Check").css("display", "block");
  if (time != 0){
    counterTime();
  }
});

function counterTime() {
  countTime = setInterval(function () {
    time--;
    if (time < 10) {
      time = "0" + time;
    }
    document.querySelector(".time").innerHTML = `00:${time}`;
    $(".btn-start").attr("disabled", "disabled");
    $(".btn-Newgame").attr("disabled", "disabled");
    $(".btn-checkResult").removeAttr("disabled", "disabled");
    if (parseInt(time) <= 0) {
      messageConteiner.style.display = "flex";
      document.querySelector(".text").innerHTML = "Your time is up";
      $(".btn-Newgame").removeAttr("disabled", "disabled");
      clearInterval(countTime);
    }
  }, 1000);
}
$(".btn-start").on("click", function () {
  if (!time) {
    time = 60;
  }
  counterTime();

  $(".picture").draggable({
    snap: ".picture-check",
  });
  $('.picture-check').droppable({
    drop: function(event, ui){},
    out: function(event, ui){},
  })
});



$(".btn-Check").on("click", function () {
 
  $(".btn-Newgame").removeAttr("disabled", "disabled");
  $(".btn-Check").css("display", "none");
  
  let check = true;
  for (let i = 0; i < 9; ++i) {
 

    if ($(".picture").eq(i).attr("data") != $('.picture-check').eq(i).attr("data")) {
      check = false;
      break;
    }

  }
  if (check) {
    messageConteiner.style.display = "flex";
    document.querySelector(".text").innerHTML =
      "Woohoo, well done, you did it!";
  } else {
    messageConteiner.style.display = "flex";
    document.querySelector(".text").innerHTML = "It's a pity, but you lost";
  }
  check = true;
});


$(".btn-checkResult").on("click", function () {
  clearInterval(countTime);
  messageConteiner.style.display = "flex";
  if (time > 0) {
    document.querySelector(
      ".text"
    ).innerHTML = `You still have time, you sure? 00:${time}`;
  } else {
    document.querySelector(".text").innerHTML = "Your time is up";
  }
});

$(".btn-Newgame").on("click", function () {
  location.reload();
});
