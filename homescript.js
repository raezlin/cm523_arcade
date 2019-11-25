// const canvas = document.getElementById('screen');
// const ctx = canvas.getContext('2d');

const WIDTH = 450;
const HEIGHT = 450;
// canvas.height = HEIGHT;
// canvas.width = WIDTH;

const scl = 10;


// snake coordinate
// const snakeXmax = 110;
// WAM
// const wamXmin = 120;
// const wamXmax = 200;
//frames
const gamesY = 145;
const snakeCoor = {xmin:0, xmax:110};
const wamCoor = {xmin:120, xmax:200};

const framesY = 105;
const frame1 = {xmin:200, xmax:290};
const frame2 = {xmin: 300, xmax:360};
const frame3 = {xmin: 380, xmax:435};




var hero;

function setup() {
    document.body.style.backgroundImage = "url('gameroom.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = '450px 450px';
    gameArea.start();

    hero = new Hero();
}

var gameArea = {
    canvas : document.getElementById('screen'),
    start : function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        console.log(`this canvas width is ${this.canvas.width}`);
        console.log(`this canvas height is ${this.canvas.height}`);
        

        this.ctx = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); //what is this for?
        this.interval = setInterval(updateScreen, 20);
        
        window.addEventListener('keydown',function(event){
            gameArea.keys = (gameArea.keys || []);
            // gameArea.keys = [];
            gameArea.keys[event.keyCode] = (event.type == 'keydown');
        })

        window.addEventListener('keyup',function(event){
            gameArea.keys = (gameArea.keys || []);
            // gameArea.keys = [];
            gameArea.keys[event.keyCode] = (event.type == 'keydown');
        })
    },

    clear : function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function Hero(){
    // this.gamearea = gameArea;


    //for now, place holder rect
    this.width = 35;
    this.height = 80;
    this.xSpeed = 0;
    this.ySpeed = 0;

    //initial position
    this.x = 10;
    this.y = HEIGHT/2;


    this.update = function() {
        ctx = gameArea.ctx ;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        if(this.y <= gamesY && this.x <= snakeCoor.xmax){
            activateEvents('snake.html');
        }
        if (this.x > WIDTH){
            console.log("further than width")
            this.x = WIDTH-this.width;
            
        }
        if(this.x < 0){
            console.log("x<0");
            this.x = 0;
            
        }
        if(this.y >= HEIGHT){
            console.log("further than height")
            this.y = HEIGHT-this.height;
            
            // this.checkCollisionCanvas();
        }
        if(this.y <= 0){
            console.log("y<0");
            this.y = 0;
            // this.checkCollisionCanvas();
        }

        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;
        console.log(`hero's coordinate x - ${this.x} y - ${this.y}`);
    }

    /*
    function to activate events
    */
   function activateEvents(address){
       
           window.addEventListener('keydown', function(evt){
            const upkey = evt.key.replace('Arrow','');
            if (upkey == "Up"){
                // window.location.pathname = '';
                window.location = address;
            }
           })
       }
   
}

function updateScreen(){
    gameArea.clear();
    
    hero.xSpeed = 0;
    hero.ySpeed = 0;
    if (gameArea.keys && gameArea.keys[37]) {hero.xSpeed = -1;}
    if (gameArea.keys && gameArea.keys[38]) {hero.ySpeed = -1;}
    if (gameArea.keys && gameArea.keys[39]) {hero.xSpeed = 1;}
    if (gameArea.keys && gameArea.keys[40]) {hero.ySpeed = 1;}

    hero.newPos();
    
    hero.update();
    // hero.activateEvents();
    

}



// function Hero() {
//     this.x = WIDTH/2;
//     this.y = HEIGHT/2;
//     this.xSpeed = 0;
//     this.ySpeed = 0;
//     // replace with image later

//     this.draw = function(){
//         ctx.fillStyle = "#00ff";
//         ctx.fillReact(this.x, this.y, scl,scl);
//     }

//     this.walkDirection = function(direction){
//         switch(direction){
//             case 'Up':
//                 // this.x = 0;
//                 this.y += -scl;
//                 break;
//             case 'Down':
//                 // this.x = 0;
//                 this.y += scl;
//                 break;
//             case 'Left':
//                 this.x += -scl;
//                 // this.y = 0;
//                 break;
//             case 'Right':
//                 this.x += scl;
//                 // this.ySpeed = 0;
//                 break;
//         }
//     }
// }

// (function setup() {

//     hero = new Hero();
//     hero.draw;

//     window.setInterval(() => {
//         // score.update();
        
//         ctx.clearRect(0,0, canvas.width, canvas.height);
//         hero.draw;



//     }, 120)
    
// })

