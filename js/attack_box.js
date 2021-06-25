export default class AttackBox {
    constructor(x, y, width, height, vel, xRange, yRange){
        this.pos = {
            x,
            y
        }
        this.range = {
            x: xRange,
            y: yRange
        }
        this.width = width + Math.abs(xRange);
        this.height = height + Math.abs(yRange);
        this.vel = vel;
    }

    step(x, y, vel){
        this.pos.x = x + this.range.x;
        this.pos.y = y + this.range.y;
        this.vel = vel;
    }

    //Draw for testing only
    draw(ctx){
        // console.log(this.width);
        ctx.fillStyle = "purple";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}