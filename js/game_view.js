import Game from "./game";

export default class GameView{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1200;
        this.canvas.height = 600;
        this.game = new Game();
    }

    start(){
        // this.bindKeyHandlers();
        setInterval(() => { this.game.step(), this.game.draw(this.ctx);}, 1000/30)
    }

    bindKeyHandlers() {
        
    }
}