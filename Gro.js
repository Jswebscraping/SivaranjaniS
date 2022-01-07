const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/nutrela';
//var obj;
(async () => {
    const response = await fetch('https://grofers.com/v6/merchant/29815/product/3', {
        method: 'GET',
        credentials: 'true'
        });
        const product = await response.json();
        console.log(product);
        //obj = ({product})
         MongoClient.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db('nutrela');
         dbo.collection('nut').insertOne(product, function(err, res){
            if(err) throw err;
            console.log('Number of document inserted', res.insertedCount);
            db.close();
        });
        });
})();
