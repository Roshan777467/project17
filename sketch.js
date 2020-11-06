var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime,score;
var ground;
var spawnbananas,spawnobstacles;

function preload(){
 
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,400);
 
  monkey = createSprite(80,315,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
 

  ground = createSprite(400,350,1900,10);
  ground.shapeColor="brown";
  ground.x = ground.width/2;
  console.log(ground.x);
 
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
 
  survivalTime=0;
  score=0;
}


function draw() {
  background("lightblue");
 
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score,500,50);
 
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,100,50);
 
  if(gameState === PLAY) {
 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    ground.velocityX = -(5 + 3* score/100)
 
   if(keyDown("space")&& monkey.y >= 130) {
        monkey.velocityY = -12;
   }
     monkey.velocityY = monkey.velocityY + 0.9;
     
     spawnobstacles();
     spawnbananas();
   
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
  }
   
    if(FoodGroup.isTouching(monkey)){
       FoodGroup.destroyEach();
       score=score+1;
    }
  }
 
  else if(gameState === END) {
    text("Better Luck Next Time",150,100);
    score=0;
    text("Press R to Restart",150,200);
   
    if(keyDown("r")){
      survivalTime=0
      reset();
    }
   
    monkey.velocityY=0;
    ground.velocityX=0;
   
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
  }
 
  monkey.collide(ground);
     
  drawSprites();
}

function reset(){
  gameState=PLAY;
  text.visible=false;
  text.visible=false;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
}


function spawnobstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(500,315,40,10);
    var rand = Math.round(random(1,6));
    obstacle.addImage(obstacleImage);
    obstacle.scale =0.15;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
}
}



function spawnbananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime=200;
   
    FoodGroup.add(banana);
}
}







