const WIDTH = 450;
const HEIGHT = 450;
// canvas.height = HEIGHT;
// canvas.width = WIDTH;

const scl = 10;

const gamesY = 145;
const snakeCoor = {xmin:0, xmax:110};
const wamCoor = {xmin:120, xmax:200};

const framesY = 105;
const frame1 = {xmin:200, xmax:290};
const frame2 = {xmin: 300, xmax:360};
const frame3 = {xmin: 380, xmax:435};
var upBtn = document.getElementById('upbtn');
        var downBtn = document.getElementById('downbtn');
        var leftBtn = document.getElementById('leftbtn');
        var rightBtn = document.getElementById('rightbtn');

// var imgObj = new Image();

// imgObj.src = 'gameroom.jpg';


var hero;
var bgImg;


function setup() {
    // document.body.style.backgroundImage = "url('gameroom.jpg')";
    // document.body.style.backgroundRepeat = "no-repeat";
    // document.body.style.backgroundPosition = "center";
    // document.body.style.backgroundSize = '450px 450px';
 
    // document.body.style.backgroundSize = `${WIDTH} ${HEIGHT}`;         DOES NOT WORK, EXCEEDED CANVAS SIZE
   bgImg = new component("gameroom.jpg",0,0,'background');
    gameArea.start();
    

    hero = new Hero();
    



}

var gameArea = {
    canvas : document.getElementById('screen'),
    start : function(){

        
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        this.ctx = this.canvas.getContext('2d');

        // imgObj.onload = function(){
        //     ctx.drawImage(imgObj,0,0);
        // }
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); //what is this for?
        this.interval = setInterval(updateScreen, 20);
        // this.direction;

       this.dir = '';
       upBtn.addEventListener('click', function(){

        // hero.ySpeed = -1;
        this.dir = 'Up';
        direction('Up');
        
        });

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
        console.log (`dir is : ${this.dir}`); //QUESTION


        window.addEventListener('keydown',function(event){
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[event.keyCode] = (event.type == 'keydown');
        })

        window.addEventListener('keyup',function(event){
            gameArea.keys = (gameArea.keys || []);
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
    this.width = 140/2;
    this.height = 240/2;
    this.xSpeed = 0;
    this.ySpeed = 0;

    //initial position
    this.x = 10;
    this.y = HEIGHT/2;

    this.image = new Image();
    this.image.src = 'figuretest.png';


    this.update = function() {
        ctx = gameArea.ctx ;
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        if(this.y <= gamesY && this.x <= snakeCoor.xmax ){
            this.y = gamesY;
            activateEvents('./snake.html');
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
        // console.log(`hero's coordinate x - ${this.x} y - ${this.y}`);
    }

    /*
    function to activate events
    */
   function activateEvents(address){
       
           window.addEventListener('keydown', function(evt){
            const upkey = evt.key.replace('Arrow','');
            if (upkey == "Up" || gameArea.dir == "Up"){
                // window.location.pathname = '';
                window.location = address;
            }
           })
       }
   
}
function direction(dir){
    gameArea.dir = dir;
    console.log(gameArea.dir);
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
    
    
    
    if ((gameArea.keys && gameArea.keys[37]) || gameArea.dir == "Left")
    {hero.xSpeed = -1;
    gameArea.dir = '';
    }
    if ((gameArea.keys && gameArea.keys[38] ) || gameArea.dir == "Up" )
     {hero.ySpeed = -1;
        gameArea.dir = '';}
    if ((gameArea.keys && gameArea.keys[39] ) || gameArea.dir == "Right")
     {hero.xSpeed = 1;
        gameArea.dir = '';}
    if ((gameArea.keys && gameArea.keys[40] ) || gameArea.dir == "Down")
    {hero.ySpeed = 1;
        gameArea.dir = '';}
    
       
    bgImg.update();
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
    this.image.src = 'gameroom.jpg'
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




