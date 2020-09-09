var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var survivaltime;
var background,backgroundImage;
var invisibleGround;
var invisibleGround2;
var restart,restartImage;

function preload()
{
  monkey_running = loadImage("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundImage = loadImage("forestclipart.jpg");
 restartImage = loadImage("images.png");
}



function setup() 
{
  createCanvas(windowWidth,windowHeight);
  FoodGroup = new Group();
  obstaclesGroup = new Group();  

  background = createSprite(200,-300,600,600);
  background.addImage(backgroundImage);
  
  monkey = createSprite(100,450,5,5);
  monkey.addImage(monkey_running);
  monkey.scale =0.2;

  invisibleGround = createSprite(200,495,5000,5);
  invisibleGround.visible = false;

   invisibleGround2 = createSprite(104,0,5000,10);
   invisibleGround2.visible = false;
  
  restart = createSprite(400,40,5,5);
  restart.addImage(restartImage);
  restart.scale = 0.1;

    obstaclesGroup.debug = true;
  
  var survivaltime = 0;
}


function draw()
{
  
  
  if(gameState === PLAY)
  {
    if(keyDown("up"))
    {
    monkey.velocityY=-5;
    }
 
  if(keyDown("down"))
    {
    monkey.velocityY=5;
    }

  }
  else(gameState === END)
  {
    fill("red");
   text("YOU LOSS",200,200); 
    if(obstaclesGroup.isTouching(monkey))
  {    
    fill("red");
   text("YOU LOSS",200,200);
    monkey.velocityY=0;
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    monkey.collide(obstaclesGroup);
  }
  }
  
  if(mousePressedOver(restart))
  {
    reset();
  } 
  
  if(FoodGroup.isTouching(monkey))
  {  
    survivaltime = survivaltime + 3;
    FoodGroup.destroyEach();
  }
  
   
  if(obstaclesGroup.isTouching(monkey))
  {  
    survivaltime = 0;
    FoodGroup.destroyEach();
  }
  
  drawSprites();
   bananas ();
  Rocks ();
monkey.bounceOff(invisibleGround2);
monkey.collide(invisibleGround);
  
 stroke("black");
  textSize(0);
      fill("black");
survivaltime = Math.ceil(frameCount/frameRate());
text(" TIME : "+ survivaltime,200,40);
  
  
}

function reset()
{
 gameState = PLAY;
  obstaclesGroup.destroyEach();
  FoodGoup.destroyEach();
  
  
}


function bananas ()
{
if(frameCount % 220 === 0)
{
   var bananas = createSprite(600,230);
  bananas.addImage(bananaImage);
  bananas.scale = 0.1;
  bananas.velocityX=-3;  
  bananas.setCollider("circle",0,0,50);
  bananas.velocityX = -(4 + 3 * survivaltime/15);
  FoodGroup.add(bananas);
}


  }


function Rocks ()
{
if(frameCount % 230 === 0)
{
   var rocks = createSprite(700,460);
  rocks.addImage(obstacleImage);
  rocks.scale = 0.2;
  rocks.velocityX=-3;  
  rocks.setCollider("circle",0,0,50);
  rocks.collide(invisibleGround2);
  rocks.velocityX = -(4 + 3 * survivaltime/15);
  obstaclesGroup.add(rocks);
}


  }