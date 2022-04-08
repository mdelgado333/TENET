class Background {
    constructor(ctx, backgroundWidth, backgroundHeight, imgsource) {
        this.ctx = ctx,
            this.backgroundWidth = backgroundWidth,
            this.backgroundHeight = backgroundHeight,
            this.backgroundX = 0
        this.backgroundY = 0
        this.image = new Image()
        this.image.src = imgsource
    }
    drawBackground() {
        this.ctx.drawImage(this.image, this.backgroundX, this.backgroundY, this.backgroundWidth, this.backgroundHeight)
    }
}