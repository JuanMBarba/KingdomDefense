import MovingObject from "./moving_object";
import AttackBox from "./attack_box";
import PlayerSprite from "./player_sprite";

export default class Player extends MovingObject{
    constructor(game){
        super(
            60 , //x
            game.DIM_Y - 100 - 100, //y
            50, //width
            100, //height
            "blue",
            game
        )
        //Jump Variables
        this.jumping = false;
        this.dJumping = false;
        //Sprite + Sprite Start Positions
        this.sprite = new PlayerSprite();
        this.facing = "right";
        this.motion = "idle";
        //Attack Variables
        this.attackFrames = 0;
        this.attacking = false;
        //Attack Hit Boxes + Variables
        this.range = {
            x: 125,
            y: 100
        }
        this.rightAttackBox = 
        new AttackBox(
            this.pos.x - this.range.x, this.pos.y, 
            this.width, this.height, this.vel,
            this.range.x, -this.range.y
        );
        this.leftAttackBox = 
            new AttackBox(
                this.pos.x, this.pos.y,
                this.width, this.height, this.vel,
                -this.range.x, -this.range.y
            );
        //Speed Variables
        this.maxMoveSpeed = 10;
        this.maxFallSpeed = 15;
        this.friction = 0.3;
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
        //attackBox
        //sprite
        this.sprite.update(this.facing, this.motion);
    }
    step(){
        super.step();
        //attackBox
        this.rightAttackBox.step(this.pos.x - this.range.x, this.pos.y, this.vel)
        this.leftAttackBox.step(this.pos.x, this.pos.y, this.vel)
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
            if(this.vel.x > 0) this.vel.x = 0;
            this.vel.x -= 1;
            if(!this.attacking) this.facing = "left";
        }
        //only if right key is pressed and less than max speed
        else if (rightKey && this.vel.x < this.maxMoveSpeed) {
            if (this.vel.x < 0) this.vel.x = 0;
            this.vel.x += 1;
            if (!this.attacking) this.facing = "right";
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

    handleAttackCollision(enemy){
        let {x: enemyX, y: enemyY} = enemy.pos;
        // let enemyY = enemy.pos.y;
        let attack = this.facing === "left" ? this.leftAttackBox : this.rightAttackBox;
        let {x, y} = attack.pos;

        if (x >= enemyX + enemy.width){
            return false;
        }
        else if(x + attack.width <= enemyX){
            return false;
        }
        else if (y > enemyY + enemy.height){
            return false;
        }
        else if (y + attack.height <= enemyY) {
            return false;
        }
        else{
            return true;
        }

    }

    draw(ctx) {
        ctx.fillStyle = "blue"
        // console.log(this.pos.x);
        // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        //draw attack box
        // this.leftAttackBox.draw(ctx);
        //Sprites WIP
        this.sprite.draw(ctx, this.pos.x, this.pos.y, this.facing, this.motion)
    }
}