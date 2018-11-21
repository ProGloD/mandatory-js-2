let movesLeft = 9;
let player_1 = new Player("Player 1", "X");
let player_2 = new Player("Player 2", "O");
let currentPlayer;
let score = $(".score span");

// start new game
newGame();

// player constructor
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  this.wins = 0;
}

Player.prototype.greeting = function() {
  this.wins++;
  let _this_ = this;
  setTimeout(function() {
    alert(_this_.name + " WON!");
    updateScore();
  }, 250);
}

// reset game
$("#newGame").on("click", function() {
  movesLeft = 9;
  $(".cell").text("").off();
  newGame();
});

//new game
function newGame() {
  // choose random who is starting
  let whoStarts = Math.floor(Math.random() * 2) + 1;
  if (whoStarts === 1) {
    currentPlayer = player_1;
  } else if (whoStarts === 2) {
    currentPlayer = player_2;
  }

  setTimeout(function() {
    alert(currentPlayer.name + " starts!");
  }, 500);

  // event listener for each cell
  $(".cell").on("click", function(e) {
    movesLeft--;
    $(this).text(currentPlayer.symbol);

    // start winner check after 5-th move
    if (movesLeft < 5) {
      checkWinner(currentPlayer);
    }

    // change current player after every move
    if (currentPlayer === player_1) {
      currentPlayer = player_2;
    } else if (currentPlayer === player_2) {
      currentPlayer = player_1;
    }

    // remove event listener from the current cell
    $(this).off();
  });
}

// check if player won
function checkWinner(player) {
  let text = player.symbol;
  let cell_1 = $("#cell_1").text();
  let cell_2 = $("#cell_2").text();
  let cell_3 = $("#cell_3").text();
  let cell_4 = $("#cell_4").text();
  let cell_5 = $("#cell_5").text();
  let cell_6 = $("#cell_6").text();
  let cell_7 = $("#cell_7").text();
  let cell_8 = $("#cell_8").text();
  let cell_9 = $("#cell_9").text();

  if ((cell_1 === text && cell_2 === text && cell_3 === text) || (cell_4 === text && cell_5 === text && cell_6 === text) || (cell_7 === text && cell_8 === text && cell_9 === text) || (cell_1 === text && cell_4 === text && cell_7 === text) || (cell_2 === text && cell_5 === text && cell_8 === text) || (cell_3 === text && cell_6 === text && cell_9 === text) || (cell_1 === text && cell_5 === text && cell_9 === text) || (cell_3 === text && cell_5 === text && cell_7 === text)) {
    player.greeting();
    $(".cell").off();
  } else {
    if (!movesLeft) {
      setTimeout(function() {
        alert("Oavjort!");
      }, 250);
    }
  }
}

function updateScore() {
  score.text(player_1.wins + ":" + player_2.wins);
}