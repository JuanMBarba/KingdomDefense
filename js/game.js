import MovingObject from "./moving_object";
import Border from "./border";

export default class Game{
    constructor(){
        this.DIM_X = 1200;
        this.DIM_Y = 600;

        this.keys = {
            upKey: false,
            downKey: false,
            leftKey: false,
            rightKey: false
        }
    
        this.mo = new MovingObject(this);
        this.borders = [];
        this.populateBorders();
    }

    populateBorders(){
        for (let i = 0; i < 12; i++) {
            this.borders.push(new Border(0 + 100 * i,  this.DIM_Y - 100, 100, 100, 1))
        }
    }

    draw(ctx){
        //background
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, 1200, 600);

        //moving object
        this.mo.draw(ctx);
        this.borders.forEach( border => {

            border.draw(ctx)
        });
    }

    step(){
        this.mo.step();
    }
}