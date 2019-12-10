var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext("2d"); 


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

var interval = 140;

var bgimg;
var resume;
var gameover;
var is_gameover = false;

var playing = false;



function eventImg(img){
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = img;
    this.draw = function(){
        ctx.drawImage(this.image, this.x, this.y, WIDTH, HEIGHT);
    }
}

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
var trywindow;

function setup() {
    snake = new Snake();
    fruit = new Fruit();
    score = new Score();
    resume = new eventImg('image/snake_paused.jpg');
    // pause = new Pause_resume();

    bgimg = new component('snakebg.jpg',0,0,'background');
    gameover = new eventImg('image/snake_gameover.jpg');

    fruit.pickLocation();
    snake.draw();
    score.draw(); // pause.draw();
    
    // resume.image.style.display ='none';

   
 trywindow = setInterval(run, interval);

// function over(){
//     console.log('yay');
//      if(snake.checkCollisionCanvas()){
         
//         clearInterval(interval);
//         gameover.draw();
//      }
    
//  }

canvas.addEventListener('click',function(){
    console.log(`canvas clicked`);
    console.log(`${is_gameover}`);
    
    if(playing){
        playing = false;

        resume.draw();
        // bgimg.image.src = 'image/snake_paused.jpg';
        resume.image.style.display = 'block';
        clearInterval(trywindow);
        

    }
    else if(!playing){
        playing = true;
        // bgimg.draw();
        trywindow = setInterval(run, interval);
        // bgimg.image.src = 'image/snakebg.jpg';
    }
    // interval = 150;

    
})



}; //why () over the function

function run(){
    playing = true;
    if(!is_gameover){
        // console.log('inside run');
        playing = true;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // ctx.fillStyle = '#00f';
    bgimg.update();
    // pause.draw();
    fruit.draw();
    score.draw();


    
 

    snake.update();
    snake.draw();
    // bgimg.update();
    
    if(is_gameover){
        // clearInterval(interval);
        
        gameover.draw();
        gameover.image.style.display = 'block';
        // playing = 'true';
        
        canvas.addEventListener('click',function(){
            is_gameover = 'false';
            playing = 'true';
            clearInterval(interval);
            document.location.reload();
        })

    }

    if (snake.eat(fruit)){
        fruit.pickLocation();
        fruit.draw();
        score.draw();
    }
    // if(snake.checkCollisionCanvas()){
    //     console.log('yay');
    //     // clearInterval(trywindow);
    //     // gameover.draw();

    // }

    if (snake.checkCollision ()){
        console.log('colliding with body');
    }
    }
    
   
    
    
}

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

// var is_gameover = function(){
//     canvas.addEventListener('click',function(){
//         document.location.reload();
//        clearInterval(interval);
//     })
// }

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

