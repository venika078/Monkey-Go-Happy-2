var PLAY;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup,food;
var bg, bgImage;
var mon,monImage
var score=0;
var lives=3;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
  bgImage=loadImage("jungle.jpg");
  restartImage = loadImage("restart.png")
  monImage=loadImage("sprite_1.png")
}



function setup() {
  createCanvas(400,400);

 //background
  bg=createSprite(canvas.x,canvas.y,600,350);
  bg.addImage(bgImage)
  bg.velocityX=-4;
  //ground
  ground = createSprite(400,375,900,10);
  ground.velocityX=-4;
 //monkey
  monkey = createSprite(80,310,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.09;
  
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
//  background("Lightgreen")
  
  if(gameState===PLAY){
    
     fill("white");
  textSize(15);
  
  
    if (ground.x < 400){
     ground.x = ground.width/2;
    }
    
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    
     if(keyDown("space")&& monkey.y >=100){
    monkey.velocityY=-12;
 }
    
     monkey.velocityY = monkey.velocityY +0.8;
     monkey.collide(ground);
    
    spawnBanana();
  spawnObstacles();

    
   if(monkey.isTouching(obstacleGroup)){
     lives=lives-1;
     obstacleGroup.destroyEach();
   }
     
      if(monkey.isTouching(bananaGroup)){
bananaGroup.destroyEach();
        score=score+2;
  }
    
    if(lives===0){
      gameState=END;
    }
    
    

  }else if (gameState===END){
    
    bg.velocityX=0;
    
     mon = createSprite(80,310)
  mon.scale=0.02;
   mon.addImage(monImage)
    
        monkey.destroy();
    
   
  
          ground.velocityX=0;
//monkey.velocityY=0;
   obstacleGroup.setLifetimeEach(-1);
 bananaGroup.setLifetimeEach(-1);
   
obstacleGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0);
//bananaGroup.destroy();
  //  obstacleGroup.destroy();
mon.destroy();
    
   
  }
 

ground.visible=false;
  
  
  
  life();
 
 drawSprites();
  
  textSize(20)
  fill("white");
      text("SCORE:"+ score,200,50)

  textSize(20)
  fill("white")
  text("LIVES:"+lives,100,50)
}

function spawnBanana(){
  if( frameCount % 60==0){
    var banana=createSprite(400,120,10,10);
    banana.y= Math.round(random(140,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
  //banana.lifetime=200;
  bananaGroup.add(banana);

  }
}

function spawnObstacles(){
  
if(frameCount%200==0){
  
obstacle = createSprite(400,340,10,10);
obstacle.addImage("obstacle",obstacleImage);
obstacle.scale = 0.1;  
    
obstacle.velocityX = -5;  
obstacle.lifetime = 100;  
obstacleGroup.add(obstacle);  
}    
}
function life(){
  if(lives===2){
  monkey.scale=0.07;
  }
   if(lives===1){
  monkey.scale=0.05;
  }
  
  switch(score){
    case 10: monkey.scale=0.10;
       break;
    case 20: monkey.scale=0.12;
       break;
    case 30: monkey.scale=0.14;
       break;
    case 40:monkey.scale=0.16;
       break; 
    case 50:monkey.scale=0.18;
       break;
    case 60:monkey.scale=0.20;  
       break;
    case 70:monkey.scale=0.22;
       break;
    case 80:monkey.scale=0.24;
       break;
         }
}
