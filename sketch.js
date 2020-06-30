let bg
let x = 300
let y = 200
let avatar;
let vidas = 10
let pontos = 0
let meteor1X = 650
let meteor1Y = 248
let meteor2X = -50
let meteor2Y = 248
let meteor2
let meteor1
let distRA1, distRA2, distRA3, distRA4, distRA5, distRA6, distRA7, distRA8
let speed = 5, avatarSpeed = 7
let play = false
let shield = 5
let shield_load, shield_create = 0, shield_image
let shield_activate = false
let stars_load, stars_create
let shieldX, shieldY, distShield
let backsound_load
let codeX = false, codeL = false, codeR = false, code8 = false


function setup() {
  createCanvas(600, 400);
  soundFormats('mp3', 'ogg');
  backsound.play()
  backsound.setVolume(0.1)
}

function preload() {
  bg = loadImage('images/bg.jpg');
  avatar = loadImage('images/avatar.png')
  inimigo1 = loadImage('images/inimigo1.png')
  inimigo2 = loadImage('images/inimigo2.png')
  shield_load = loadImage('images/shield.png')
  stars_load = loadImage('images/stars.gif')
  backsound = loadSound('sounds/backsound.mp3');
}

function draw() {
  if (play == true) {
    if (vidas > 0) {
      imageMode(CORNER)
      background(bg);
      imageMode(CENTER)
      image(avatar, x, y, 50, 72)
      //inimigo1
      imageMode(CENTER)
      meteor1 = image(inimigo2, meteor1X, meteor1Y, 40, 20)
      //inimigo1
      
      //movimentaçao inimigo
      meteor1X -= speed

      if (meteor1X < -50) {
        meteor1X = 630
        meteor1Y = random(80, 360)
      }
      //movimentaçao inimigo

      //distancias meteoro 1  
      distRA1 = dist(x, y, meteor1X - 20, meteor1Y)
      distRA2 = dist(x, y - 25, meteor1X - 20, meteor1Y)
      distRA3 = dist(x, y + 25, meteor1X - 20, meteor1Y)
      distRA7 = dist(x, y, meteor1X, meteor1Y)
      //distancias meteoro 1   

      //distancias meteoro 2   
      distRA4 = dist(x, y, meteor2X + 20, meteor2Y)
      distRA5 = dist(x, y - 25, meteor2X + 20, meteor2Y)
      distRA6 = dist(x, y + 25, meteor2X + 20, meteor2Y)
      distRA7 = dist(x, y, meteor2X, meteor2Y)
      //distancias meteoro 2

      //mecanica do escudo
      if (shield_activate == true) {
        imageMode(CENTER)
        image(shield_load, x, y, 95, 95)

        //colisão
        if (distRA1 < 13 || distRA2 < 13 || distRA3 < 13 || distRA7 < 20) {
          vidas += 1
          meteor1X = 630
          meteor1Y = random(80, 360)
          shield_activate = false
        }
        if (distRA4 < 13 || distRA5 < 13 || distRA6 < 13 || distRA8 < 20) {
          vidas += 1
          meteor2X = -50
          meteor2Y = random(80, 360)
          shield_activate = false
        }
        //colisão

      }
      //mecanica do escudo


      //colisão
      if (distRA1 < 13 || distRA2 < 13 || distRA3 < 13 || distRA7 < 20) {
        vidas--
        meteor1X = 630
        meteor1Y = random(0, 240)
      }
      if (distRA4 < 13 || distRA5 < 13 || distRA6 < 13 || distRA8 < 20) {
        vidas--
        meteor2X = -50
        meteor2Y = random(0, 240)
      }
      //colisão
      //gravidade

      if (y > 200) {
        y -= 3
      }
      if (y < 200) {
        y += 3
      }
      if (x > 300) {
        x -= 3
      }
      if (x < 300) {
        x += 3
      }

      //gravidade
      //controles

      if (keyIsDown(RIGHT_ARROW) && x < 575) {
        x += avatarSpeed
      }
      if (keyIsDown(LEFT_ARROW) && x > 25) {
        x -= avatarSpeed
      }
      if (keyIsDown(UP_ARROW) && y > 66) {
        y -= avatarSpeed
      }
      if (keyIsDown(DOWN_ARROW) && y < 364) {
        y += avatarSpeed
      }

      //controles
      //texto na tela  

      textSize(20);
      fill('black')
      rect(0, 0, 600, 30, 2)
      fill('gold');
      textAlign(LEFT)
      text("lifes: " + vidas, 20, 22);
      text("shield: " + shield, 120, 22);
      textAlign(RIGHT)
      text("score: " + pontos, 580, 22);

      //novos escudos
      if (shield_create == 250) {
        shieldX = random(50, 550)
        shieldY = random(80, 350)
      }
      if (shield_create > 250 && shield_create < 350) {
        imageMode(CENTER)
        shield_image = image(shield_load, shieldX, shieldY, 40, 40)
        distShield = dist(shieldX, shieldY, x, y)
        if (distShield < 30) {
          shield_create = 0
          shield++
        }
      }
      if (shield_create == 300) {
        shield_create = 0
      }
      //novos escudos

      for (let i = 0; i < 1; i++) {
        pontos++
        speed += 0.01
        shield_create++

      }

      if (pontos < 2001) {
        if (speed >= 25) {
          speed = 5

        }
      }
      if (pontos > 2000) {
        imageMode(CENTER)
        meteor2 = image(inimigo1, meteor2X, meteor2Y, 40, 20)
        meteor2X += speed
        if(speed == 30){
         speed = 20 
        }
      }
      if (meteor2X > 650) {
        meteor2X = -50
        meteor2Y = random(80, 360)
      }

    } else {
      background(0)
      fill('gold')
      textSize(27)
      textAlign(CENTER)
      text("GAME OVER", 300, 180)
      textSize(22)
      text("SCORE: " + pontos, 300, 210)
      textSize(14)
      text("press 'r' to restart", 300, 390)
    }
  } else {
    background(stars_load)
  }
}


function keyTyped() {
  if (play == false && key === 'p') {
    play = true
  }
  if (vidas == 0 && key === 'r') {
    vidas = 10
    speed = 5
    pontos = 0
    x = 300;
    y = 200;
    shield = 5
    shield_activate = false
    avatarSpeed = 7
  }
  if (shield > 0 && key === 's' && shield_activate == false) {
    shield--
    shield_activate = true
  }
  if(vidas > 0 && key === 'x'){
    codeL = true
  }
    if(codeL == true && key === 'l'){
    codeR = true
    }
       if(codeR == true && key === 'r'){
    code8 = true
       }
        if(code8 == true && key === '8'){
           avatarSpeed +=5
          codeL = false
          codeR = false
          code8 = false
        }
}