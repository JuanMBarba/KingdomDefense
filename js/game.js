import MovingObject from "./moving_object";
import Player from "./player";
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
        this.player = new Player(this);
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

        this.handleCollisions();
        //moving object
        this.player.draw(ctx);
        //Borders
        this.borders.forEach( border => {

            border.draw(ctx)
        });

        //draw circle
        // ctx.beginPath();
        // ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        // ctx.fillStyle = "red";
        // ctx.fill();
    }

    handleCollisions(){
        this.player.handleGameScreenCollision();

        this.borders.forEach(border => {
            this.player.handleCollision(border);
        });
    }

    step(){
        this.player.step(); 
    }
}