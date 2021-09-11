var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var Climb = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostImg);
}

function draw(){
  background("grey");

  if (gameState === "play") {

   Climb = Climb + Math.round(frameRate()/60);

   tower.velocityY = (1 +2*Climb/80);

    if(keyDown("LEFT_ARROW")){
      ghost.velocityX = -3;
    }
    
    if(keyDown("RIGHT_ARROW")){
      ghost.velocityX = 3
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }

  textSize(20);
  fill("red");
  text("Distance: "+ Climb, 440,40);

  
  if (gameState === "end"){
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250) 
  }
}

function spawnDoors() {

  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(120,400));
    door.velocityY = (1 + Climb/80);
    door.addImage(doorImg);
    doorsGroup.add(door);

    ghost.depth = door.depth;
    ghost.depth +=1;

    var climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = (1 + Climb/80);
    climbersGroup.add(climber);

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = (1 + Climb/80);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible = false;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
  }
}