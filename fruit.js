function Fruit() {
    this.x;
    this.y;
//random location
    this.pickLocation = function() {
        this.x = (Math.floor((Math.random() * rows - 1) + 1)  * scl )*2;
        this.y = (Math.floor((Math.random() * col - 1) + 1)  * scl )/2;

        // why x y needs to *2 /2 in order for the fruit to randomly show up within the entire canvas
        // this.x = (Math.floor((Math.random() * rows * scl)));
        // this.y = (Math.floor((Math.random() * col * scl)));
        console.log(fruit);
    }
    this.draw = function() {
        ctx.fillRect(this.x,this.y, scl, scl/2);
        ctx.fillStyle = "#6c2";

    }

}