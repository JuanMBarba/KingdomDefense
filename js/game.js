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
        //Time Vars
        this.timePassed = 0;
        this.lastSpawnTime = 0;
        this.spawnInterval = 3;
        //Background
        this.background = new Image();
        this.background.src = "./assets/background/game-background.jpeg";
        this.player = new Player(this);
        //this.monster = new Monster(this);
        this.borders = [];
        //Enemy Vars
        this.enemies = [];
        this.populateBorders();
        this.spawnAmount = 1;
        this.populateEnemies(this.spawnAmount);
        this.totalKills = 0;
        //Town Vars
        this.townDestruction = 0;
    }

    populateBorders(){
        for (let i = 0; i < 12; i++) {
            this.borders.push(new Border(0 + 100 * i,  this.DIM_Y - 100, 100, 100, 1))
        }
    }
    populateEnemies(amount){
        for (let i = 0; i < amount; i++) {
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
                this.enemies.splice(idx, 1);
                this.totalKills++
            });
        }
        
        //Handle Despawn
    }

    step(){
        this.player.step(); 
        this.enemies.forEach(enemy => {
            enemy.step();
        });
        this.handleCollisions();
        this.timePassed++;
        this.timeActions();
    }

    timeActions(){
        let totalSeconds = Math.floor(this.timePassed/30);
        this.seconds = Math.floor(this.timePassed / 30) % 60;
        this.minutes = Math.floor(totalSeconds/60);

        if (this.lastSpawnTime + this.spawnInterval <= totalSeconds){
            // this.enemies.push(new Monster(this));
            this.populateEnemies(this.spawnAmount);
            this.lastSpawnTime = totalSeconds;
        }
        if (totalSeconds === 15){
            // console.log(this.spawnInterval);
            this.spawnInterval = 2;
            // this.spawnAmount = 2;
        }
        if (totalSeconds === 30) {
            // console.log(this.spawnInterval);
            // this.spawnInterval = 1;
            this.spawnAmount = 2;
        }

        if(totalSeconds === 45){
            this.spawnInterval = 1;
        }

        if (totalSeconds === 60) {
            // console.log(this.spawnInterval);
            // this.spawnInterval = 1;
            this.spawnAmount = 3;
        }
        // if (totalSeconds === 15){
        //     this.spawnInterval = 1;
        // }
    }

    draw(ctx) {
        //background
        //ctx.fillStyle = "lightblue";
        ctx.fillStyle = "rgba(30,139,195, 0.6)";
        ctx.fillRect(0, 0, 1200, 600);
        
        ctx.drawImage(this.background, 0, 0, 1200, 610)
        //moving object
        this.player.draw(ctx);
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
        //Display Time
        ctx.font = "700 40px Arial";
        // ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(`Time : ${this.minutes}:${this.seconds<10?"0":""}${this.seconds}`, 10, 50);

        //Diplay Kills
        ctx.strokeText(`Kills  : ${this.totalKills}`, 10, 100);
        //Borders
        // this.borders.forEach(border => {

        //     border.draw(ctx)
        // });

        //draw circle
        // ctx.beginPath();
        // ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        // ctx.fillStyle = "red";
        // ctx.fill();
    }
}