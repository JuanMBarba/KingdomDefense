import MovingObject from "./moving_object";
import MonsterSprite from "./monster_sprite";

export default class Monster extends MovingObject{
    constructor(game){
        let randNum = Math.random();
        super(
            // game.DIM_X  - 60, //x
            // game.DIM_Y - 100 - 110, //y
            game.DIM_X + 10 + Math.floor(randNum * 100),
            game.DIM_Y - 100 - Math.floor(randNum * (game.DIM_Y - 100)),
            50, //width
            50, //height
            "red", //color
            game
        )
        this.vel.x = -5
        this.vel.y = -3
        this.maxMoveSpeed = 10;
        this.maxRange = Math.floor(randNum * 30) + 30;
        this.current = Math.round(randNum * this.maxMoveSpeed * 2) - this.maxMoveSpeed/2;
        this.sprite = new MonsterSprite();
    }
    // on death create death animation sprite to the game object
    // delete self after hit
    // but death sprite will play
    update(){
        if( Math.abs(this.current) >= this.maxRange){
            this.vel.y *= -1;
        }
        this.current+= this.vel.y;
        this.sprite.update();
    }

    draw(ctx){
        // super.draw(ctx)
        this.sprite.draw(ctx, this.pos.x, this.pos.y);
    }
}