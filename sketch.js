
var trex, trex_running, trex_collided,PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround, groundImage,gameOver,gameOver_img,restart,restart_img;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var jungle;
var jungleImg;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restart_img = loadImage("restart.png");
  gameOver_img = loadImage("gameOver.png");

  jungle_img = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(400,400);

  jungle = createSprite(200,200,200,200);
  jungle.addImage(jungle_img);
  jungle.scale = 1.5;
  jungle.velocityX = -4;
  

  trex = createSprite(50,450,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,450,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 ground.visible = false;
  
  invisibleGround = createSprite(200,460,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(180);

  
  
  
  
  text("Score: "+ score, 500,50);
  
  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    
   
  
    if(keyDown("space") && trex.y >= 400){
      trex.velocityY = -12 ;
    }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  
    if (trex.isTouching(obstaclesGroup)){
      gameState = END;
    }
    
 
  spawnClouds();
  spawnObstacles();
  }
  camera.position.x = trex.x;
  camera.position.y = trex.y;

  if (gameState === END){

  
     
    jungle.velocityX = 0;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }
  
  
  if (mousePressedOver(restart)){
    reset();
  }
  
  
  
   trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,350,40,10);
    cloud.y = Math.round(random(200,300));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,450,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
  ground.velocityX = -4;
  
}