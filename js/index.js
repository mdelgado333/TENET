window.onload = () => {
   
    const canvas = document.querySelector("#myCanvas")
    const caja = document.querySelector('.caja')

    document.getElementById('start').onclick = () => {
        canvas.classList.remove('hidden')
        caja.classList.add('hidden')
    }
}





const gameLauncher= {
    name: 'Tenet',
    description: 'Intento de Tenet',
    authors: ['Miguel Delgado', 'Alejandro Mazas de Lizana', 'Cristian Calderón'],
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: {w:undefined,h:undefined},
    hero1: undefined,
    platforms: [],
    FPS:60,
    timerIndex:0,
    jumpCounter:0,
    shootingIndex:0,
    bullets:[],
    bulletDirection:[],
    enemyArr: [],
    enemyBullets:[], // AQUI NO HAY NADA !!
    arrayDer:[],
    arrayIzq:[],
    myInterval:undefined,
    backgroundimg: undefined,
    gravity:2,



    init(canvasID){
        this.canvasNode=document.querySelector(`#${canvasID}`)
        this.ctx=this.canvasNode.getContext('2d')
        this.setDimensions()
        this.createBackground()
        this.createHero()
        this.createEnemy()
        this.createPlatform()
        this.setEventListeners()
        this.startGame()
        
    },

    setDimensions(){
        this.gameSize={
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },
    createBackground(){
        this.backgroundimg = new Background(this.ctx, this.gameSize.w, this.gameSize.h, './images/background.jpeg')
    },
//------------------------------------------------------------------------------------------------------POSX POSY WIDTH HEIGHT------------------------------------------------------------------
    createPlatform(){
        this.platforms.push(
            // PLATAFORMA 3 : 0
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, this.gameSize.w/3, this.gameSize.h/4 - this.gameSize.h/20,2*this.gameSize.w/3,20),
            // PLATAFORMA 2 : 1
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, 0, 2*this.gameSize.h/4 - this.gameSize.h/20,2*this.gameSize.w/3,20),
            // PLATAFORMA 1 : 2
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, this.gameSize.w/3, 3*this.gameSize.h/4 - this.gameSize.h/20,2*this.gameSize.w/3,20),
            //SUELO : 3
            new Platform(this.ctx,this.gameSize.w, this.gameSize.h, 0, this.gameSize.h - this.gameSize.h/20,this.gameSize.w,30),
            //  SNIPER
            new Platform(this.ctx, this.gameSize.w, this.gameSize.h, 0, this.gameSize.h / 4 - this.gameSize.h / 20, 2 * this.gameSize.w / 40, 20),
            // SNIPER 2
            new Platform(this.ctx, this.gameSize.w, this.gameSize.h, this.gameSize.w - 70, 2 * this.gameSize.h / 4 - this.gameSize.h / 20, 2 * this.gameSize.w / 30, 20)
            
            )
    },   
    ///HERO!!!!!!!!!!!!!!!!!!!!!!!!!!   
    createHero(){
        this.hero1 = new Hero(this.ctx, 3 * this.gameSize.w / 4, 19*this.gameSize.h/20, 30, 2)
    },
    moveRight(){
        
        this.hero1.heroPos.x+=15   //this.hero1.heroSpeed.x
    },
    moveLeft(){
        this.hero1.heroPos.x-=15   //this.hero1.heroSpeed.x
    }
    ,
    moveUp() {
        this.hero1.heroSpeed.y -= 25
    },
    moveDown() {
        this.hero1.heroPos.y += this.hero1.heroSpeed.y
        if (this.hero1.heroPos.y + this.hero1.heroSize.h + this.hero1.heroSpeed.y <= this.gameSize.h)
            this.hero1.heroSpeed.y += this.gravity
        else this.hero1.heroSpeed.y = 0
    },
    
    
  // ME CAGO EN TOOOOODOO QUE FURULAAAAAA---------------------------------------------------------------

    collisions(){
        this.platforms.forEach((eachPlatform) => {
            if (this.hero1.heroPos.x < eachPlatform.obstaclePos.x + eachPlatform.obstacleSize.w &&
                this.hero1.heroPos.x + this.hero1.heroSize.w > eachPlatform.obstaclePos.x &&
                this.hero1.heroPos.y < eachPlatform.obstaclePos.y + eachPlatform.obstacleSize.h &&
                this.hero1.heroSize.h + this.hero1.heroPos.y > eachPlatform.obstaclePos.y) {
                this.hero1.heroSpeed.y = -1
            }
        })
    },
    // BALAS HEROE

    createBullets() {
        this.bullets.push(new Bullet(this.ctx, this.hero1.heroPos.x,this.hero1.heroPos.y + this.hero1.heroSize.h/3, 20, 5, 20))
    },
    shoot() {
        this.bullets.forEach(eachBullet => eachBullet.drawBullet())
    },
    bulletsmove() {
        if (this.bulletDirection[0] === 'L') {
            this.bullets.forEach(eachBullet => {
                eachBullet.moveLeft()
                eachBullet.drawBullet()
            })
        } else if (this.bulletDirection[0] === 'R') {
            this.bullets.forEach(eachBullet => {
                eachBullet.moveRight()
                eachBullet.drawBullet()
            })
        }
    },
    ///ENEMYY!!!!!!!!!!!!!!!!!!!!!!!!!!
    createEnemy() {
        this.enemyArr.push(
           // 4 MEDIO : DISPARA IZQ : INDEX 0
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 750, 3*this.gameSize.h/20 -70),
           // 4 DER : DISPARA IZQ : INDEX 1
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 1100, 3*this.gameSize.h/20 -70),
           // 4 IZQ : DISPARA DER : INDEX 2
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 20, 3*this.gameSize.h/20 -70),
           // 3 IZQ : DISPARA DER : INDEX 3
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 400, 2*this.gameSize.h/4 - this.gameSize.h/20 - 100,),
           // 3 DER : DISPARA IZQ : INDEX 4
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, this.gameSize.w -40, 2*this.gameSize.h/4 - this.gameSize.h/20 - 100),
           // 2 DER : DISPARA IZQ : INDEX 5
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 1000, 3*this.gameSize.h/4 - this.gameSize.h/20 - 100),
           // 2 IZQ : DISPARA IZQ : INDEX 6
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 600, 3*this.gameSize.h/4 - this.gameSize.h/20 - 100),
           // 1 IZQ : DISPARA DER : INDEX 7
           new Enemy(this.ctx, this.gameSize.w, this.gameSize.h, 250, this.gameSize.h - this.gameSize.h /20 - 100)
            )
        this.arrayDer.push(this.enemyArr[2],this.enemyArr[3],this.enemyArr[7])
        this.arrayIzq.push(this.enemyArr[0],this.enemyArr[1],this.enemyArr[4],this.enemyArr[5],this.enemyArr[6])
    },
    enemySight() {

        this.enemyArr.forEach(eachEnemy => {
            if (this.hero1.heroPos.y-20 < eachEnemy.enemyPos.y &&
                this.hero1.heroPos.y + this.hero1.heroSize.h+20 > eachEnemy.enemyPos.y + eachEnemy.enemySize.h){
                    if(this.shootingIndex%(Math.floor(Math.random()*(70-20+1)+20))==0){
            eachEnemy.villainShoot()
                    }
        }
    })
    },
    

    moveEnemyBullets() {
        this.arrayIzq.forEach(eachEnemy=> {
            eachEnemy.enemyBullets.forEach(eachBullet => {
                eachBullet.moveLeft()
                eachEnemy.currentEnemyImage=eachEnemy.imageInstancedEnemyLeft
            })
        })
        this.arrayDer.forEach(eachEnemy=> {
            eachEnemy.enemyBullets.forEach(eachBullet => {
                eachBullet.moveRight()
                eachEnemy.currentEnemyImage=eachEnemy.imageInstancedEnemyRight
            })
        })
        
        //this.enemyBullets.forEach(eachBullet => eachBullet.moveLeft())

       // this.enemyArr.forEach(eachEnemy => {
            //if (this.hero1.heroPos.x < eachEnemy.enemyPos.x){
                //console.log('esta a la izq')
               // this.enemyBullets.forEach(eachBullet => eachBullet.moveLeft())
           // } else if (this.hero1.heroPos.x > eachEnemy.enemyPos.x){
               // console.log('esta a la der')
           // this.enemyBullets.forEach(eachBullet => eachBullet.moveRight())
        // }


        
    
    },

    heroBulletWithEnemy(){
        this.enemyArr.forEach((eachEnemy,i,enemyArr) => {
        this.bullets.forEach((eachBullet, j , bullets) => {
        if (eachBullet.bulletPos.x <eachEnemy.enemySize.w + eachEnemy.enemyPos.x &&
            eachBullet.bulletPos.x + eachBullet.bulletSize.w > eachEnemy.enemyPos.x &&
            eachBullet.bulletPos.y < eachEnemy.enemyPos.y + eachEnemy.enemySize.h && 
            eachBullet.bulletSize.h + eachBullet.bulletPos.y > eachEnemy.enemyPos.y){
                eachEnemy.damagedEnemy()
                this.bullets.splice(j,1)
                this.enemyArr.splice(i,1)
                //this.enemyArr.splice(i,1)
            }
            })
        })
    },
    // heroBulletWithHero(){
    //     this.bullets.forEach(eachBullet => {console.log()
    //     if (eachBullet.bulletPos.x <this.hero1.heroSize.w + this.hero1.heroPos.x &&
    //         eachBullet.bulletPos.x + eachBullet.bulletSize.w > this.hero1.heroPos.x &&
    //         eachBullet.bulletPos.y < this.hero1.heroPos.y + this.hero1.heroSize.h && 
    //         eachBullet.bulletSize.h + eachBullet.bulletPos.y > this.hero1.heroPos.y){
    //             console.log('Colision bala con heroe')
    //             return true
    //             } else {
    //                 return false
    //             }
    //         })
    // },
    enemyBulletWithHero(){
        this.enemyArr.forEach(eachEnemy => {
        eachEnemy.enemyBullets.forEach((eachBullet, i, enemyBullets) => {
        if (eachBullet.bulletPos.x < this.hero1.heroSize.w + this.hero1.heroPos.x &&
            eachBullet.bulletPos.x + eachBullet.bulletSize.w > this.hero1.heroPos.x &&
            eachBullet.bulletPos.y < this.hero1.heroPos.y + this.hero1.heroSize.h && 
            eachBullet.bulletSize.h + eachBullet.bulletPos.y > this.hero1.heroPos.y){
                this.hero1.damagedHero()
                eachEnemy.enemyBullets.splice(i,1)
                }
            })
        })
    },
    //eachEnemy.damagedEnemy()
    //this.hero1.damagedHero()
    //this.enemyArr=enemyArr.forEach(eachEnemy => eachEnemy.lives==0)

    gameOver(){
        if(this.hero1.lives==0 || this.enemyArr.length==0){
            clearInterval(myInterval)
        }
    },

   
    setEventListeners(){
        document.onkeydown=event=> {
            const { key } = event
            if(this.hero1.heroPos.x>=1.5*this.hero1.heroSize.w){
            if (key == 'a') {
                    this.moveLeft()
                    this.bulletDirection[0] = 'L'
                    this.hero1.currentImage = this.hero1.imageInstancedHeroLeft
                }
                }
            if (key == 'd') {
                if(this.hero1.heroPos.x<=this.gameSize.w-2*this.hero1.heroSize.w){
                    this.moveRight()
                    this.bulletDirection[0] = 'R'
                    this.hero1.currentImage = this.hero1.imageInstancedHeroRight
                }
                }
            if (key == 's') this.createBullets()
    
                if (key == 'w') {
                    this.moveUp()
                }
        }
        document.onkeyup = event => {
            const { key } = event
            if (key == 'a') {
                this.hero1.currentImage = this.hero1.imageInstancedHerostandLeft
            }
            if (key == 'd') {
                this.hero1.currentImage = this.hero1.imageInstancedHerostandRight
            }
        }

    },
    drawAll(){
        this.backgroundimg.drawBackground()
        this.hero1.drawHero(this.timerIndex)
        // this.hero1.drawLife()
        this.enemyArr.forEach(eachEnemy=>eachEnemy.drawEnemy(this.timerIndex))
        this.platforms.forEach(eachPlatform=>eachPlatform.drawPlatform())
        this.collisions()
        this.moveDown()
        this.enemySight()
        this.bulletsmove()
        this.enemyArr.forEach(eachEnemy=> {
            eachEnemy.enemyBullets.forEach(eachBullet => {
                eachBullet.drawEnemyBullet()

            })
        })
        this.moveEnemyBullets()
        this.heroBulletWithEnemy()
        this.enemyBulletWithHero()
        //this.heroBulletWithHero()
        this.gameOver()

        
    },
    clearAll(){
        this.ctx.clearRect(0,0,this.gameSize.w, this.gameSize.h)
    },
    startGame(){
        myInterval = setInterval(()=>{
            this.clearAll()
            this.drawAll()
            this.timerIndex++
            this.jumpCounter++
            this.shootingIndex++
        },1000/this.FPS)
    }
}