import MovingObject from "./moving_object";
import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
    // console.log("Webpack is working")

    let gameview = new GameView();

    let gameStartButton = document.querySelector(".start-button.front");
    gameStartButton.addEventListener("click", () => {
        gameview.start();
        gameStartButton.classList.add("hidden");
        document.querySelector(".start-button.back").classList.add("hidden");
    })

    let gameResetButton = document.querySelector(".start-button.front.retry");
    gameResetButton.addEventListener("click", () => {
        gameview.start();
        gameResetButton.classList.add("hidden");
        document.querySelector(".start-button.back.retry").classList.add("hidden");
    })

    // document.querySelector(".retry").classList.remove("hidden");
    // document.querySelector(".retry").classList.remove("hidden");
    // let moving_object = new MovingObject(GAME_WIDTH, GAME_HEIGHT)
    // moving_object.draw(ctx);

    // ctx.fillStyle = "blue"
    // ctx.fillRect(0, 0, 20, 20)
})