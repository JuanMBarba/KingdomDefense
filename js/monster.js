import MovingObject from "./moving_object";

export default class Monster extends MovingObject{
    constructor(game){
        super(
            game.DIM_X  - 60, //x
            game.DIM_Y - 100 - 110, //y
            50, //width
            50, //height
            "red", //color
            game
        )
        this.vel.x = -5
        this.vel.y = -3
        this.maxMoveSpeed = 10;
        this.maxRange = 30;
        this.current = 0;
    }
    // on death create death animation sprite to the game object
    // delete self after hit
    // but death sprite will play
    update(){
        if( Math.abs(this.current) >= this.maxRange){
            this.vel.y *= -1;
        }
        this.current+= this.vel.y;
    }
}