class Enemy {
    constructor(ctx, gameSizeWidth, gameSizeHeight, enemyPosX, enemyPosY) {
        this.ctx = ctx
        this.gameSize = { w: gameSizeWidth, h: gameSizeHeight }
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemySize = { w: 65, h: 110 }
        this.enemyBullets = []
        this.timerIndex = 0
        this.lives=12

        this.imageInstancedEnemyLeft = undefined
        this.imageInstancedEnemyRight = undefined
        this.imageInstancedEnemy = undefined
        this.imageFrame = 3
        this.imageFrameIndex = 0
        this.init()

        this.currentEnemyImage = this.imageInstancedEnemy
        this.currentEnemyWidth = 273
        this.currentEnemyHight = 168
        this.currentEnemyShootingWidth = 166
        this.currentEnemyShootingHight = 151
    }

    init() {
        this.imageInstancedEnemyLeft = new Image()
        this.imageInstancedEnemyLeft.src = './images/enemyShootingLeft.png'
        this.imageInstancedEnemyRight = new Image()
        this.imageInstancedEnemyRight.src = './images/enemyShootingRight.png'
        this.imageInstancedEnemy = new Image()
        this.imageInstancedEnemy.src = './images/enemy.png'
    }

    drawEnemyShooting() {
        this.ctx.drawImage(
            this.currentEnemyImage,
            this.currentEnemyShootingWidth,
            this.currentEnemyShootingHight,
            this.enemyPos.x,
            this.enemyPos.y,
            this.enemySize.w,
            this.enemySize.h
            )
    }

    drawEnemy(timerIndex) {
        this.ctx.drawImage(
            this.currentEnemyImage,
            this.imageFrameIndex * (this.currentEnemyWidth / this.imageFrame),
            0,
            this.currentEnemyWidth / this.imageFrame,
            this.currentEnemyHight,
            this.enemyPos.x,
            this.enemyPos.y,
            this.enemySize.w,
            this.enemySize.h
        )
        this.animate(timerIndex)
    }
    animate(timerIndex) {
        if (timerIndex % 4 == 0) {
            this.imageFrameIndex++;
        }
        if (this.imageFrameIndex >= this.imageFrame) {
            this.imageFrameIndex = 0;
        }
    }

    villainShoot() {
        this.enemyBullets.push(
            new Bullet(this.ctx, this.enemyPos.x+ this.enemySize.w/2, this.enemyPos.y +this.enemySize.h/4 - 8, 20, 5, 20))
            
    
    }
    damagedEnemy(){
        this.lives--
    }
    
}

// CONSTRUCTOR
        // this.imageInstancedEnemyLeft = undefined
        // this.imageInstancedEnemyRight = undefined
        // this.imageInstancedEnemy = undefined
        // this.imageFrame = 3
        // this.imageFrameIndex = 0
        // this.init()
//------------------------------------------------------------------------------------
// INIT
// init() {
//     this.imageInstancedEnemyLeft = new Image()
//     this.imageInstancedEnemyLeft.src = './images/enemyShootingLeft.png'
//     this.imageInstancedHeroRight = new Image()
//     this.imageInstancedHeroRight.src = './images/enemyShootingRight.png'
//     this.imageInstancedHeroRight = new Image()
//     this.imageInstancedHeroRight.src = './images/enemy.png'
// }
//------------------------------------------------------------------------------------
// DRAWHERO HAY QUE CAMBIARLO POR DRAWENEMYRIGHT Y DRAWENEMYLEFT
// drawHero(timerIndex) {
//     this.imageLeft(timerIndex)
// }
//------------------------------------------------------------------------------------
// animate(timerIndex) {
//     if (timerIndex % 4 == 0) {
//         this.imageFrameIndex++;
//     }
//     if (this.imageFrameIndex >= this.imageFrame) {
//         this.imageFrameIndex = 0;
//     }
// }
//------------------------------------------------------------------------------------
// imageLeft(timerIndex) {
//     this.ctx.drawImage(
//         this.imageInstancedHeroLeft,
//         this.imageFrameIndex * (this.imageInstancedHeroLeft.width / this.imageFrame),
//         0,
//         this.imageInstancedHeroLeft.width / this.imageFrame,
//         this.imageInstancedHeroLeft.height,
//         this.heroPos.x,
//         this.heroPos.y,
//         this.heroSize.w,
//         this.heroSize.h
//     )
//     this.animate(timerIndex)
// }
//------------------------------------------------------------------------------------
// imageRight(timerIndex) {
//     this.ctx.drawImage(
//         this.imageInstancedHeroRight,
//         this.imageFrameIndex * (this.imageInstancedHeroRight.width / this.imageFrame),
//         0,
//         this.imageInstancedHeroRight.width / this.imageFrame,
//         this.imageInstancedHeroRight.height,
//         this.heroPos.x,
//         this.heroPos.y,
//         this.heroSize.w,
//         this.heroSize.h
//     )
//     this.animate(timerIndex)
// }