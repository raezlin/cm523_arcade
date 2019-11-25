const fruitColor = '#6c2';


function Fruit() {
    this.x;
    this.y;
//random location
    this.pickLocation = function() {
        this.x = (Math.floor((Math.random() * rows - 1) + 1)  * scl );
        this.y = (Math.floor((Math.random() * col - 1) + 1)  * scl );

        // why x y needs to *2 /2 in order for the fruit to randomly show up within the entire canvas
        // this.x = (Math.floor((Math.random() * rows * scl)));
        // this.y = (Math.floor((Math.random() * col * scl)));
        // console.log(fruit);
    }
    this.draw = function() {
        ctx.fillStyle = fruitColor;
        ctx.fillRect(this.x,this.y, scl, scl);
        
        
        // console.log("completed fruit draw");

    }

}