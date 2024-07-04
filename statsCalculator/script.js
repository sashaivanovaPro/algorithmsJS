const calculate = () => {
  const value = document.querySelector("#numbers").value;
  // get the number entered in input
  const array = value.split(/,\s*/g);
  //split the value string by commas
  const numbers = array.map((el) => {
    Number(el);
  });
  //.map() creates a new array, instead of mutating the original array.
  const filtered = numbers.filter((el) => {
    !isNaN(el);
  });
  //The .filter() method will allow you to filter elements out of an array, creating a new array in the process.
};
