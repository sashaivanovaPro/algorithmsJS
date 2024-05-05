const form = document.getElementById("form");
const numberInput = document.getElementById("number");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

const romanDigitsArray = [
  {
    range: "units",
    one: "I",
    five: "V",
  },
  {
    range: "tens",
    one: "X",
    five: "L",
  },
  {
    range: "hundreds",
    one: "C",
    five: "D",
  },
  {
    range: "thousands",
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
// empty array where to pass converted roman digits

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
    switch (convertNumber) {
      case "1":
        romanVersion = romanDigitsArray[arabicNumberLength - 1].one;
        break;
      case "5":
        romanVersion = romanDigitsArray[arabicNumberLength - 1].five;
        break;
      case "9":
        romanVersion =
          romanDigitsArray[arabicNumberLength - 1].one +
          romanDigitsArray[arabicNumberLength].one;
        break;
      case "2":
      case "3":
        romanVersion =
          romanDigitsArray[arabicNumberLength - 1].one.repeat(convertNumber);
        break;
      case "4":
        romanVersion =
          romanDigitsArray[arabicNumberLength - 1].one +
          romanDigitsArray[arabicNumberLength - 1].five;
        break;
      case "6":
      case "7":
      case "8":
        romanVersion =
          romanDigitsArray[arabicNumberLength - 1].five +
          romanDigitsArray[arabicNumberLength - 1].one.repeat(
            convertNumber - 5
          );
        break;
      default:
        romanVersion = "";
        break;
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
