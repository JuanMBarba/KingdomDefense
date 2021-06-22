export default class MovingObject{
    constructor(game){
        this.game = game
        this.width = 50;
        this.height = 100;
        this.vel = {
            x: 0,
            y: 0
        }
        this.maxSpeed = 7;
        this.friction = 0.3;
        this.pos ={
            x: game.DIM_X / 2 - this.width / 2 ,
            y: game.DIM_Y - this.height - 110
        }
    }

    update(){
        let {upKey, downKey, leftKey, rightKey} = this.game.keys;

        //Handle Horizontal Movement
        if((!leftKey && !rightKey) || (leftKey && rightKey)){
            this.vel.x *= this.friction;
        }
        //only if left key is pressed and less than max speed
        else if (leftKey && this.vel.x > -this.maxSpeed) {
            this.vel.x -= 1;
        }
        //only if right key is pressed and less than max speed
        else if (rightKey && this.vel.x < this.maxSpeed) {
            this.vel.x += 1;
        }

        if(upKey){
            this.vel.y = -15
        }

        this.vel.y <= this.maxSpeed ? this.vel.y += 2 : "";

    }

    step(){
        this.update();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(ctx){
        ctx.fillStyle = "blue"
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

