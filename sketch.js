//experimenting with foreground in a market in old Havana

let fore;
let EL;
let dad;
let cartBottle;
let cartEL;
let cartDad;
let umbrella;
let base;
let colour = 100;
let alp1 = 100;
let alp2 = 0;

//glitter sky
let MIN = 0;
let drips = [];
let MAX_2 = 100;

function preload(){
  fore = loadImage('assets/ELDad_Market2_foreground.png');
  EL = loadImage('assets/ELDad_Market2_EL.png');
  cartBottle = loadImage('assets/ELDad_Market2_bottleCart.png');
  dad = loadImage('assets/ELDad_Market2_dad.png');
  cartEL = loadImage('assets/ELDad_Market2_bikecart-EL.png');
  cartDad = loadImage('assets/ELDad_Market2_bikecart-dad.png');
  umbrella = loadImage('assets/ELDad_Market2_umbrella.png')
  base = loadImage('assets/ELDad_Market2_base.png');
}

function setup() {
  createCanvas(base.width/2, base.height/2);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(8);
  for (var j = 0; j < 500; j++) {
		drips[j] = new Drip(random(width), random(height), random(200), random(90), random(360));
}
  rectMode(CENTER);
}

function draw() {
  background(0);
  //base layer
  push();
  tint(255, random(50, 100));
  image(base, 0, 0, width, height);
  pop();

  //umbrella
  push();
  tint(colour, random(100), random(100));
  image(umbrella, 0, 0, width, height);
  pop();

  //Dad bike cart
  blend(cartDad, 0, 0, cartDad.width, cartDad.height, 0, 0, width, height, SCREEN);

  //EL Bike cart
  blend(cartEL, 0, 0, cartEL.width, cartEL.height, 0, 0, width, height, DARKEST);

  //dad
  push();
  if (frameCount%int(random(20))==0){
    tint(random(255), random(50, 100));
    colour = random(360);
  }
  dad.filter(GRAY);
  image(dad, 0, 0, width, height);
  pop();

  //bottle cart
  blend(cartBottle, 0, 0, cartBottle.width, cartBottle.height, 0, 0, width, height, EXCLUSION);

  //universal flicker
  noStroke();
  fill(0, random(50));
  rect(width/2, height/2, width, height);

   //floating pixels
   for (let i = 0; i < drips.length; i++) {
    drips[i].move();
    drips[i].edges();
		drips[i].show();
  }

  //EL 
  push();
  if (frameCount%int(random(20))==0){
    tint(random(255), random(50, 100));
    translate(random(-5, 5), 0);
  }
  EL.filter(GRAY);
  
  image(EL, 0, 0, width, height);
  pop();

  //foreground
  push();
  //fore.filter(INVERT);
  tint(255, alp1);
  image(fore, 0, 0, width, height);
  pop();

  //flicker
  if (frameCount%int(random(20))==0){
    EL.filter(INVERT);
    //colour = random(360);
    if (alp1 >= 100){
    alp1 = 0;
    alp2 = 100;

    } else{
      alp1 = 100;
      alp2 = 0;
    }
  }
}

class Drip {
  constructor(x, y, r, sat, h){
    this.x = x;
    this.y = y;
    this.r = r;
    this.sat = sat;
    this.h = h;
    this.k = 0.5;
  }

  move() {
		this.x = this.x + random(10);
		this.y = this.y + random(10);
	}

  edges(){
    if (this.x < 0){
      this.x = width;
    } else if (this.x > width){
      this.x = 0;
    }

    if (this.y < 0){
      this.y = height;
    } else if (this.y > height){
      this.y = 0;
      
    }

  }

	show() {
		//noStroke();
    stroke(colour, random(100), 100, alp2);
    //fill(this.h, random(100), random(100), random(100));
    //fill(random(255), alp1);
    //fill(colour, random(100), random(100), random(alp2));
    noFill();
    // fill(this.h, this.sat, 70, random(100));
    // fill(255, 50);
		rect(this.x, this.y, random(this.r));
    this.sat+=this.k;

    if (this.sat <= MIN || this.sat >= MAX_2){
      this.k *= -1;
    }
	}
}
