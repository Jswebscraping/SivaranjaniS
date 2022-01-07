const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/nutrela';
//const details = [];
fetch('https://grofers.com/v6/merchant/29815/product/1')
//https://jsonplaceholder.typicode.com/comments/1
    .then((res) =>res.json())
    .then((res) =>console.log(res))
    //console.log(details);
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db('nutrela');
        dbo.collection('nut').insertOne(res, function(err, response){
            if(err) throw err;
            console.log('Number of document inserted', response.insertedCount);
            db.close();
        });
    });
