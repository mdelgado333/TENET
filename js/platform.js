class Platform {
    constructor(ctx, gameSizeWidth, gameSizeHeight, obstaclePosX, obstaclePosY, obstacleWidth, obstacleHeight) {
        this.ctx = ctx
        this.gameSize = { w: gameSizeWidth, h: gameSizeHeight }
        this.obstaclePos = { x: obstaclePosX, y: obstaclePosY }
        this.obstacleSize = { w: obstacleWidth, h: obstacleHeight }
        this.imageInstanceplatform = undefined
        this.init()
    }
    init() {
        this.imageInstanceplatform = new Image()
        this.imageInstanceplatform.src = './images/Platform.jpeg'
    }
    drawPlatform() {
        this.ctx.drawImage(this.imageInstanceplatform, this.obstaclePos.x, this.obstaclePos.y, this.obstacleSize.w, this.obstacleSize.h)
    }
}