const options = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover");

const computerBtn = options.querySelector(".computer")
const friendBtn = options.querySelector(".friend")
const xBtn = options.querySelector(".x")
const oBtn = options.querySelector(".o")
const easyBtn = options.querySelector(".easy")
const diffBtn = options.querySelector(".diff")

const playBtn = options.querySelector(".play")

let OPPONENT;
let LEVEL;
const player = new Object;

computerBtn.addEventListener("click", function () {
  OPPONENT = "computer";

  switchActive(friendBtn, computerBtn);

});
friendBtn.addEventListener("click", function () {
  OPPONENT = "friend";

  switchActive(computerBtn, friendBtn);

});
xBtn.addEventListener("click", function () {
  player.man = "X";
  player.computer = "O";
  player.friend = "O";

  switchActive(oBtn, xBtn);

});
oBtn.addEventListener("click", function () {

  player.man = "O";
  player.computer = "X";
  player.friend = "X";

  switchActive(xBtn, oBtn);

});
easyBtn.addEventListener("click", function () {

  LEVEL = "easy";

  switchActive(diffBtn, easyBtn);

});
diffBtn.addEventListener("click", function () {

  LEVEL = "diff";

  switchActive(easyBtn, diffBtn);

});
playBtn.addEventListener("click", function () {

  if (!OPPONENT) {
    computerBtn.style.backgroundColor = "#ff471a";
    friendBtn.style.backgroundColor = "#ff471a";
    alert("Select either computer or friend");
    return;
  }

  if (!player.man) {
    xBtn.style.backgroundColor = "#ff471a";
    oBtn.style.backgroundColor = "#ff471a";
    
    alert("Select a symbol");
    return;
  }
  if (!LEVEL) {
    easyBtn.style.backgroundColor = "#ff471a";
    diffBtn.style.backgroundColor = "#ff471a";

    alert("Select a Level");
    return;
  }


  init(player, OPPONENT,LEVEL);
  options.classList.add("hide");

});

function switchActive(off, on) {
  off.classList.remove("active");
  on.classList.add("active");
}