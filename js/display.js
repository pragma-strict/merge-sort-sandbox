/*
   This class will contain the p5 canvas and all methods related to things that are displayed on the canvas. The display will initially only produce bar graphs that represent numerical data sets. It will also include a set of methods that can be called externally (by the user interface or sorting algorithms) to update the properties of bars in the graph i.e. height, colour, and swaps. 

   TODO:
   - Define an array of display states or transition functions or something. Basically, define the interface that the mergesort algorithm will interact with as it executes. Will it be a list of states? Will be a list of instructions?
*/

class Display{
   constructor(){
      this.parentID;
      this.canvas;
      this.data = [];
      this.selectedIndexes = [];
      this.bar_padding_top = 25; // Space between the top of the tallest bar and the top of the window (px)
   }

   createCanvas(parentID){
      this.parentID = parentID;
      let parentStyle = window.getComputedStyle(document.getElementById(this.parentID));
      this.canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
      this.canvas.parent(this.parentID);
      this.render();
   }

   updateCanvasSize(){
      let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
      resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
      this.render();
   }


   // Maybe we should use an actual interface for these functions. Is there such a thing in javascript?
   selectData(index, reverse){
      if(index){
         if(reverse){
            p5Display.selectedIndexes = p5Display.selectedIndexes.filter(
               function(value, i, arr){
                  return value != index;
               }
            );
         }
         else{
            p5Display.selectedIndexes.push(index);
         }
         p5Display.render();
      }
   }


   // This doesn't currently update the indexes in the selectedIndexes array. 
   // This whole business of accessing this class as if from outside the class is weird. Maybe we can pass the this pointer in somehow?
   // We might want the bars to be their own objects. This could be useful so that we could store their selected state (or even just colour) but also so that we could store their height or width since I know I probably want to have the selected bars move a little bit when they're selected.
   swap(i, j, reverse){
      if(i >= 0 && i < p5Display.data.length && j >= 0 && j < p5Display.data.length){
         let temp = p5Display.data[i];
         p5Display.data[i] = p5Display.data[j];
         p5Display.data[j] = temp;
         p5Display.render();
      }
   }


   setData(data){
      this.data = data;
      this.render();
   }

   pushData(number){
      this.data.push(number);
      this.render();
   }

   clearData(){
      this.data = [];
      this.render();
   }

   render(){
      background(BG_COL);
      fill(0);
      stroke(BG_COL);
      strokeWeight(2);
      let number_of_bars = this.data.length
      if(number_of_bars > 0){
         if(number_of_bars > 32){
            stroke(0);
            strokeWeight(1);
         }
         let bar_width = width / number_of_bars;
         let max_number = Math.max(...this.data);
         for(let i = 0; i < number_of_bars; i++){
            if(this.selectedIndexes.includes(i)){
               fill(55, 183, 0);
            }
            else{
               fill(0);
            }
            let bar_height = map(this.data[i], 0, max_number, 0, height - this.bar_padding_top);
            rect(bar_width * i, height - bar_height, bar_width, bar_height);
         }
      }
   }
}