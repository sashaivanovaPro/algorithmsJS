const messageInput = document.getElementById("message-input");
// textarea element
const result = document.getElementById("result");
// paragraph element
const checkMessageButton = document.getElementById("check-message-btn");
// button with text "Check message"

const helpRegex = /please help|assist me/i;

const dollarRegex = /[0-9]+ (hundred|thousand|million|billion)? dollars/i;
// matches mentions of dollar amounts

const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:\s|$)/i;
// free money

const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
// stock alert

const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;
// dear friend

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];
// array with all regExp

checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
});

// const isSpam = (msg) => msg.match(helpRegex);
//.match() method, which accepts a regular expression as an argument
// and determines if the string matches that expression

//const isSpam = (msg) => helpRegex.test(msg);
// the same function using test() method
// Unlike .match(), .test() returns a boolean value indicating
// whether or not the string matches the pattern

const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
// The some() method of Array instances tests whether at least one element
// in the array passes the test implemented by the provided function.
//  It returns true if, in the array, it finds an element for which the provided function returns true;
// otherwise it returns false. It doesn't modify the array.

// RegExp THEORY

// i flag can be used to make the expression ignore case
// The alternate sequence | can be used to match either the text on the left
//  or the text on the right of the |. For example,
// the regular expression /yes|no/ will match either yes or no
// A character class is defined by square brackets, and matches any character within the brackets.
// For example, [a-z] matches any character from a to z.
//  the + quantifier can be used - this matches one or more consecutive occurrence.
// For example, the regular expression /a+/ matches one or more consecutive a characters.
// A capture group(захватывающая группа) is a way to define a part of the expression that should be captured
// and saved for later reference. For example, /h(i|ey) camper/ would match either hi camper or hey camper,
//  and would capture i or ey in a group.
// The ? quantifier matches zero or one occurrence of the preceding character or group.
// To create a non-capturing group (незахватывающая группа) in a regular expression, you can add ?: after the opening parenthesis of a group.
// For instance, (?:a|b) will match either a or b, but it will not capture the result.
// /fr[e3][e3] mon[e3]y/i; expression with character classes that match e and 3
// [o0] match o and 0 (the digit).
// \s, which will match spaces, tabs, and line breaks - at the begining and in the end
// (?:\s|^) - non-capturing group that matches \s or ^.
// To match the beginning of the text, you can use the ^ anchor. This asserts that your
// pattern match starts at the beginning of the full string.
// $ anchor match the end of the string

// [s5][t7] s and t characters to also match 5 and 7 respectively.
// [c{[(] c match c, {, [, and (.
// [i1|] i should match 1, and also match the pipe symbol |)
// [a@4] a symbol
// (?:^|\s) - the begining
// (?:$|\s) - the end - allow regex to match whole words
