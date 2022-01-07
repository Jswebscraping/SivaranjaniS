const puppeteer = require('puppeteer');

async function start(){
    try{
    let launchOption = {headless: false,args: ['--start-maximized']};
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    //await page.goto('https://www.myntra.com/chennai',{waitUntil: 'networkidle2', timeout: 0});
   await page.goto('https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml'{waitUntil: 'networkidle2', timeout: 0});
   
    //await page.waitForXPath('//*[@id="mountRoot"]/div/div[1]/main/div[3]/div[1]/section/div/div[2]/ul/li[2]/label');
   // await page.waitForXPath('//*[@id="desktopSearchResults"]/div[1]/section/div[1]/div[2]/ul/li[3]/label');
   // await page.waitForXPath('//*[@id="mountRoot"]/div/div[1]/main/div[3]/div[1]/section/div/div[3]/ul/li[1]/label');
   // await page.waitForXPath('//*[@id="desktopSearchResults"]/div[2]')
   // let elHandle = await page.$x('//*[@id="desktopSearchResults"]/div[2]');
   await page.waitForXPath('//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[1]')
    // let elHandle = await page.$x('//*[@id="desktopSearchResults"]/div[2]');
     let elHandle = await page.$x('//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[1]');
    let details= await page.evaluate(el//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[1] => el.innerText, elHandle[0]);
    console.log(details);
    
    }
    catch(err){
        console.error(err);
    }
}
start();
