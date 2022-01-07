const puppeteer = require('puppeteer');
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/Mobiles"; old one
var url = "mongodb://localhost:27017/flipcart";
(async() =>{
    try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://www.flipkart.com/', {waitUntil: 'networkidle0', timeout: 0});
        console.log('opened');
        //cut login window
        var login_window = await page.waitForXPath('(/html/body/div[2]/div/div/button)');
        await login_window.click();
        //search box
        var search_txt = await page.waitForXPath('//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/div/input');
        var search_input = await search_txt.type('sarees');
        console.log('typed');
        //click search box
        var searchbox = await page.waitForXPath('//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/button');
        await searchbox.click();
        console.log('clicked');
        //collect al href links
        const all_links = [];
        await page.waitForXPath('(//a[@class="_2UzuFa"])');
        const link_ele = await page.$x('(//a[@class="_2UzuFa"])');
        for(const link of link_ele){
            const links = await link.evaluate(a=> a.href, link_ele[0]);
            console.log(links);
            all_links.push(links);
        }       
        //collect details of the product
        const details = [];//all data stored 
        for(const j of all_links){
            await page.goto(j);
            try{
                //title
            await page.waitForXPath('(//span[@class="B_NuCI"])',{visible: true, timeout:2000});
            const title_ele = await page.$x('(//span[@class="B_NuCI"])');
            const title = await page.evaluate(span => span.textContent, title_ele[0]);
            console.log({title});
            //details.push(title);
            //price
            await page.waitForXPath('(//div[@class="_30jeq3 _16Jk6d"])', {visible:true, timeout: 2000});
            const price_ele = await page.$x('(//div[@class="_30jeq3 _16Jk6d"])');
            const price = await page.evaluate(div => div.textContent, price_ele[0]);
            console.log({price});
            //details.push(price); 
            //rating
            await page.waitForXPath('(//div[@class="_3LWZlK _3uSWvT"])', {visible:true, timeout: 2000});
            const rating_ele = await page.$x('(//div[@class="_3LWZlK _3uSWvT"])');
            const rating = await page.evaluate(div => div.textContent, rating_ele[0]);
            console.log({rating});
            details.push({title, price, rating});  

            }catch(e){
                console.log('hidden');
            }            
        }
        console.log(details);
        await browser.close();
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            //var dbo = db.db("Mobiles");
            var dbo = db.db("flipcart");
            //dbo.collection("products").insertMany(details, function(err, res){
            dbo.collection("saree").insertMany(details, function(err, res){
                if (err) throw err;
                console.log('Number of documents inserted', res.insertedCount);
                db.close();
            });
        });
    }catch(e){
        console.log(e);
    }
})();