
let ID_PARENT = 'p5-canvas-container';
let ID_DATA = 'interface-data';
let ID_RATE = 'interface-rate';
let ID_RESTART = 'interface-restart';

let canvas;
let INTERFACE_DATA;
let INTERFACE_RESTART;
let INTERFACE_RATE;


function setup() {
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  canvas.parent(ID_PARENT);

  // Initialize interface stuff
  INTERFACE_DATA = document.getElementById(ID_DATA);
  INTERFACE_RESTART = document.getElementById(ID_RESTART);
  INTERFACE_RATE = document.getElementById(ID_RATE);
  //INTERFACE_RATE.onchange = update speed;

  render();
}



function windowResized() {
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
	resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
	render();
}



// A single simulation step
function tick(){

}



function draw(){
  tick();
  render();
}



function render()
{
  background(BG_COL);
}



function keyPressed(){
  if(key == ' '){
    tick();
  }
}