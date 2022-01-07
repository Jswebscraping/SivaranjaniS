const puppeteer = require('puppeteer');

async function start(){
    try{
    let launchOption = {headless: false,args: ['--start-maximized']};
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    await page.goto('https://www.bigbasket.com/',{waitUntil: 'networkidle2', timeout: 0});
    await page.type('#input','beverages');
    await page.click('.input-group-btn');
    await page.waitForXPath('//*[@id="deck"]/div[5]/div/div[2]/label/span[1]')
    await page.click('#deck > div.col-md-12.pad-0.quick-styles > div > div:nth-child(3) > label > span.cr');
    await page.waitForXPath('//*[@id="dynamicDirective"]/product-deck/section/div[2]/div[4]/div[1]/div/div/div[2]/div/div[1]/product-template/div/div[4]/div[1]');
    //await page.waitForXPath('//*span[@class="a-size-base"][1]')
    let elHandle = await page.$x('//*[@id="dynamicDirective"]/product-deck/section/div[2]/div[4]/div[1]/div/div/div[2]/div/div[1]/product-template/div/div[4]/div[1]');
    //let elHandle = await page.$x('//*span[@class="a-size-base"][1]')
    let details= await page.evaluate(el => el.innerText, elHandle[0]);
    console.log(details);
    //console.log(priceBlockBuyingPriceString);

    //await browser.close();
    }
    catch(err){
        console.error(err);
    }
}
start();
//*[@id="3d629b22-5bca-439f-bb8d-4619774ce32e"]/div[1]/div/div[3]/div/div/product-template-in-container/div[1]/div[4]/div[1]/a
//*[@id="input"]
//*[@id="navbar-main"]/div/div[3]/div/div/button/i[2]
//icon svg-header svg-search-mw svg-search-mw-dim hidden-md hidden-lg
//input-group-btn