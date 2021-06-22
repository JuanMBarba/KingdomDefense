export default class Border {
    constructor(x, y , width, height, type){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    draw(ctx){
        if (this.type === 1){
            ctx.fillStyle = "green";
        }
        else if ( this.type === 2){
            ctx. fillStyle = "brown"
        }
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}