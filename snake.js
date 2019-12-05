var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext("2d"); //check usability

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

var bgimg;

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
    
}

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    score = new Score();

    bgimg = new component('snakebg.jpg',0,0,'background');

    fruit.pickLocation();
    snake.draw();
    score.draw();

    window.setInterval(() => {
    
        ctx.clearRect(0,0, canvas.width, canvas.height);
        // ctx.fillStyle = '#00f';
        bgimg.update();
        fruit.draw();
        score.draw();
        snake.update();
        snake.draw();
        // bgimg.update();
        
 

        if (snake.eat(fruit)){
            fruit.pickLocation();
            fruit.draw();
            score.draw();
        }

        if (snake.checkCollision ()){
            console.log('colliding with body');
        }

//update bg
        


    }, 120)
}()); //why () over the function

function component(address, x, y, type) {
    // this.type = type;
    // if (type == "image") {
         
    //     this.image.src = 'gameroom.jpg';
    // }

    
    this.image = new Image();
    // this.image.src = 'gameroom2.jpg'
    this.width = WIDTH;
    this.height = HEIGHT;   
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.ctx;
        // console.log('update background');
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
     
}

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

function component(address, x, y, type) {

    
    this.image = new Image();
    this.image.src = 'image/snakebg.jpg'
    this.width = WIDTH;
    this.height = HEIGHT;   
    this.x = x;
    this.y = y;    
    this.update = function() {
        // ctx = canvas.ctx;
        // console.log('update background');
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
     
}
