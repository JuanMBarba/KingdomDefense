import MovingObject from "./moving_object";
import Sprite from "./sprite";

export default class Player extends MovingObject{
    constructor(game){
        super(
            60 , //x
            game.DIM_Y - 100 - 110, //y
            50, //width
            100, //height
            "blue",
            game
        )

        this.jumping = false;
        this.dJumping = false;
        this.facing = "right";
        this.motion = "idle";
        this.attackFrames = 0;
        this.attacking = false;
        this.maxMoveSpeed = 10;
        this.maxFallSpeed = 15;
        this.friction = 0.3;
        this.sprite = new Sprite();
    }

    update() {
        let { upKey, leftKey, rightKey, attackKey } = this.game.keys; //downKey not used

        //Handle Horizontal Movement
        this.walk(leftKey, rightKey);
        //jump
        this.jump(upKey);
        
        //gravity
        this.vel.y <= this.maxFallSpeed ? this.vel.y += 2 : "";
        this.vel.x = Math.round(this.vel.x);
        this.vel.y = Math.round(this.vel.y);
        if (this.vel.y > 2) this.motion = "fall"
        //attack
        this.attack(attackKey);

        //sprite
        this.sprite.update(this.facing, this.motion);
    }

    attack(attackKey){
        this.attackFrames != 0 ? this.attackFrames-- : this.attacking = false;
        if(attackKey && !this.attacking){
            this.attacking = true;
            this.attackFrames = 12;
        }
        if (this.attacking){
            this.motion = "attack";
        }
    }

    walk(leftKey, rightKey) {
        if ((!leftKey && !rightKey) || (leftKey && rightKey)) {
            this.vel.x *= this.friction;
            if(this.motion !== "jump") this.motion = "idle";
            return;
        }
        //only if left key is pressed and less than max speed
        else if (leftKey && this.vel.x > -this.maxMoveSpeed) {
            this.vel.x -= 1;
            this.facing = "left";
        }
        //only if right key is pressed and less than max speed
        else if (rightKey && this.vel.x < this.maxMoveSpeed) {
            this.vel.x += 1;
            this.facing = "right";
        }
        if (this.motion != 'jump') this.motion = "run";
    }

    jump(upKey) {
        if (upKey && !this.jumping) {
            this.vel.y = -25;
            this.jumping=true;
            this.motion = "jump"
        }
        else if(upKey && !this.dJumping && this.letgo){
            this.vel.y = -25;
            this.motion = "jump"
            this.dJumping= true
        }
        else if (!upKey){
            this.letgo = true;
        }
    }

    handleGameScreenCollision() {
        if (this.pos.x < 0) this.pos.x = 0;
        else if (this.pos.x + this.width > this.game.DIM_X) this.pos.x = this.game.DIM_X - this.width;
        if (this.pos.y < 0) this.pos.y = 0;
        else if (this.pos.y + this.height > this.game.DIM_Y) this.pos.y = this.game.DIM_Y - this.height;
    }

    handleCollision(other) {
        // need to check for intersection

        //Handle placement
        if (this.pos.y + this.height >= other.y) {
            this.pos.y = other.y - this.height;
            this.vel.y = 0;
            if(this.jumping){ this.motion = "idle"}
            this.jumping = false;
            this.dJumping = false;
            this.letgo = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "blue"
        // console.log(this.pos.x);
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        
        //Sprites WIP
        this.sprite.draw(ctx, this.pos.x, this.pos.y, this.facing, this.motion)
    }
}