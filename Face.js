const puppeteer = require('puppeteer');
async function getPageData(url,page){
    try{
        await page.goto(url,{waitUntil:'networkidle2',timeout:0});q
        const title=await page.$eval(".a-size-large span",span => span.innerText);
        const rating=await page.$eval(".a-icon.a-icon-star span",span => span.innerText);
        const price=await page.$eval(".a-size-medium span",span => span.innerText);
        const mrp=await page.$eval(".a-lineitem span",span => span.innerText);
        console.log("Title:",title);
        console.log("Rating:",rating);
        console.log("Price",price);
        console.log("MRP:",mrp);
        return{
            Title:title,
            Rating:rating,
            Price:price,
            MRP:mrp
        }
      }
    catch(err){
        console.error(err);
    }
};
async function getlinks(){
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    await page.goto("https://www.amazon.in/s?k=moisturizer+for+face&ref=nb_sb_noss_1");
    const imglink=await page.$$eval('.a-size-mini a',a => a.map(a => a.href));
    await browser.close();
    return imglink;
}
async function main(){
    const allimglink=await getlinks();
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    const scrapedData=[];
    for(let link of allimglink){
        const data=await getPageData(link,page);
        scrapedData.push(data);
    }
    console.log(scrapedData);
}
main();

