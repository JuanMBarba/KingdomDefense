import MovingObject from "./moving_object";

export default class Game{
    constructor(){
        this.DIM_X = 1200;
        this.DIM_Y = 600;
    
        this.mo = new MovingObject(this);
    }

    draw(ctx){
        this.mo.draw(ctx)
    }
}