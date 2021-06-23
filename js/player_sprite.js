export default class PlayerSprite{
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

        this.setupSprites();
        // this.sprite = new Image();
        // this.sprite.src = "./assets/player/RightIdle.png";
    }

    setupSprites(){
        this.sprites = {
            right: {
                idle: new Image(),
                run: new Image(),
                jump: new Image(),
                fall: new Image(),
                attack: new Image()
            },
            left: {
                idle: new Image(),
                run: new Image(),
                jump: new Image(),
                fall: new Image(),
                attack: new Image()
            }
        }
        this.sprites.right.idle.src = "./assets/player/RightIdle.png";
        this.sprites.left.idle.src = "./assets/player/LeftIdle.png"
        this.sprites.right.run.src = "./assets/player/RightRun.png";
        this.sprites.left.run.src = "./assets/player/LeftRun.png"
        this.sprites.right.jump.src = "./assets/player/RightJump.png";
        this.sprites.left.jump.src = "./assets/player/LeftJump.png"
        this.sprites.right.fall.src = "./assets/player/RightFall.png";
        this.sprites.left.fall.src = "./assets/player/LeftFall.png"
        this.sprites.right.attack.src = "./assets/player/RightAttack3.png";
        this.sprites.left.attack.src = "./assets/player/LeftAttack3.png"
    }

    updateParams(motion){
        if (motion === "attack") {
            this.spriteWidth = 640;

            this.cols = 4;
            this.rows = 1;
            this.width = this.spriteWidth / this.cols;
            this.height = this.spriteHeight / this.rows;

            if (this.lastMotion != "attack") {this.curFrame = 0}
            this.curFrame = this.curFrame;
            this.frameCount = 4;

            this.srcX = 0;
            this.srcY = 0;
        }
        else if (motion === "jump" || motion === "fall"){
            this.spriteWidth = 320;

            this.cols = 2;
            this.rows = 1;
            this.width = this.spriteWidth / this.cols;
            this.height = this.spriteHeight / this.rows;

            this.curFrame = this.curFrame > 2 ? 0 : this.curFrame;
            this.frameCount = 2;

            this.srcX = 0;
            this.srcY = 0;
        }
        else{
            this.spriteWidth = 1280

            this.cols = 8;
            this.rows = 1;
            this.width = this.spriteWidth / this.cols;
            this.height = this.spriteHeight / this.rows;

            this.curFrame = this.curFrame;
            this.frameCount = 8;

            this.srcX = 0;
            this.srcY = 0;  
        }
    }

    update(facing, motion){
        this.updateParams(motion);
        this.lastMotion = motion;
        this.curFrame = (this.curFrame + .25) % this.frameCount;
        if( facing == "right"){
            this.srcX = (Math.floor(this.curFrame)) * (this.width);
        }
        else{
            this.srcX = (this.frameCount - (Math.floor(this.curFrame)) - 1) * (this.width);
        }
    }

    draw(ctx, x, y, facing, motion){
        // ctx.save();
        // ctx.scale(-1, 1);
        let sprite = this.sprites[facing][motion];
        ctx.drawImage(
            sprite, 
            this.srcX, this.srcY, 
            this.width, this.height,
            x - 135, y - 110, 
            this.width*2, this.height*2)
        // ctx.restore()
        // requestAnimationFrame(draw);
    }
}