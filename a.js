let tcanvas = 500
let t = 50
let ncel = tcanvas/t

//----posición
let posx = 0
let posy = 0

let laberinto = []

function setup(){
  createCanvas(tcanvas,tcanvas)

}

function draw(){
  background(220)

  //bola
  fill(0,255,0);
  rect(posx*t,posy*t,t,t)
  noStroke()
}

function keyPressed(){
  if(keyCode==LEFT_ARROW && posx>0){
    posx -= pixelSize
  }
  if(keyCode==RIGHT_ARROW && posx<maze-1){
    posx += pixelSize
  }
  if(keyCode==DOWN_ARROW && posy<maze-1){
    posy += pixelSize
  }
  if(keyCode==UP_ARROW && posy>0){
    posy -= pixelSize
  }
}