const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext("2d"); //check usability

//testing adding another ctx for fruit
//did not work
// const fruit_ctx = canvas.getContext('2d'); 
const WIDTH = 500;
const HEIGHT = 500;
canvas.height = HEIGHT;
canvas.width = WIDTH;
const scl = 15; //10 per unit of speed
const rows = canvas.height / scl;
const col = canvas.width / scl;

var snake;
var fruit;

var score;



(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    // score = new Score();
console.log(canvas.height);
console.log(canvas.width);
    fruit.pickLocation();


    snake.draw();

    window.setInterval(() => {
        // score.update();
        document.querySelector('.score').innerText = snake.total;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        fruit.draw();

        snake.update();
        snake.draw();

        if (snake.eat(fruit)){
            fruit.pickLocation();
        }

        if (snake.checkCollision ()){
            console.log('colliding with body');
        }

        if (snake.checkCollisionCanvas()){
            console.log('colliding with wall');
        }

        

    }, 120)
}()); //why () over the function

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow',''); //replace key event with up right left down
    snake.changeDirection(direction);

}))