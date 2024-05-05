const form = document.getElementById("form");
const numberInput = document.getElementById("number");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

const romanDigitsArray = [
  {
    range: "units",
    length: 1,
    one: "I",
    five: "V",
  },
  {
    range: "tens",
    length: 2,
    one: "X",
    five: "L",
  },
  {
    range: "hundreds",
    length: 3,
    one: "C",
    five: "D",
  },
  {
    range: "thousands",
    length: 4,
    one: "M",
    five: "",
  },
];

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);
  output.innerHTML = "";
  output.classList.remove("hidden");
  if (
    !numberInput.value ||
    isNaN(inputInt) ||
    numberInput.value.includes("e") ||
    numberInput.value.includes("E")
  ) {
    output.innerHTML = `Please enter a valid number`;
  } else if (inputInt < 0) {
    output.innerHTML = `Please enter a number greater than or equal to 1`;
  } else if (inputInt > 3999) {
    output.innerHTML = `Please enter a number less than or equal to 3999`;
  } else {
    convertToRoman(inputInt);
  }
};

let romanNumber = [];
// empty array where pass converted roman digits

const convertToRoman = (number) => {
  let romanVersion = null;
  // roman analog of arabian digit
  let arabicNumberLength = number.toString().length;
  // input number length
  let numberArray = number.toString().split("");
  //array of input digits
  // console.log(arabicNumberLength, numberArray);
  if (arabicNumberLength === 0) {
    renderResult(romanNumber);
    return;
  } else {
    let convertNumber = numberArray[0];
    // console.log(convertNumber);
    if (convertNumber === "1") {
      romanVersion = romanDigitsArray[arabicNumberLength - 1].one;
      // console.log(arabicNumberLength, romanVersion);
    } else if (convertNumber === "5") {
      romanVersion = romanDigitsArray[arabicNumberLength - 1].five;
    } else if (convertNumber === "9") {
      romanVersion =
        romanDigitsArray[arabicNumberLength - 1].one +
        romanDigitsArray[arabicNumberLength].one;
    } else if (convertNumber === "2" || convertNumber === "3") {
      romanVersion =
        romanDigitsArray[arabicNumberLength - 1].one.repeat(convertNumber);
    } else if (convertNumber === "4") {
      romanVersion =
        romanDigitsArray[arabicNumberLength - 1].one +
        romanDigitsArray[arabicNumberLength - 1].five;
    } else if (
      convertNumber === "6" ||
      convertNumber === "7" ||
      convertNumber === "8"
    ) {
      romanVersion =
        romanDigitsArray[arabicNumberLength - 1].five +
        romanDigitsArray[arabicNumberLength - 1].one.repeat(convertNumber - 5);
    } else {
      romanVersion = "";
    }
    romanNumber.push(romanVersion);
    convertToRoman(number.toString().split("").slice(1).join(""));
  }
};

const renderResult = (array) => {
  output.innerHTML = array.join("");
  romanNumber = [];
};

convertBtn.addEventListener("click", checkUserInput);
// event on button click

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkUserInput();
  }
});
// event on keyboard enter click
