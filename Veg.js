const puppeteer = require('puppeteer');

async function start(){
    try{
    let launchOption = {headless: false,args: ['--start-maximized']};
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    await page.goto('https://www.bigbasket.com/',{waitUntil: 'networkidle2', timeout: 0});
    
    await page.waitForXPath('//*[@id="dynamicDirective"]/product-deck/section/div[2]/div[4]/div[1]/div/div/div[2]/div/div[1]/product-template/div/div[2]/div[2]/div/div');
    
    let elHandle = await page.$x('//*[@id="dynamicDirective"]/product-deck/section/div[2]/div[4]/div[1]/div/div/div[2]/div/div[1]/product-template/div/div[2]/div[2]/div/div');
   
    let details= await page.evaluate(el => el.innerText, elHandle[0]);
    console.log(details);
    
    }
    catch(err){
        console.error(err);
    }
}
start();