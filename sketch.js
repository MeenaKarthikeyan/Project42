var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey=createSprite(100,340,20,50);;
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
 
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();

  monkey.debug = true

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    monkey.changeAnimation("moving", monkey_running);
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground); 

    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score+1;
      monkey.scale += 0.01;
    }
       

    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
      monkey.visible = false;
      backgr.velocityX=0;
      foodGroup.destroyEach();
      obstaclesGroup.destroyEach(); 
      
      
      
    }
  }
  drawSprites();

  if(gameState === END){
    stroke("red");
    textSize(50);
    fill("red");

    text("GAME OVER" , 300,200);
  } 
  stroke("black");
  textSize(20);
  fill("black");

  text("Score: " + score, 500,20);
  
}

function spawnFood() {
//write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(30,100);    
    banana.velocityX = -5;
    
    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.debug = true
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
