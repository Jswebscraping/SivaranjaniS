const fetch = require('node-fetch');
const fs = require('fs')
let doc= [];

for(let i=1; i<=10; i++){
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .then(json => doc.push(json));
};
fs.writeFile("details.json",JSON.stringify(doc), function(err){
    if(err) throw err;
    console.log("complete");
});