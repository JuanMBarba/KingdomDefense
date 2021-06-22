import MovingObject from "./moving_object";

export default class Game{
    constructor(){
        this.DIM_X = 1200;
        this.DIM_Y = 600;
    
        this.mo = new MovingObject(this);
    }

    draw(ctx){
        //background
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, 1200, 600);

        //moving object
        this.mo.draw(ctx)
    }

    step(){
        this.mo.update();
    }
}