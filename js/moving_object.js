export default class MovingObject{
    constructor(game){
        this.width = 50;
        this.height = 100;

        this.pos ={
            x: game.DIM_X / 2 - this.width / 2 ,
            y: game.DIM_Y - this.height - 10
        }
    }

    draw(ctx){
        ctx.fillStyle = "blue"
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

