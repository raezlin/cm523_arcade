/*
QUESTIONS:
- cannot cancel activateevent once the hero has walked up to the snake coordinate;

*/
//  


const WIDTH = 450;
const HEIGHT = 450;
// canvas.height = HEIGHT;
// canvas.width = WIDTH;

const scl = 30;

const gamesY = 145;
const snakeCoor = {xmin:0, xmax:110};
const wamCoor = {xmin:120, xmax:200};

const framesY = 105;
const frame1 = {xmin:200, xmax:290};
const frame2 = {xmin: 300, xmax:360};
const frame3 = {xmin: 380, xmax:435};

var infoP = document.getElementById('insert_info');
var status = 'welcome';


var upBtn = document.getElementById('upbtn');
        var downBtn = document.getElementById('downbtn');
        var leftBtn = document.getElementById('leftbtn');
        var rightBtn = document.getElementById('rightbtn');

// var imgObj = new Image();

// imgObj.src = 'gameroom.jpg';


var hero;
var bgImg;


var music = document.querySelector("#music");


function setup() {
 
    
 
    // document.body.style.backgroundSize = `${WIDTH} ${HEIGHT}`;         DOES NOT WORK, EXCEEDED CANVAS SIZE
   bgImg = new component("image/gameroom3.jpg",0,0,'background');
    gameArea.start();
    

    hero = new Hero();
    

}

var gameArea = {
    canvas : document.getElementById('screen'),
    start : function(){

        
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        this.ctx = this.canvas.getContext('2d');
        this.interval = setInterval(updateScreen, 20);

       this.dir = '';
       upBtn.addEventListener('click', function(){
        
        // hero.ySpeed = -1;
        this.dir = 'Up';
        direction('Up');
        
        });
        // hero = new Hero();
        downBtn.addEventListener('click', function(){

            // hero.ySpeed = 1;
            this.dir = 'Down';
            direction('Down');
       
        });
        leftBtn.addEventListener('click', function(){
            // hero.xSpeed = -1;
            this.dir = 'Left';
            direction('Left');
        } );
        rightBtn.addEventListener('click', function(){

            // hero.xSpeed = 1;
            this.dir = 'Right';
            direction('Right');
    
        });
        // console.log (`dir is : ${this.dir}`); //QUESTION


        window.addEventListener('keydown', ((evt) => {
            const direction = evt.key.replace('Arrow',''); //replace key event with up right left down
            hero.changeDirection(direction);
        
        }))
        window.addEventListener('keyup', ((evt) => {
            const direction = evt.key.replace('Arrow',''); //replace key event with up right left down
            hero.changeDirection(direction);
        
        }))

    },

    clear : function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function Hero(){
    // this.gamearea = gameArea;


    //for now, place holder rect
    this.width = 512/5;
    this.height = 512/5;
    this.xSpeed = 0;
    this.ySpeed = 0;

    //initial position
    this.x = 10;
    this.y = HEIGHT/2;

    this.image = new Image();
    this.image.src = 'image/hero.png';



    this.changeDirection = function(direction){
        switch(direction){
            case 'Up':
                console.log('case up');
                gameArea.dir = 'Up';
                break;
            case 'Down':
                // this.xSpeed = 0;
                // this.ySpeed = scl;
                gameArea.dir = 'Down';
                break;
            case 'Left':
                // this.xSpeed = -scl;
                // this.ySpeed = 0;
                gameArea.dir = 'Left';
                break;
            case 'Right':
                gameArea.dir = 'Right';
                break;
        }
    }



    this.update = function() {
        ctx = gameArea.ctx ;
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        if(this.y <= gamesY && this.x <= snakeCoor.xmax ){
            // infoP.innerHTML = "go up to play snake";
            
            this.y = gamesY;
            activateEvents('./snake.html');
            // upBtn.addEventListener('click', function(evt){
            //     if(gameArea.dir == 'Up'){
            //         activateEvents('./snake.html');
            //     }
            // })
            // window.addEventListener('keydown', function(evt){
            //     // const upkey = evt.key.replace('Arrow','');
            //     if(gameArea.dir == 'Up'){
            //         activateEvents('./snake.html');
            //     }
            //    })
            // console.log(`gamedir is: ${gameArea.dir}`);
            // activateEvents('./snake.html');
            
           
            
        }

        if(this.y <= gamesY && (this.x >= wamCoor.xmin && this.x <= wamCoor.xmax)){
            this.y = gamesY;
            
            activateEvents('./mole.html');
        }
        if (this.x > WIDTH){
            console.log("further than width")
            this.x = WIDTH-this.width;
            
        }
        if(this.x < 0){
            // console.log("x<0");
            this.x = 0;
            
        }
        if(this.y >= HEIGHT){
            // console.log("further than height")
            this.y = HEIGHT-this.height;
            
            // this.checkCollisionCanvas();
        }
        if(this.y <= 0){
            // console.log("y<0");
            this.y = 0;
            // this.checkCollisionCanvas();
        }

        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;
        // console.log(`hero's coordinate x - ${this.x} y - ${this.y}`);
    }

    /*
    function to activate events
    */
   

   function activateEvents(address){
       
        upBtn.addEventListener('click', function(evt){
            if(gameArea.dir == 'Up'){
                window.location = address;
            }
        })
           window.addEventListener('keydown', function(evt){
            // const upkey = evt.key.replace('Arrow','');
            // window.location = address;
            if (gameArea.dir == "Up"){
                // window.location.pathname = '';
                window.location = address;
            }
           })
       }
   
}
function direction(dir){
    gameArea.dir = dir;
    // console.log(gameArea.dir);
}



function updateScreen(){
    gameArea.clear();
    // imgObj.onload = function(){
    //     ctx.drawImage(imgObj,0,0);
    // }
    hero.xSpeed = 0;
    hero.ySpeed = 0;
    //was &&, testing ||
    // console.log(gameArea.keys);
    
    
    
    if ( gameArea.dir == "Left")
    {hero.xSpeed = -1;
    gameArea.dir = '';
    }
    if ( gameArea.dir == "Up" )
     {hero.ySpeed = -1;
        gameArea.dir = '';}
    if ( gameArea.dir == "Right")
     {hero.xSpeed = 1;
        gameArea.dir = '';}
    if (gameArea.dir == "Down")
    {hero.ySpeed = 1;
        gameArea.dir = '';}
    
       
    bgImg.update();
    
    infoP.innerHTML = status;

    hero.newPos();
    hero.update();
    // hero.activateEvents();
    
}
function component(address, x, y, type) {
    // this.type = type;
    // if (type == "image") {
         
    //     this.image.src = 'gameroom.jpg';
    // }

    
    this.image = new Image();
    this.image.src = 'image/gameroom3.jpg'
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




