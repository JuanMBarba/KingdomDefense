export default class MonsterSprite{
    constructor(){
        this.spriteWidth = 168;
        this.spriteHeight = 168;

        this.cols = 4;
        this.rows = 4;
        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;

        this.curFrame = 0;
        this.frameCount = 16;

        this.srcX = 0;
        this.srcY = 0;

        this.sprite = new Image();
        this.sprite.src ="./assets/floating_monster/fire-skull-c.png"
    }

    setupSprites(){

    }

    update(){
        this.curFrame = (this.curFrame + .5) % this.frameCount;
        this.srcX = (this.cols - Math.floor(this.curFrame % this.cols) - 1) * this.width;
        this.srcY = Math.floor(this.curFrame / this.rows) * this.height;
    }

    draw(ctx, x, y){
        ctx.drawImage(
            this.sprite,
            this.srcX, this.srcY,
            this.width, this.height,
            x - 20, y - 15,
            this.width * 2, this.height * 2 
        )
    }

}