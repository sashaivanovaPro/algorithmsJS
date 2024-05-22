const sortButton = document.getElementById("sort");
const sortInputArray = (event) => {
  event.preventDefault();
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value));
  //  getElementsByClassName returns an array-like object.
  //  spread operator convert it into an array.
  // These values are strings and we convert them into numbers

  // APPLY DIFFERENT SORTION
  // const sortedValues = bubbleSort(inputValues);
  // const sortedValues = selectionSort(inputValues);
  // const sortedValues = insertionSort(inputValues);

  // SORT() -  built-in method

  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  updateUI(sortedValues);
  // updateUI(inputValues);
};
// event listener for the sortButton.
// buttons associated with a form element submit by default,
// need to prevent that behavior

const updateUI = (array = []) => {
  // set a fallback value for array to an empty array
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
};

// BUBLE SORT

// starts at the beginning of the array and 'bubbles up' unsorted values towards the end,
// iterating through the array until it is completely sorted.

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      // need to use a nested for loop.
      // This loop should iterate through every element in the array except the last one
      // console.log(array, array[j], array[j + 1]);
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
};

// SELECTION SORT

//works by finding the smallest value in the array, then swapping it with the first value in the array.
// Then, it finds the next smallest value in the array, and swaps it with the second value in the array.
// It continues iterating through the array until it is completely sorted.

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    console.log(minIndex);
    for (let j = i + 1; j < array.length; j++) {
      // This loop needs to start at the index after i and iterate through the rest of the array.
      console.log(array, array[j], array[minIndex]);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
};

// INSERTION SORT

// it works by building up a sorted array at the beginning of the list.
// It begins the sorted array with the first element.
// Then it inspects the next element and swaps it backward into the sorted array
// until it is in a sorted position, and so on.
// An insertion sort algorithm starts the sort at the beginning of the list,
//  meaning the first element is already sorted so the for loop starts at the second element in the array

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    // On each iteration of the while loop, it finds an element that is larger than a current value.
    // Need to move that element to the right to make room for your current value.
    array[j + 1] = currValue;
  }
  return array;
};

sortButton.addEventListener("click", sortInputArray);

// SORT() -  built-in method
// default behavior convert the numbers values to strings,
// and sort them alphabetically. And 10 comes before 2 alphabetically.
// The callback to .sort() should return a number. That number determines how to sort the elements a and b:

// If the number is negative, sort a before b.
// If the number is positive, sort b before a.
// If the number is zero, do not change the order of a and b.
