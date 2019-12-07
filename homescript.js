

const WIDTH = 450;
const HEIGHT = 450;

const scl = 10;

const gamesY = 145;
const snakeCoor = {xmin:0, xmax:40};
const wamCoor = {xmin:90, xmax:150};

const tableY = {ymin:225, ymax:345};
const tableX = {xmin:170,xmax:370, xedge:130};

const clothes = ['image/hero2.png','image/hero3.png','image/hero.png'];
var changedClothes =[];
var clothes_count = 0;


const rackY = 105;
const rackX = {xmin: 330, xmax:350};



var infoP = document.getElementById('insert_info');
var status = 'welcome';


var upBtn = document.getElementById('upbtn');
        var downBtn = document.getElementById('downbtn');
        var leftBtn = document.getElementById('leftbtn');
        var rightBtn = document.getElementById('rightbtn');

var hero;
var bgImg;

var pressedbtn = [];



function setup() {
 
 
   bgImg = new component("image/gameroom4.jpg",0,0,'background');
    gameArea.start();

    hero = new Hero();
    

}

var gameArea = {
    canvas : document.getElementById('screen'),
    start : function(){

        
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        this.ctx = this.canvas.getContext('2d');
        this.interval = setInterval(updateScreen, 50);

       this.dir = '';
       upBtn.addEventListener('click', function(){
   
        // this.dir = 'Up';
        // scl = 20;
        pressedbtn.push('Up');
        direction('Up');
        
        });
    
        downBtn.addEventListener('click', function(){

    
            // this.dir = 'Down';
         
            pressedbtn.push('Down');
            direction('Down');
       
        });
        leftBtn.addEventListener('click', function(){
         
            // this.dir = 'Left';
            direction('Left');
        } );
        rightBtn.addEventListener('click', function(){

          
            // this.dir = 'Right';
            direction('Right');
    
        });
    

        window.addEventListener('keydown', ((evt) => {
            const direction = evt.key.replace('Arrow',''); 
            hero.changeDirection(direction);
        
        }))
        window.addEventListener('keyup', ((evt) => {
            const direction = evt.key.replace('Arrow',''); 
            hero.changeDirection(direction);
        
        }))

    },

    clear : function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function Hero(){

    this.width = 512/5;
    this.height = 512/5;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.x = 10;
    this.y = HEIGHT/2;

    this.image = new Image();
    this.image.src = 'image/hero.png';



    this.changeDirection = function(direction){
        switch(direction){
            case 'Up':
               
                gameArea.dir = 'Up';
                pressedbtn.push(direction);
                break;
            case 'Down':
              
                gameArea.dir = 'Down';
                pressedbtn.push(direction);
                break;
            case 'Left':
              
                gameArea.dir = 'Left';
                pressedbtn.push(direction);
                break;
            case 'Right':
                gameArea.dir = 'Right';
                pressedbtn.push(direction);
                break;
        }
    }



    this.update = function() {
        ctx = gameArea.ctx ;
     
     
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        if(this.y <= gamesY && this.x <= snakeCoor.xmax ){
          
            this.y = gamesY;
            if(pressedbtn.pop()=='Up'){
                pressedbtn=[];
                window.location = './snake.html';
            }
            
   
            
        }

         if(this.y <= gamesY && (this.x >= wamCoor.xmin && this.x <= wamCoor.xmax)){
            this.y = gamesY;
            this.y = gamesY;
            if(pressedbtn.pop()=='Up'){
                pressedbtn=[];
                window.location = './mole.html';
            }
            // activateEvents('./mole.html');
            
        }
        // || this.x >= tableX.xedge && (this.y >= tableY.ymin && this.y <= tableY.ymax)
         if((this.y >= tableY.ymin && this.y <= tableY.ymax) && (this.x >= tableX.xmin && this.x <= tableX.xmax)){
            this.y = tableY.ymin;
            if(pressedbtn.pop()=='Down'){
                pressedbtn=[];
                window.location ='./docs.html';
            }


        }
         if (this.y <= rackY && (this.x >= rackX.xmin && this.x <= rackX.xmax)){
            this.y = rackY;
            if(pressedbtn.pop()=='Up'){
                pressedbtn=[];
                hero.image.src = clothes[clothes_count];
                clothes_count = (clothes_count > 2) ? 0 : (clothes_count + 1);
                // changeClothes();
            }
            
            // changeClothes();
            // hero.image.src = clothes[0];
            // clothes_count = (clothes_count > 2) ? 0 : (clothes_count + 1);
            
        }

         if (this.x > WIDTH){
      
            this.x = WIDTH-this.width;
            
        }
         if(this.x < 0){
       
            this.x = 0;
            
        }
         if(this.y >= HEIGHT){
        
            this.y = HEIGHT-this.height;
            
     
        }
         if(this.y <= 105){
          
            this.y = 105;
          
        }

        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;
        console.log(`hero's coordinate x - ${this.x} y - ${this.y}`);
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
    this.image.src = 'image/gameroom4.jpg'
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




