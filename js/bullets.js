class Bullet {
    constructor(ctx, bulletPosX,bulletPosY,bulletWidth,bulletHeight,bulletSpeed){
        this.ctx=ctx
        this.bulletPos={x:bulletPosX, y:bulletPosY}
        this.bulletSize={w:bulletWidth,h:bulletHeight}
        this.bulletSpeed=bulletSpeed
        this.imageInstancedBulletRight=undefined
        this.imageInstancedBulletLeft=undefined
        this.init()
    }

    init(){
        this.imageInstancedBulletRight = new Image()
        this.imageInstancedBulletRight.src = './images/Bullet right.png'
    }
    drawBullet() {
        this.ctx.drawImage(this.imageInstancedBulletRight, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
    }
    

    drawEnemyBullet() {
        this.ctx.drawImage(this.imageInstancedBulletRight, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
    }


    moveLeft() {
        this.bulletPos.x-=this.bulletSpeed

    }
    moveRight() {
        this.bulletPos.x+=this.bulletSpeed
    }
    
}