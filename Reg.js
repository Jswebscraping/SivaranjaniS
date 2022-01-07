const string = "https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml";
const pattern = /\d{3}/;

// search if the pattern is in string variable
let results = string.match(pattern);



console.log(results);                                                                 
 //5 

// replace the character with another character
//const string1 = 'Find me';
//string1.replace(pattern, 'found you'); // Find found you

// splitting strings into array elements
//const regex1 = /[\s,]+/;
//console.log(result2); // ["I", "am", "learning", "JavaScript", "RegEx"]

// searching the phone number pattern
//const regex2 = /(\d{3})\D(\d{3})-(\d{4})/g;
//const result3 = regex2.exec('My phone number is: 111 123-4567.');
//console.log(result3); // ["555 123-4567", "555", "123", "4567"]