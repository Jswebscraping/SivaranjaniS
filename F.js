const puppeteer = require('puppeteer');
const csv = require('csv-parser');
//const csv = require('csv');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/foods";
const results = [];
const result_1 = [];
//const createCsvWriter = require('csv-writer').createObjectCsvWriter;

(async() =>{
    try{
        fs.createReadStream('Dry.csv')
        .pipe(csv({}))
        .on('data', (data) =>results.push(data))
        .on('end', () => {
        console.log(results);
        })
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.loblaws.ca/', {waitUntil: 'networkidle0', timeout: 0});
        // var login_window = await page.waitForXPath('(/html/body/div[2]/div/div/button)');
        // await login_window.click();
        var keywords =[];
        results.forEach(resultss =>{
            for(let key in resultss){
                keyword = `${resultss[key]}`;
                console.log(keyword);
                keywords.push(keyword);
            }
        });
        for(const word of keywords){

            const search = await page.waitForXPath('//*[@id="autocomplete-listbox-site-header-"]');
            await search.type(word);
            console.log(word);
            console.log('typed');
            //await page.waitForTimeout(3000);
            
            const s_box = await page.waitForXPath('/html/body/div[1]/div/div[2]/div[2]/div/header/form/div/button');        
            await page.waitForTimeout(5000);
            await s_box.click();   
            console.log('clicked');
            
            var link_list = [];
            await page.waitForTimeout(5000);
            await page.waitForXPath('(//a[@class="product-tile__details__info__name__link"])');
            const link = await page.$x('(//a[@class="product-tile__details__info__name__link"])');
            for(const k of link){
                const links = await k.evaluate(a => a.href, link[0]);
                link_list.push(links);
            }
            console.log(link_list);
             fs.createReadStream('DryX.csv')
            .pipe(csv({}))
            .on('data', (data) =>result_1.push(data))
            .on('end', () => {
            console.log(result_1);
            });
            var details = [];
            for(const j of link_list){
                const xpaths = [];
                result_1.forEach(results => {
                    for(let key1 in results){
                        xpath = `${results[key1]}`;
                        console.log(xpath);
                        xpaths.push(xpath);
                    }
        
                });
                await page.goto(j,{waitUntil: 'networkidle0', timeout: 0});
                for(const path of xpaths){
                    try{
                    await page.waitForXPath(path,{visible:true, timeout:2000});
                    let link_ele = await page.$x(path) 
                    let products = await page.evaluate(div => div.textContent, link_ele[0]);
                    console.log({'Product': word, products});
                    details.push({'Product': word, products});
                    }catch (err){
                        console.log(err);
                    }
                }
                xpaths.length = 0; 
            }
            console.log(details);
            link_list.length=0;
            result_1.length=0;
            MongoClient.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("foods");
                dbo.collection("loblaws").insertMany(details, function(err, res){
                    if (err) throw err;
                    console.log('Number of documents inserted', res.insertedCount);
                    db.close();
                });
            });
        }
    }catch(e){
        console.log(e);
        }
    })();