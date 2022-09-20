function init() {
  var canvas = document.getElementById("mycanvas");
  W = canvas.width = 1020;
  H = canvas.height = 510;
  pen = canvas.getContext("2d");
  cs = 30;
  game_over = false;
  score = 5;

  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy = new Image();
  trophy.src = "Assets/trophy.png";

  food = getRandomFood();

  snake = {
    init_len: 5,
    color: "blue",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );

        console.log(i + " : " + this.cells[i].x + " " + this.cells[i].y);
      }
      console.log(" ");
    },

    updateSnake: function () {
      let headX = this.cells[0].x;
      let headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        food = getRandomFood();
        score++;
      } else {
        this.cells.pop();
      }

      var nextX, nextY;

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else if (this.direction == "up") {
        nextX = headX;
        nextY = headY - 1;
      }

      this.cells.unshift({ x: nextX, y: nextY });

      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);

      if (
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y < 0 ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };

  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else if (e.key == "ArrowUp") {
      snake.direction = "up";
    }
    console.log(snake.direction);
  }

  snake.createSnake();
  document.addEventListener("keydown", keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();

  pen.fillStyle = "black";
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
  pen.drawImage(trophy, 15, 17, 3 * cs, 3 * cs);

  pen.font = "25px Roboto";
  pen.fillText(score, 50, 50);
}

function update() {
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round(Math.random() * ((W - cs) / cs));
  var foodY = Math.round(Math.random() * ((H - cs) / cs));

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };

  return food;
}

function gameLoop() {
  if (snake.direction == "stop" || game_over == true) {
    clearInterval(f);
    alert("Game Over!!");
  }
  draw();
  update();
}

init();
var f = setInterval(gameLoop, 100);
