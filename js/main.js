// DOM Ids and elements
let ID_PARENT = 'p5-canvas-container';
let ID_DATA = 'interface-data';
let ID_INPUT_SIZE = 'interface-input-size';
let ID_RATE = 'interface-rate';
//let ID_RESTART = 'interface-restart';

let INTERFACE_DATA;
let INTERFACE_INPUT_SIZE;
//let INTERFACE_RESTART;
let INTERFACE_RATE;

// 
let canvas;
let input_full = [];
let isRandomDataEnabled = true;


// Style variables
let bar_padding_top = 25; // The space between the top of the tallest bar and the top of the window (px)



function setup() {
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  canvas.parent(ID_PARENT);

  // Initialize interface stuff
  INTERFACE_DATA = document.getElementById(ID_DATA);
  INTERFACE_RATE = document.getElementById(ID_RATE);
  //INTERFACE_RATE.onchange = update speed;
  INTERFACE_INPUT_SIZE = document.getElementById(ID_INPUT_SIZE);

  noLoop();
  updateFormFieldVisibility();
  getInput();
}



function windowResized() {
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
	resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
	render();
}



// Either generates input or calls parseInputData(). Input will be ready after calling.
function getInput(){
  input_full = []; // Clear previous input
  if(isRandomDataEnabled){
    let input_size = INTERFACE_INPUT_SIZE.value;
    for(let i = 0; i < input_size; i++){
      input_full.push(floor(Math.random() * input_size));
    }
  }
  else{
    parseInputData();
  }
  mergeSort();
}


// Runs merge sort and renders the result
function mergeSort(){
  input_full = mergeSortRecursive(input_full);
  render();
}


// The recursive component of the merge sort function
function mergeSortRecursive(input){
  // Base case
  if(input.length <= 1){
    return input;
  }
  
  // Split step
  let slice_index = floor(input.length/2);
  let p1 = input.slice(0, slice_index);
  p1 = mergeSortRecursive(p1);
  let p2 = input.slice(slice_index, input.length);
  p2 = mergeSortRecursive(p2);

  // Merge step
  let sorted_list = [];
  let smallerNumber = 0;
  let p1_index = 0;
  let p2_index = 0;
  while(p1_index < p1.length && p2_index < p2.length){
    if(p1[p1_index] <= p2[p2_index]){
      smallerNumber = p1[p1_index];
      p1_index++;
    }
    else{
      smallerNumber = p2[p2_index];
      p2_index++;
    }
    sorted_list.push(smallerNumber);
  }
  sorted_list = sorted_list.concat(p1.slice(p1_index, p1.length));
  sorted_list = sorted_list.concat(p2.slice(p2_index, p2.length));

  return sorted_list;
}



// Shows and hides fields in the form depending on whether input is generated or not
function updateFormFieldVisibility(){
  let inputSizeDiv = document.getElementById("interface-input-size-wrapper");
  let dataInputDiv = document.getElementById("interface-data-wrapper");
  if(document.getElementById("interface-random-data").checked){
     inputSizeDiv.classList.remove("hide");
     dataInputDiv.classList.add("hide");
     isRandomDataEnabled = true;
  }
  else{
     inputSizeDiv.classList.add("hide");
     dataInputDiv.classList.remove("hide");
     isRandomDataEnabled = false;
  }
}



// Read input data from DOM and store it into the input array
function parseInputData(){
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
        input_full.push(number);
        number = 0;
        isPrevCharNumber = false;
      }
    }
  }
  // If the string ended on a number, include it too.
  if(isPrevCharNumber){
    input_full.push(number);
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
  let number_of_bars = input_full.length
  if(number_of_bars > 0){
    if(number_of_bars > 32){
      stroke(0);
      strokeWeight(1);
    }
    let bar_width = width / number_of_bars;
    let max_number = Math.max(...input_full);
    for(let i = 0; i < number_of_bars; i++){
      let bar_height = map(input_full[i], 0, max_number, 0, height - bar_padding_top);
      rect(bar_width * i, height - bar_height, bar_width, bar_height);
    }
  }
}



function keyPressed(){
  if(key == ' '){
    tick();
  }
}