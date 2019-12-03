const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext("2d"); //check usability

//testing adding another ctx for fruit
//did not work
// const fruit_ctx = canvas.getContext('2d'); 
const WIDTH = 450;
const HEIGHT = 450;
canvas.height = HEIGHT;
canvas.width = WIDTH;
const scl = 25; //10 per unit of speed
const rows = canvas.height / scl;
const col = canvas.width / scl;

var upBtn = document.getElementById('upbtn');
var downBtn = document.getElementById('downbtn');
var leftBtn = document.getElementById('leftbtn');
var rightBtn = document.getElementById('rightbtn');

var snake;
var fruit;
var score;

var backBtn = document.getElementById('back');
backBtn.addEventListener('click', function(){
    window.location = './index.html';
})

function Score() {
    this.text =    `SCORE : `;

    // this.x = canvas.width/2;
    // this.y = scl;

    this.draw = function(){
        // ctx.fillText = (this.text, this.x, this.y,'black');
        // ctx = document.getElementById('gameScreen').getContext('2d');
        
        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`SCORE : ${snake.total}`, 50, 50);
        console.log(`SCORE : '+ ${snake.total}`);
    }
    // this.update = function(){
    //     console.log("inside score update");
    //     this.text = this.text + `${snake.total}`;
    // }
    
}

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    score = new Score();

    fruit.pickLocation();
    snake.draw();
    score.draw();

    window.setInterval(() => {
        // score.update();
        // document.querySelector('.score').innerText = snake.total;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        fruit.draw();
        score.draw();
        snake.update();
        snake.draw();
        
        // fruit.draw();


        if (snake.eat(fruit)){
            fruit.pickLocation();
            fruit.draw();
            score.draw();
        }

        if (snake.checkCollision ()){
            console.log('colliding with body');
        }


    }, 120)
}()); //why () over the function

upBtn.addEventListener('click', function(){
    snake.changeDirection('Up');
})
downBtn.addEventListener('click', function(){
    snake.changeDirection('Down');
})
leftBtn.addEventListener('click', function(){
    snake.changeDirection('Left');
})
rightBtn.addEventListener('click', function(){
    snake.changeDirection('Right');
})

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow',''); //replace key event with up right left down
    snake.changeDirection(direction);

}))