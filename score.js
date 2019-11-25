function Score() {
    this.text =    `SCORE : `;

    this.x = canvas.width/2;
    this.y = scl;

    this.draw = function(){
        // ctx.fillText = (this.text, this.x, this.y,'black');
        console.log(`SCORE: ${snake.total}`);
        
        ctx.fillText(`SCORE : ${snake.total}`, 50,50, 'black');
    }
    // this.update = function(){
    //     console.log("inside score update");
    //     this.text = this.text + `${snake.total}`;
    // }
    
}