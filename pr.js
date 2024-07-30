var level = 1;
var userList = [];
var winlist = [];
var bl = 1;

var colors = ["green", "red", "yellow", "blue"];

$(document).ready(function () {
	
	$(".startbutton").on("click", startGame);

	$(".startbutton").addClass("pressed");
	setTimeout(function () {
		$(".startbutton").removeClass("pressed");
	}, 200);
	$(".btn").on("click", clicked);
});
	

function startGame() {
	if (bl === 1)
	{
		$("h1").text("Level " + level);

		var rand = Math.floor(Math.random() * 4) + 1;
		winlist.push(rand);
		demonstrateOrder(winlist);

		userList = [];
		bl = 0;
	}
	


}

function demonstrateOrder(el) {
	for (let index = 0; index < el.length; index++) {
		(function (i) {
			setTimeout(function () {
				if (el[i] == 1) {
					clicked2(".green");
					makesound("green");
				} else if (el[i] == 2) {
					clicked2(".red");
					makesound("red");
				} else if (el[i] == 3) {
					clicked2(".yellow");
					makesound("yellow");
				} else if (el[i] == 4) {
					clicked2(".blue");
					makesound("blue");
				}
			}, 500 * i); // Delay each interval start
		})(index);
	}
}

function clicked2(idd) {
	$(idd).addClass("pressed");
	setTimeout(function () {
		$(idd).removeClass("pressed");
	}, 100);
}

function clicked() {
	const $this = $(this);
	$this.addClass("pressed");

	setTimeout(function () {
		$this.removeClass("pressed");
	}, 100);

	makesound($this.attr("id"));

	switch ($this.attr("id")) {
		case "green":
			userList.push(1);
			break;
		case "red":
			userList.push(2);
			break;
		case "yellow":
			userList.push(3);
			break;
		case "blue":
			userList.push(4);
			break;
		default:
			break;
	}

	checkAnswer();
}

function checkAnswer() {
	const currentLevel = userList.length - 1;

	if (userList[currentLevel] !== winlist[currentLevel]) {
		makesound("wrong");
		bl = 1;
		resetGame();
	} else if (userList.length === winlist.length) {
		setTimeout(startGame, 1000); // Move to the next level
		level++;
		bl = 1;
	}
}

// Reset the game
function resetGame() {
	$("h1").text("Game Over, Press Any Key to Restart");
	makesound("wrong");
	level = 1;
	winlist = [];
	userList = [];
}

// Play the sound
function makesound(key) {
	switch (key) {
		case "green":
			var audio = new Audio("sounds/green.mp3");
			audio.play();
			break;
		case "red":
			var audio = new Audio("sounds/red.mp3");
			audio.play();
			break;
		case "yellow":
			var audio = new Audio("sounds/yellow.mp3");
			audio.play();
			break;
		case "blue":
			var audio = new Audio("sounds/blue.mp3");
			audio.play();
			break;
		case "wrong":
			var audio = new Audio("sounds/wrong.mp3");
			audio.play();
			$("body").addClass("game-over");

			setTimeout(function () {
				$("body").removeClass("game-over");
			}, 100);

			break;
		default:
			break;
	}
}
