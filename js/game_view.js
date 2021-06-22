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
        this.bindKeyHandlers();
        setInterval(() => { this.game.step(), this.game.draw(this.ctx);}, 1000/30)
    }

    bindKeyHandlers() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "w"){
                this.game.keys.upKey = true;
            }
            else if(e.key === "a"){
                this.game.keys.leftKey = true;
            }
            else if(e.key === "s"){
                this.game.keys.downKey = true;
            }
            else if(e.key === "d"){
                this.game.keys.rightKey = true;
            }
        })

        document.addEventListener("keyup", (e) => {
            if (e.key === "w"){
                this.game.keys.upKey = false;
            }
            else if(e.key === "a"){
                this.game.keys.leftKey = false;
            }
            else if(e.key === "s"){
                this.game.keys.downKey = false;
            }
            else if(e.key === "d"){
                this.game.keys.rightKey = false;
            }
        })
    }
}