const palindromeChecker = document.getElementById("checker_form");
const checkingWordInput = document.getElementById("text-input");
const checkingButton = document.getElementById("check-btn");
const checkingResult = document.getElementById("result");

const cleanInputString = (str) => {
  const regex = /[\W\s\_]/g;
  return str.replace(regex, "").toLowerCase();
};

const renderResult = (result, text) => {
  let isNot = !result ? "not" : "";
  checkingResult.innerHTML = `
    <p class="user-input">
    <b>${text}</b> is ${isNot} a palindrome.
    </p>`;
};

const checkingForPalindrome = (str) => {
  if (!str) {
    alert(" Please input a value");
  } else {
    const reversWord = str.split("").reverse().join("");
    const isPalindrome = reversWord === str ? true : false;
    renderResult(isPalindrome, checkingWordInput.value);
  }
};

palindromeChecker.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = cleanInputString(checkingWordInput.value);

  checkingForPalindrome(inputValue);
  checkingWordInput.value = "";
});
