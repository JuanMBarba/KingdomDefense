export default class MonsterSprite{
    constructor(){
        this.spriteWidth = 768;
        this.spriteHeight = 112;

        this.cols = 8;
        this.rows = 1;
        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;

        this.curFrame = 0;
        this.frameCount = 8;

        this.srcX = 0;
        this.srcY = 0;

        this.sprite = new Image();
        this.sprite.src ="./assets/floating_monster/fire-skull.png"
    }

    setupSprites(){

    }

    update(){
        this.curFrame = (this.curFrame + .25) % this.frameCount;
        this.srcX = Math.floor(this.curFrame) * this.width;
    }

    draw(ctx, x, y){
        ctx.drawImage(
            this.sprite,
            this.srcX, this.srcY,
            this.width, this.height,
            x- 5, y - 15,
            this.width*2/3, this.height*2/3
        )
    }

}