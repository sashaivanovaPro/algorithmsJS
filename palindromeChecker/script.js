const palindromeChecker = document.getElementById("checker_form");
const checkingWordInput = document.getElementById("text-input");
const checkingButton = document.getElementById("check-btn");
const checkingResult = document.getElementById("result");

// create a variables for elements of form, input, button, resulting div

const cleanInputString = (str) => {
  const regex = /[\W\s\_]/g;
  return str.replace(regex, "").toLowerCase();
};

// create a function cleanInputString using regular expression
//  to replace \W - all symbols
//             \s - backspaces
//             \_ - underlining
//  with empty string
// as a result - remove all non alphanumericc characters from input string

// Create array to test results of regExp checking
// const testArray = [
//   "_eye",
//   "race car",
//   "not a palindrome",
//   "A man, a plan, a canal. Panama",
//   "never odd or even",
//   "nope",
//   "almostomla",
//   "My age is 0, 0 si ega ym.",
//   "1 eye for of 1 eye.",
//   "0_0 (: /- :) 0-0",
//   "five|_/|four",
// ];

// testArray.forEach((item) => console.log(cleanInputString(item)));

const renderResult = (result, text) => {
  let isNot = !result ? "not" : "";
  // ternary operator create a new value and assign to it a result of condition
  // if the text is not palindrom it assign string 'not'
  //  otherwise - empty string
  checkingResult.innerHTML = `
  <p class="user-input">
    <b>${text}</b> is ${isNot} a palindrome.
    </p>`;
  // innerHTML method add a block of code with tags,
  // this time it create a paragraph with tag<b></b> to bold the initialy phrase
  // taken from input after submit event
  // not as textContent method
  // properly to use with ` `
};

// function renderResult takes to values
// 1 - string after using cleanInputString function result
// 2 - initialy passed text from input

const checkingForPalindrome = (str) => {
  if (!str) {
    alert(" Please input a value");
    // the case when input is empty
  } else {
    const reversWord = str.split("").reverse().join("");
    // console.log(reversWord);
    const isPalindrome = reversWord === str ? true : false;
    // console.log(checkingWordInput.value);
    renderResult(isPalindrome, checkingWordInput.value);
  }
  // otherwise this function makes reverse of resulting string(after cleanInputString)
  // than we use ternary operator
  // to assign to a new variable the result of comparing of input string without symbols
  // with it reverse vertion
  // so we have answer on question is a string is a Palindrome as boolean - true or false
};

// checkingForPalindrome function checks an imput string
// and gives us an answer is it a Palindrome?

palindromeChecker.addEventListener("submit", (event) => {
  event.preventDefault();
  // prevent page reloading after submit
  const inputValue = cleanInputString(checkingWordInput.value);
  // assign to a variable the result of cleanInputString function
  // where we pass an input value
  checkingForPalindrome(inputValue);
  // we check previous variable is it a Palindrome
  checkingWordInput.value = "";
  // clear an input field
});

// add event Listener on form by clicking button with type submit( marked in HTML attribute type = "submit")
// it makes work our code
