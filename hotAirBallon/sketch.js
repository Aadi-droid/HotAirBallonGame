var balloon, balloonImg, bg, bgImg, groundTop, groundBottom, gameOverImg, restartImg, restartSprite, gameOverSprite;
var obstacleTop,obsTop1, obsTop2,topObstacleGroup; 
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3, bottomObstacleGroup;
var PLAY=0;
var END=1;
var gameState=PLAY;
var score=0;
var coins,coinsImg, coinsGrp;
function preload() {
   bgImg = loadImage("bg.png")
   balloonImg = loadImage("balloon1.png")
   obsTop2 = loadImage("obsTop2.png")
   obsBottom1 = loadImage("obsBottom1.png")
   obsBottom2 = loadImage("obsBottom3.png")
   obsBottom3 = loadImage("obsBottom2.png")
   obsTop1=loadImage("obsTop1.png")
   gameOverImg = loadImage("gameOver.png")
   restartImg = loadImage("restart.png")
   coinsImg=loadImage("OIP.jpg")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    bg = createSprite(windowWidth/2, windowHeight/2)
    bg.addImage(bgImg)
    bg.scale = 2

    groundTop = createSprite(windowWidth/2, 10, 2000, 20)
    groundTop.visible = false

    groundBottom = createSprite(windowWidth/2, 640, 2000, 20)
    groundBottom.visible = false

    balloon = createSprite(150, 300)
    balloon.addImage(balloonImg)
    balloon.scale = 0.25
    topObstacleGroup= new Group();
    bottomObstacleGroup = new Group();

    gameOverSprite = createSprite(windowWidth/2, 100, 20, 20)
    gameOverSprite.visible=false;
    gameOverSprite.addImage(gameOverImg);
    
    restartSprite = createSprite(windowWidth/2, windowHeight/2, 20, 20);
    restartSprite.visible = false;
    restartSprite.addImage(restartImg);

    coinsGrp = new Group();
}
function draw() {
background("white");
    if(gameState === PLAY) {
                
        if(keyCode === UP_ARROW)
        {
            balloon.velocityY = -5
        }
    
        if(keyCode === DOWN_ARROW)
        {
            balloon.velocityY = 5
        }
        obsTopF();
        obsBottomF();
        powerPoints();

        //condition for End state
        if(topObstacleGroup.isTouching(balloon) || bottomObstacleGroup.isTouching(balloon)) {
           gameState = END;
        }

    } 

    if(gameState === END) {

               

        topObstacleGroup.setVelocityXEach(0);
        topObstacleGroup.setLifetimeEach(-1);
        topObstacleGroup.destroyEach();

        bottomObstacleGroup.setVelocityXEach(0);
        bottomObstacleGroup.setLifetimeEach(-1);
        bottomObstacleGroup.destroyEach();

        balloon.velocityY = 0;
        balloon.x = windowWidth/2;
        balloon.y = windowHeight/2;

        gameOverSprite.visible = true
        restartSprite.visible = true
        restartSprite.depth=restartSprite.depth+1;

        coinsGrp.destroyEach();
        coinsGrp.setVelocityXEach(0)
        coinsGrp.setLifetimeEach(-1)

        if(mousePressedOver(restartSprite)) {
            reset();
            
        }
    }

    drawSprites(); 
    
    scoreF();
    } 

function reset(){
   gameState = PLAY;
   gameOverSprite.visible = false
   restartSprite.visible = false
   balloon.x=150;
   balloon.y=300;
   score=0;
}

function obsTopF() {
    if (World.frameCount % 60 === 0){
        obstacleTop=createSprite(windowWidth,50,40,40);
        obstacleTop.scale=0.1;
        obstacleTop.velocityX=-4
        obstacleTop.y=Math.round(random(30, 300))
        var ran=Math.round(random(1,2));
        switch(ran){
            case 1:obstacleTop.addImage(obsTop1);
                    break;
            case 2:obstacleTop.addImage(obsTop2);
                    break;
            default: break;        

        }
        obstacleTop.lifetime=400;
        balloon.depth=balloon.depth+1
        topObstacleGroup.add(obstacleTop);
    }

}

function obsBottomF() {
    if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(windowWidth, windowHeight/2+200, 360, 360)
        obstacleBottom.scale = 0.1;
        obstacleBottom.velocityX = -5;
        //obstacleBottom.y = Math.round(random(windowHeight/2,windowHeight/2+400))
        var ran1 = Math.round(random(1,3));
        switch(ran1) {
            case 1:obstacleBottom.addImage(obsBottom1)
                      break;
            case 2:obstacleBottom.addImage(obsBottom2)
                      break;
            case 3:obstacleBottom.addImage(obsBottom3)
                      break;
            default:  break;
        }
        obstacleBottom.lifetime = 400;
        balloon.depth = balloon.depth+1;
        bottomObstacleGroup.add(obstacleBottom)
    }
}

function scoreF() {

     if(balloon.isTouching(coinsGrp)) {
        coinsGrp.destroyEach();
        score = score + 1
     }  
     
     textFont("Times New Roman")
     textSize(30)
     fill("black")
     text("Score: "+score, 100, 100)
}

function powerPoints(){
    if(World.frameCount%90 === 0) {
        coins = createSprite(windowWidth, windowHeight/2, 20, 20);
        coins.addImage(coinsImg)
        coins.scale = 0.1
        coins.velocityX = -5
        coins.lifetime = 400
        balloon.depth = balloon.depth+1;
        coinsGrp.add(coins)
    }
}