import MovingObject from "./moving_object";
import Player from "./player";
import Monster from "./monster";
import Border from "./border";

export default class Game{
    constructor(){
        this.DIM_X = 1200;
        this.DIM_Y = 600;

        this.keys = {
            upKey: false,
            downKey: false,
            leftKey: false,
            rightKey: false,
            attackKey: false
        }
        this.timePassed = 0;
        this.player = new Player(this);
        //this.monster = new Monster(this);
        this.borders = [];
        this.enemies = [];
        this.populateBorders();
        this.populateEnemies();
    }

    populateBorders(){
        for (let i = 0; i < 12; i++) {
            this.borders.push(new Border(0 + 100 * i,  this.DIM_Y - 100, 100, 100, 1))
        }
    }
    populateEnemies(){
        for (let i = 0; i < 1; i++) {
            this.enemies.push(new Monster(this))
        }
    }

    handleCollisions(){
        this.player.handleGameScreenCollision();

        this.borders.forEach(border => {
            this.player.handleCollision(border);
        });

        
        if (this.player.attacking && this.player.attackFrames < 6){
            let toBeDeleted = [];
            this.enemies.forEach((enemy, idx) => {
                if (this.player.handleAttackCollision(enemy)){
                    toBeDeleted.push(idx - toBeDeleted.length);
                }
            });
            toBeDeleted.forEach(idx => {
                delete this.enemies[idx];
            });
        }
        
    }

    step(){
        this.player.step(); 
        this.enemies.forEach(enemy => {
            enemy.step();
        });
        this.handleCollisions();
    }

    draw(ctx) {
        //background
        ctx.fillStyle = "lightblue";
        ctx.fillStyle = "rgba(30,139,195, 0.6)";
        ctx.fillRect(0, 0, 1200, 600);
        //moving object
        this.player.draw(ctx);
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
        //Borders
        this.borders.forEach(border => {

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
}