const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const pointsOutput = document.querySelector('#points');
const startButton = document.querySelector('#button');
let isGameStarted = false;

startButton.addEventListener('click',() => {
  if(!isGameStarted){
    Snake();
    isGameStarted = true;
  } 
})

function Snake(){
  
  let snake = {
    x: 200,
    y: 200,
    speed: 20,
  };
  let tail = [{x: 180, y:200}, {x:160, y:200}];
  let apple = {
    x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
    y: Math.floor(Math.random() * (canvas.height / 20)) * 20,
  };
  let points = 0;
  pointsOutput.innerHTML = 0;
  let gameSpeed = 10;
  var startInterval;

  

  function startGame(){
    startInterval = setInterval(game, 1000 / gameSpeed);
  }

  function stopGame(){
    clearInterval(startInterval);
    isGameStarted = false;
  }

  function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkTailCollision();
    tail.unshift({x: snake.x, y: snake.y})
    checkAppleCollision()
    drawApple();
    changeDirection();
    crossWall();
    drawSnake();
    drawTail();
  }


  function drawSnake() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(snake.x, snake.y, 20, 20);
  }

  function drawTail(){
      tail.forEach(part => {
          ctx.fillStyle = "green";
          ctx.fillRect(part.x, part.y, 19, 19);
      })
  }

  function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, 20, 20);
  }

  //render next apple in another location
  function randomAppleLocation() {
    (apple.x = Math.floor(Math.random() * (canvas.width / 20)) * 20),
    (apple.y = Math.floor(Math.random() * (canvas.height / 20)) * 20);
  }

  // check if the snake touched his tail, if yes, its stop game
  function checkTailCollision(){
    for(let i=1; i<tail.length; i++){
      // if true stop game
      if(snake.x === tail[i].x && snake.y === tail[i].y && 
        snake.x-20 === tail[i].x-20 && snake.y-20 === tail[i].y-20){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = '48px serif';
          ctx.fillStyle = 'White';
          ctx.width = '100px';
          ctx.fillText('Koniec gry', canvas.width/2-100, canvas.height/2-100);
          ctx.width = '150px';
          ctx.fillText(`Twój wynik to ${points}`, canvas.width/2-150, canvas.height/2);
          stopGame();
          break;
      }
    }
  }


  // checks if the snake touched the apple, if yes, it renders another apple at a random location
  function checkAppleCollision() {
    if (snake.x === apple.x && snake.y === apple.y && 
        snake.x-20 === apple.x-20 && snake.y-20 === apple.y-20) {
      randomAppleLocation();
      points += 1;
      pointsOutput.innerHTML = points;
    } else tail.pop()
  }

  // if cross the wall, snake come from the other side
  function crossWall() {
    if (snake.x > canvas.width-10) {
      snake.x = 0;
    }
    if (snake.x < 0) {
      snake.x = canvas.width;
    }
    if (snake.y > canvas.height-10) {
      snake.y = 0;
    }
    if (snake.y < 0) {
      snake.y = canvas.height;
    }
  }

  let previousDirection = 'Right';
  let direction;

  function changeDirection() {
    switch (direction) {
      case "Up":
        snake.y -= snake.speed;
        break;
      case "Down":
        snake.y += snake.speed;
        break;
      case "Right":
        snake.x += snake.speed;
        break;
      case "Left":
        snake.x -= snake.speed;
        break;
      default:
        snake.x += snake.speed;
    }
  }

  document.addEventListener("keydown", keyDown);

  function keyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        previousDirection == 'Down' ? '' : direction = "Up";
        break;
      case "ArrowDown":
        previousDirection == 'Up' ? '' : direction = "Down";
        break;
      case "ArrowLeft":
        previousDirection == 'Right' ? '' : direction = "Left";
        break;
      case "ArrowRight":
        previousDirection == 'Left' ? '' : direction = "Right";
        break;
    }
    //check acutal direction isn't same as next wanted direction
    if(previousDirection !== direction){
      previousDirection = direction;
    }
  }
  startGame();
}
