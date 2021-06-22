export default class Sprite{
    constructor(){
        this.spriteWidth = 1280;
        this.spriteHeight = 110;

        this.cols = 8;
        this.rows = 1;
        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;

        this.curFrame = 0;
        this.frameCount = 8;

        this.srcX = 0;
        this.srcY = 0;
        //this.speed = 12;

        this.sprite = new Image();
        this.sprite.src = "./assets/Idle.png";
    }
    update(){
        this.curFrame = (this.curFrame + .25) % this.frameCount;
        this.srcX = (Math.floor(this.curFrame)) * (this.width);
    }

    draw(ctx, x, y){
        ctx.drawImage(this.sprite, this.srcX, this.srcY, this.width, this.height, x, y, this.width, this.height)
    }
}