class Hero{
    constructor(ctx,heroPosX,heroPosY,heroSpeedX,heroSpeedY){
        this.ctx=ctx
        this.heroPos={x:heroPosX, y:heroPosY}
        this.heroSize={w:80,h:100}
        this.heroSpeed={x:heroSpeedX, y:heroSpeedY}
        this.lives=4
        this.imageInstancedHeroLeft = undefined
        this.imageInstancedHeroRight = undefined
        this.imageInstancedHerostandRight = undefined
        this.imageInstancedHerostandLeft = undefined
        this.imageInstancedLife=undefined
        this.imageFrame = 3
        this.imageFrameIndex = 0
        this.imageFrameLife=5
        this.init()
        this.currentImage = this.imageInstancedHerostandLeft
        this.currentWidth = 657
        this.currentHight = 256

        this.lifeSize={w:80, h:20}
    }
    damagedHero(){
        this.lives--
    } 
    init() {
        this.imageInstancedHeroLeft = new Image()
        this.imageInstancedHeroLeft.src = './images/final_hero-left.png'
        this.imageInstancedHeroRight = new Image()
        this.imageInstancedHeroRight.src = './images/final_hero-right.png'
        this.imageInstancedHerostandRight = new Image()
        this.imageInstancedHerostandRight.src = './images/stopped_right.png'
        this.imageInstancedHerostandLeft = new Image()
        this.imageInstancedHerostandLeft.src = './images/stopped_left.png'
        this.imageInstancedLife = new Image()
        this.imageInstancedLife.src = './images/healthBar.png'

    }
    drawHero(timerIndex) {
        this.ctx.drawImage(
            this.currentImage,
            this.imageFrameIndex * (this.currentWidth / this.imageFrame),
            0,
            this.currentWidth / this.imageFrame,
            this.currentHight,
            this.heroPos.x,
            this.heroPos.y,
            this.heroSize.w,
            this.heroSize.h
        )
        this.animate(timerIndex)
    }
    // drawLife(){
    //     if(this.lives==4){
            
    //         this.ctx.drawImage(
    //             this.imageInstancedLife,
    //             this.imageInstancedLife.width / this.imageFrameLife,
    //             this.heroPos.x,
    //             this.heroPos.y-5,
    //             this.lifeSize.w,
    //             this.lifeSize.h
    //         )
    //     }
    //     if(this.lives==3){
    //         this.ctx.drawImage(
    //             this.imageInstancedLife,
    //             2* this.imageInstancedLife.width / this.imageFrameLife,
    //             this.heroPos.x,
    //             this.heroPos.y-5,
    //             this.lifeSize.w,
    //             this.lifeSize.h
    //         )
    //     }
    //     if(this.lives==2){
    //         this.ctx.drawImage(
    //             this.imageInstancedLife,
    //             3* this.imageInstancedLife.width / this.imageFrameLife,
    //             this.heroPos.x,
    //             this.heroPos.y-5,
    //             this.lifeSize.w,
    //             this.lifeSize.h
    //         )
    //     }
    //     if(this.lives==1){
    //         this.ctx.drawImage(
    //             this.imageInstancedLife,
    //             4* this.imageInstancedLife.width / this.imageFrameLife,
    //             this.heroPos.x,
    //             this.heroPos.y-5,
    //             this.lifeSize.w,
    //             this.lifeSize.h
    //         )
    //     }
    //     if(this.lives==0){
    //         this.ctx.drawImage(
    //             this.imageInstancedLife,
    //             this.imageInstancedLife.width / this.imageFrameLife,
    //             this.heroPos.x,
    //             this.heroPos.y-5,
    //             this.lifeSize.w,
    //             this.lifeSize.h
    //         )
    //     }
    // }
    
    animate(timerIndex) {
        if (timerIndex % 4 == 0) {
            this.imageFrameIndex++;
        }
        if (this.imageFrameIndex >= this.imageFrame) {
            this.imageFrameIndex = 0;
        }
    }

    
}
