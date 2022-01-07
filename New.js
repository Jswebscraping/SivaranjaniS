const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const results = ['airpods', 'tshirt', 'mobiles', 'chocolate', 'toys', 'shoe', 'speaker', 'laptop', 'sticker', 'tool']; //push csv file data into results
(async() =>{
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.flipkart.com/', {waitUntil: 'networkidle0', timeout: 0});
        //inserting keywords in search box
        for(const word of results){
            var search_txt = await page.waitForXPath('//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/div/input');
            var search_input = await search_txt.type(word);
            console.log(word);
           // console.log('typed');
            await page.waitForTimeout(0);
            //searchbox
            var searchbox = await page.waitForXPath('//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/button');
            await searchbox.click();
            //console.log('clicked');
            await search_txt.click({clickCount: 3});
            await search_txt.press('Backspace');             
            await page.waitForTimeout(0);
            const link= ['//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div/a'];
           let all_links = [];
          // let link = ['//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div/a']
        await page.waitForTimeout(6000);
        }
        
         for(let i=0; i<link.length; i++){
            results = link[i];
            console.log(link);
            await page.goto(link, {waitUntil: 'networkidle0'}); 
            //To find visible element  
            try{
                await page.waitForXPath('//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div/a');
                var ele_lis = await page.$x('//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div/a');
                 await page.evaluate(() => console.log(`details is ${'//*[@id="container"]/div/div[3]/div[1]'.href}`));
                var ele = await page.evaluate(div => div.textContent, ele_lis[0]);
                console.log(ele);
            }catch(e){
                console.log(link);
            }  
        }await browser.close(); //*[@id="container"]/div/div[3]/div/div[2]
    }catch(e){
        console.log(e);
    }
})();
//*[@id="container"]/div/div[3]/div[1]/h1
//*[@id="container"]/div/div[3]/div/div[2]/div[2]/div
//*[@id="container"]/div/div[3]/div[1]/div[2]



//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div
//*[@id="container"]/div/div[3]/div/div[2]
//*[@id="container"]/div/div[3]/div[1]/div[2]

//*[@id="container"]/div/div[3]/div/div[2]/div[2]/div/div[1]
//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]
//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]
//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div
//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]
//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div
//*[@id="container"]/div/div[3]/div[2]/div[2]/div[3]/div/div[2]/div/div/div[1]/div/div[1]/div/div
//*[@id="container"]/div/div[3]/div[1]/div[2]
//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/div/a