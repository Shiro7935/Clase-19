var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ooo",ghostImg);
  ghost.scale = 0.35;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();



  ghost.setCollider("rectangle",ghost.x-220,ghost.y-160,ghost.width-150,ghost.height-50);
  ghost.debug = true;
}

function draw() {
  background(200);
  
  if(gameState == "play"){
    if(tower.y > 400){
      tower.y = 300
    }
  

    if(keyDown("right_arrow")){
      ghost.x = ghost.x+2.222
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x-2.222
    }

    if(keyDown("space")){
      ghost.velocityY = -5
    }

    ghost.velocityY = ghost.velocityY+0.5

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost)){
      gameState = "end"
    }

  
  spawnDoors();
  if(ghost.y >= 620){
    gameState = "end"
  }
  drawSprites(); 
  }

  if(gameState == "end"){
    background("black");


    fill("white")
    if(keyDown("space")){
      fill("black") 
     }
    textSize(40)
    text("GAME OVER",160,250);
    

  }

 
}

function spawnDoors() {
  if(frameCount %240 == 0){
    door = createSprite(200,-50)
    door.addImage("doo",doorImg)
    door.x = Math.round(random(120,400))
    door.velocityY = 1
    door.lifetime = 710
    doorsGroup.add(door);

    climber = createSprite(200,10)
    climber.addImage("cli",climberImg)
    climber.x = door.x
    climber.velocityY = 1
    climber.lifetime = 710
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200,15,85,10)
    invisibleBlock.visible = false; 
    invisibleBlock.x = climber.x
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = 710
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
  }
  
}