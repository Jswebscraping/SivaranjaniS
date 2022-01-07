
const puppeteer = require('puppeteer');
const request = require("request");
//const fetch = require('node-fetch');
const fs = require('fs');
const result = [];
request({
       
        
   url: 'https://jsonplaceholder.typicode.com/albums',
   json: true
  },(err, response, body) => {
    console.log(body);
    result.push(body);
    fs.appendFile('details.json', JSON.stringify(result), (err) =>{
      if(err){
        throw err;
      }
    })
  });
  