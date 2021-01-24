//explanation:
//the Quicksort algorithm is on average O(n*log(n)), N log N algorithm.

// basically it's it's divide and conquer approach that requires recursion.

// we start with an array of random values

//using on recursive function called "Quicksort".
//quickSort is expecting to pass in an array, start index and end index => function quickSort(arr, start,end)
//the main thing is that start has to be before end.
//The array is going to recursively get subdivided and subdivided,
//At some point, the start and end are in the same spot => if(start >= end){return}, at this point the algorithm is done!

//The idea of the Quicksort is to do a step which is called partition(arr,start,end) and it will return the index of where the pivot ended up,
//first pick some part of the array that is called a pivot point, in quick sort algorithm it's the end index.
//Then the idea is to take everything that is less than the pivot value and put it on one side of the array,
//everything that is greater than the pivot value on the other side of the array.

//simplify version to see it, is:
//1. start with the array, we pick an arbitrary pivot point,
//2. put everything on one side or the other,
//3. figure out where that pivot ended up,
//4. Quicksort both sides,
//5. Finish, once there is only one element left witch means start and end are the same. So it'll start 1-4 again or it will return.

// little example: Start quickSort(arr,start,end)
//arr: 7,2,6,5,4. end index = 4,
//index = partition(arr,start, end)
//arr: 2,4,7,6,5
//pivot point index = 1
//Left side of pivot point arr = Recursively call quickSort(arr,start,index -1) => ([2,4,5,7,6], 2, 2) ==> start = end ===> return;
//Right side of pivot point arr = Recursively call quickSort(arr,index +1,end) => ([2,4,5,7,6] , 5 , 6);

//right side arr = 5,7,6
//Start quickSort(arr,start,end)
//arr: 5,7,6.  pivot point = end index = 6,
//index = partition(arr,start, end)
//arr = 5,6,7
//pivot point index = 1
//Left side of pivot point arr = Recursively call quickSort(arr,start,index -1) => ([5,7,6], 5, 5) ==> start = end ===> return;
//Right side of pivot point arr = Recursively call quickSort(arr,index +1,end) => ([2,4,5,7,6] , 6 , 7);

//right side arr = 6,7
//Start quickSort(arr,start,end)
//arr: 6,7.  pivot point = end index = 7,
//index = partition(arr,start, end)
//arr = 6,7
//pivot point index = 0
//Recursively call quickSort(arr,start,index -1) => ([6,7], 6, 6) ==> start = end ===> return; END

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
