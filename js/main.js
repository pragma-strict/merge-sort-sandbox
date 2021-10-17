// DOM Ids and elements
let ID_PARENT = 'p5-canvas-container';
let ID_DATA = 'interface-data';
let ID_RATE = 'interface-rate';
let ID_RESTART = 'interface-restart';

let INTERFACE_DATA;
let INTERFACE_RESTART;
let INTERFACE_RATE;

// 
let canvas;
let input_parsed = [];


// Style variables
let bar_padding_top = 25; // The space between the top of the tallest bar and the top of the window (px)


function setup() {
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  canvas.parent(ID_PARENT);

  // Initialize interface stuff
  INTERFACE_DATA = document.getElementById(ID_DATA);
  INTERFACE_RESTART = document.getElementById(ID_RESTART);
  INTERFACE_RESTART.addEventListener("click", parseInputData, false);
  INTERFACE_RATE = document.getElementById(ID_RATE);
  //INTERFACE_RATE.onchange = update speed;

  parseInputData();
}



function windowResized() {
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
	resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
	render();
}


function parseInputData(){
  input_parsed = [];
  let raw_data = INTERFACE_DATA.value;
  let number = 0;
  let isPrevCharNumber = false;
  for(let i = 0; i < raw_data.length; i++){
    let char = raw_data[i];
    if(!isNaN(char) && char != ' '){ // Current char is a number
      char = parseInt(char);
      if(isPrevCharNumber){
        number *= 10;
      }
      number += char;
      isPrevCharNumber = true;
    }
    else{   // Current char is NOT a number
      if(isPrevCharNumber){
        input_parsed.push(number);
        number = 0;
        isPrevCharNumber = false;
      }
    }
  }

  // If the string ended on a number, include it too.
  if(isPrevCharNumber){
    input_parsed.push(number);
  }
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
  fill(0);
  stroke(BG_COL);
  strokeWeight(2);
  let number_of_bars = input_parsed.length
  if(number_of_bars > 0){
    let bar_width = width / number_of_bars;
    let max_number = Math.max(...input_parsed);
    for(let i = 0; i < number_of_bars; i++){
      let bar_height = map(input_parsed[i], 0, max_number, 0, height - bar_padding_top);
      rect(bar_width * i, height - bar_height, bar_width, bar_height);
    }
  }
}



function keyPressed(){
  if(key == ' '){
    tick();
  }
}