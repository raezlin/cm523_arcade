//snake object oriented js
function gg(){
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = 'image/snake_gameover.jpg';
    this.draw = function(){
        ctx.drawImage(this.image, this.x, this.y, 450, 450);
    }
}
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scl;
    this.ySpeed = 0; //scl/2

    this.total = 0;
    this.tail = []; //store coordinate

    this.draw = function(){
//body of the snake
        ctx.fillStyle = 'white';

        // tail.array.forEach(element => {
        //     ctx.fillRect(this.x, this.y, scl, scl/2);
        // });

        for (let i = 0; i<this.tail.length;i++){
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        ctx.fillRect(this.x, this.y, scl, scl); //why height needs to be divided by 2

    }

    this.update = function() {
//update when eat fruit

        for (let i = 0; i<this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = {x: this.x, y:this.y};


     
        this.x += this.xSpeed;
        this.y += this.ySpeed;


        //add boundary to snake activity, gameover
        if (this.x > canvas.width){
            this.x = 0;
            // bgImg.draw();
            // bgImg.image.src = ''
            // let ggImg = new gg();
            // ggImg.draw();
            this.checkCollisionCanvas();
            // clearInterval(interval);
            
            // canvas.addEventListener('click',function(){
            //     document.location.reload();
       
            // })
            // this.checkCollisionCanvas();
        }
        if(this.x < 0){
            this.x = canvas.width;
            this.checkCollisionCanvas();
        }
        if(this.y > canvas.height){
            this.y = 0;
            this.checkCollisionCanvas();
        }
        if(this.y < 0){
            this.y = canvas.height;
            this.checkCollisionCanvas();
        }

        //try try apply here
        


    }

    this.changeDirection = function(direction){
        switch(direction){
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scl;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scl;
                break;
            case 'Left':
                this.xSpeed = -scl;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scl;
                this.ySpeed = 0;
                break;
        }
    }
    this.checkCollisionCanvas = function(){
       


        is_gameover = true;
        return;
    
    
} 
    this.checkCollision = function() {
        
        for (var i = 0; i<this.tail.length;i++){
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                alert("careful! don't run into yourself");
                document.location.reload();
                clearInterval(interval);
                // ABOVE WORKING


            }
            
            
        }
        

    }




    this.eat = function(fruit){
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }

    
}
