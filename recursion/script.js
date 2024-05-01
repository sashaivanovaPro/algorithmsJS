const numberInput = document.getElementById("number-input");
// input element
const convertBtn = document.getElementById("convert-btn");
// button element
const result = document.getElementById("result");
// The <output> HTML element is a container element
// into which a site or app can inject the results
// of a calculation or the outcome of a user action

const animationContainer = document.getElementById("animation-container");
// div element
const animationData = [
  {
    msg: `decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.`,
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    msg: `decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.`,
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    msg: `decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.`,
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];
// inputVal will represent the value of the input each time your recursive function runs.
// marginTop will be the top margin for DOM elements you'll add to the page.
// And addElDelay will be the delay between adding DOM elements to the page.

// function wich convert
// const decimalToBinary = (input) => {
//   // input passed into function is input value
//   const inputs = [];
//   const quotients = [];
//   const remainders = [];
//   // input = 0; - deleted string to prevent infinite loop.
//   if (input === 0) {
//     result.innerText = "0";
//     return;
//   }
//   while (input > 0) {
//     const quotient = input / 2;
//     const remainder = input % 2;
//     inputs.push(input);
//     quotients.push(quotient);
//     remainders.push(remainder);
//     // remainders array is the binary representation of
//     // binary number but in reverse order.
//     input = quotient;
//   }
//   console.log("Inputs:", inputs);
//   console.log("Quotients: ", quotients);
//   console.log("Remainders: ", remainders);
//   result.innerText = remainders.reverse().join("");
//   // revert array to get bynary number and join it to string
// };

// improve the decimalToBinary function

// const decimalToBinary = (input) => {
//   let binary = "";
//   if (input === 0) {
//     binary = "0";
//     return;
//   }
//   while (input > 0) {
//     // input = 0; // to prevent infinite loop like base case in recursion - write first
//     input = Math.floor(input / 2);
//     binary = (input % 2) + binary;
//     // This is what will build the binary string from right to left.
//     // we concatenate the string
//   }
//   result.innerText = binary;
// };

// recursive version of function

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  // sample of how setTimeout works
  // setTimeout(() => {
  //   console.log("free");
  // }, 500);
  // setTimeout(() => {
  //   console.log("Code");
  // }, 1000);
  // The setTimeout function takes two arguments:
  // a callback function and a number representing the time in milliseconds
  // to wait before executing the callback function
  // setTimeout(() => {
  //   console.log("Camp");
  // }, 1500);

  result.innerText = "Call Stack Animation";
  // enter 5 in the number input and click the Convert button,
  // the animation will add paragraphs to the DOM,
  // update the text of each paragraph, and then remove the paragraphs from the DOM.

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
      <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class ="animation-frame">
      decimalToBinary(${obj.inputVal})
      </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value); // by the DRY principle
  // alert users if they don't enter a value into the number input, or the number they enter is invalid
  // parseInt() function converts a string into an integer or whole number
  // eturns either an integer or NaN
  // isNaN() return true or false

  // previous - if (!numberInput.value || isNaN(parseInt(numberInput.value)))

  if (!numberInput.value || isNaN(inputInt)) {
    alert("Please provide a decimal number");
    // alert() is a method on the window object in the browser,
    //  so you can use either window.alert() or alert().
    return;
    // prevent future code in this function from running
  }
  // decimalToBinary(parseInt(numberInput.value)); remove after create a recursive function

  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // previous result.textContent = decimalToBinary(parseInt(numberInput.value))
  result.textContent = decimalToBinary(inputInt);
  // convert string to number
  numberInput.value = "";
  // reset previous input
};

convertBtn.addEventListener("click", checkUserInput);
// when click on button Convert
//an event listener is triggered by an event, an event object is created automatically

numberInput.addEventListener("keydown", () => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
// listener of input field - when user presses a key on a keyboard
// and is a good way to add more interactivity to input elements.
// now we can use button or key Enter to get input value for conversion

// Theory

// Binary numbers are a base-2 number system.
// Unlike the base-10 or decimal number system we use every day
// that uses 10 digits (0-9) to form numbers, the binary number
// system only has two digits, 0 and 1. In computer science,
// these binary digits are called bits,
// and are the smallest unit of data computers can process.
// For computers, 0 represents false or "off", and 1 represents true or "on".
// Bits are often grouped into an octet, which is an 8-bit set known as a byte.
// A byte can represent any number between 0 and 255. Here are the placement values for each bit in a byte:
// 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
