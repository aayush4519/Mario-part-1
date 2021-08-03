var bg;
var obstacle1;
var mario, marioRunning
var ob;
var ground;
var groundImage;
var obstacleGroup;
var gameState = "play";
var marioCollided;
var gameOver, gameOverimg;
var restart, restartImg;
var score = 0;


function preload() {
  bg = loadImage("bg.png");
  marioRunning = loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png");
  obstacle1 = loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png", "obstacle4.png");
  groundImage = loadImage("ground2.png");
  marioCollided = loadAnimation("collided.png")
  gameOverimg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(700, 550);
  mario = createSprite(50, 430, 20, 50)
  mario.addAnimation("running", marioRunning)
  mario.addAnimation("collided", marioCollided);
  mario.scale = 2;
  invisGround = createSprite(200, 470, 400, 10);
  invisGround.visible = false;
  ground = createSprite(200, 500, 400, 10);
  ground.addImage("gImage", groundImage);
  obstacleGroup = new Group()
  restart = createSprite(367 , 242);
  gameOver = createSprite(321 , 81) 
  restart.addImage("restart1" , restartImg);
  gameOver.addImage("gameOver" , gameOverimg)
  gameOver.visible = false ;
  restart.visible = false

}

function draw() {

  background(bg);
  text(mouseX + "," + mouseY, mouseX, mouseY);
  fill("red");
  textSize(16);
  textFont("Comic sans ms")
  text( "Score " + score  , 620  ,  31 )

  if (gameState === "play") {
    score = score + Math.round(getFrameRate()/60);
    spawning();
    if (keyDown("space") && mario.y>=427 ) {


      mario.velocityY = -12;

    }

    ground.velocityX = -12;

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    mario.velocityY = mario.velocityY + 0.5;


    if (mario.isTouching(obstacleGroup)) {
      gameState = "end";
    }
  }
  if (gameState === "end") {
    ground.velocityX = 0;
    mario.velocityY = 0;
    mario.changeAnimation("collided", marioCollided);
    gameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
  }


  mario.collide(invisGround);
  drawSprites();
//console.log(mario.y);





}



function spawning() {
  if (frameCount % 100 === 0) {
    ob = createSprite(700, 440, 30, 30);
    ob.addAnimation("obsta", obstacle1);
    ob.velocityX = -12;
    obstacleGroup.add(ob);
  }
}

function reset(){
 gameState = "play";
 restart.visible=false;
 gameOver.visible = false;
 mario.changeAnimation("running" , marioRunning) 
score = 0;
}