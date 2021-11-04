// DOM Ids and elements
let ID_PARENT = 'p5-canvas-container';
let ID_DATA = 'interface-data';
let ID_DATA_WRAPPER = 'interface-data-wrapper';
let ID_INPUT_SIZE = 'interface-input-size';
let ID_INPUT_SIZE_WRAPPER = 'interface-input-size-wrapper';
let ID_RATE = 'interface-rate';
let ID_USE_CUSTOM_DATA = 'interface-custom-data';

let INTERFACE_DATA;
let INTERFACE_INPUT_SIZE;
let INTERFACE_RATE;

let p5Display;
let displayTimeline = [];
let displayPlayhead = 0;

let isCustomDataEnabled = false;



function setup() {
  p5Display = new Display();
  p5Display.createCanvas(ID_PARENT);

  // Initialize interface stuff
  INTERFACE_DATA = document.getElementById(ID_DATA);
  INTERFACE_RATE = document.getElementById(ID_RATE);
  INTERFACE_INPUT_SIZE = document.getElementById(ID_INPUT_SIZE);

  displayTimeline.push( [p5Display.selectData, [1, false] ] )
  displayTimeline.push( [p5Display.selectData, [5, false] ] )
  displayTimeline.push( [p5Display.selectData, [6, false] ] )
  displayTimeline.push( [p5Display.selectData, [6, true] ] )
  displayTimeline.push( [p5Display.selectData, [3, false] ] )
  displayTimeline.push( [p5Display.swap, [8, 12, false] ] )
  displayTimeline.push( [p5Display.selectData, [3, true] ] )

  noLoop();
  updateFormFieldVisibility();
  getInput();
}



function windowResized() {
  p5Display.updateCanvasSize();
}



// Either generates input or calls parseInputData(). Input will be ready after calling.
function getInput(){
  p5Display.clearData();
  if(isCustomDataEnabled){
    parseInputData();
  }
  else{
    let input_size = INTERFACE_INPUT_SIZE.value;
    for(let i = 0; i < input_size; i++){
      p5Display.pushData(floor(Math.random() * input_size));
    }
  }
}



function nextState(){
  if(displayPlayhead < displayTimeline.length){
    let operation = displayTimeline[displayPlayhead][0];
    let args = displayTimeline[displayPlayhead][1]
    operation(...args)
    displayPlayhead++;
  }
}



function previousState(){
  if(displayPlayhead > 0){
    displayPlayhead--;
    let operation = displayTimeline[displayPlayhead][0];
    let args = displayTimeline[displayPlayhead][1]
    let argsRev = [...args];
    argsRev[args.length -1] = !args[args.length -1]; // Invert the truth state of last argument
    operation(...argsRev)
  }
}




// Runs merge sort and renders the result
function mergeSort(){
  input_full = mergeSortRecursive(input_full);
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
  let inputSizeDiv = document.getElementById(ID_INPUT_SIZE_WRAPPER);
  let dataInputDiv = document.getElementById(ID_DATA_WRAPPER);
  if(document.getElementById(ID_USE_CUSTOM_DATA).checked){
    inputSizeDiv.classList.add("hide");
    dataInputDiv.classList.remove("hide");
    isCustomDataEnabled = true;
  }
  else{
    inputSizeDiv.classList.remove("hide");
    dataInputDiv.classList.add("hide");
    isCustomDataEnabled = false;
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
        p5Display.pushData(number);
        number = 0;
        isPrevCharNumber = false;
      }
    }
  }
  // If the string ended on a number, include it too.
  if(isPrevCharNumber){
    p5Display.pushData(number);
  }
}