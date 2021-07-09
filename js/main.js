import MovingObject from "./moving_object";
import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
    // console.log("Webpack is working")

    let gameview = new GameView();

    setupEventHandlers(gameview)

    // document.querySelector(".retry").classList.remove("hidden");
    // document.querySelector(".retry").classList.remove("hidden");
    // let moving_object = new MovingObject(GAME_WIDTH, GAME_HEIGHT)
    // moving_object.draw(ctx);

    // ctx.fillStyle = "blue"
    // ctx.fillRect(0, 0, 20, 20)
})

function setupEventHandlers(gameview){

    let gameStartButton = document.querySelector(".start-button.front");
    gameStartButton.addEventListener("click", () => {
        gameview.start();
        gameStartButton.classList.add("hidden");
        document.querySelector(".start-button.back").classList.add("hidden");
        let audio = document.getElementById("battle-music");
        audio.volume = audio.volume >= 0.1 ? 0.1 : 0;
        // audio.currentTime = ;
        audio.play();
    })

    let gameResetButton = document.querySelector(".start-button.front.retry");
    gameResetButton.addEventListener("click", () => {
        gameview.start();
        gameResetButton.classList.add("hidden");
        document.querySelector(".start-button.back.retry").classList.add("hidden");
        let audio = document.getElementById("battle-music");
        // audio.volume = 0;
        audio.currentTime = 0;
        audio.play();
    })

    let muteButtons = document.querySelectorAll(".mute-button");

    muteButtons.forEach((muteButton) => {
        muteButton.addEventListener("click", () => {
            let audio = document.getElementById("battle-music");
            audio.volume = audio.volume > 0 ? 0 : 0.1;
            let hiddenMute = document.querySelector(".mute-button.hidden");
            muteButton.classList.add("hidden");
            hiddenMute.classList.remove("hidden")
        })
    }) 

    

    let modal = document.querySelector(".modal");

    modal.addEventListener("click", (event) => {
        if(event.target.classList.contains("close")){
            modal.classList.add("hidden");
        }
    })

    let controlsButton = document.querySelector(".controls-button");

    controlsButton.addEventListener("click", () => {
        modal.classList.remove("hidden");
    })
}