import MovingObject from "./moving_object";
import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Webpack is working")

    let gameview = new GameView();

    gameview.start();
    // let moving_object = new MovingObject(GAME_WIDTH, GAME_HEIGHT)
    // moving_object.draw(ctx);

    // ctx.fillStyle = "blue"
    // ctx.fillRect(0, 0, 20, 20)
})