import MovingObject from "./moving_object";

export default class Monster{
    constructor(game){
        super(
            game.DIM_X / 2 - 50 / 2, //x
            game.DIM_Y - 100 - 110, //y
            50, //width
            100, //height
            game
        )
    }
}