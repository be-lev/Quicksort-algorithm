
let i = 0;
const w = 10;
const states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create a random length array based on the width of the canvas
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
// create random values for the array based on the height of the canvas 
    values[i] = random(height);
//the states of every single spot is going to be negative one.
    states[i] = -1;
  }
//call quicksort on the random array we created
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
//unset pivot index when it's done
  states[index] = -1;
//Do both of these simultaneously, and wait for both of them to finish.
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  let pivotIndex = start;
  let pivotValue = arr[end];
//zero means it's a pivotIndex.
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
//right before we move the pivot index, set it back -1
      states[pivotIndex] = -1;
      pivotIndex++;
//set the new pivot index to 0
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);
//reset it to -1
  for (let i = start; i < end; i++) {
//if I is not equal to pivotIndex, don't undo the coloring
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(50);
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(255);
//Check that states of the pivot index and color it by the state
    if (states[i] === 0) {
      fill("#E0777D");
    } else if (states[i] == 1) {
      fill("#D6FFB7");
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

//the brain of the partition
async function swap(arr, a, b) {
  await sleep(10);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}


//  timeout await inner function trick
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
