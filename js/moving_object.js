export default class MovingObject{
    constructor(game){
        this.width = 50;
        this.height = 100;

        this.vel = {
            x: 1,
            y: 0
        }

        this.pos ={
            x: game.DIM_X / 2 - this.width / 2 ,
            y: game.DIM_Y - this.height - 10
        }
    }

    update(){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(ctx){
        ctx.fillStyle = "blue"
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

