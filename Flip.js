const puppeteer = require('puppeteer');

async function start(){
    try{
    let launchOption = {headless: false,args: ['--start-maximized']};
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    await page.goto('https://www.flipkart.com',{waitUntil: 'networkidle2', timeout: 0});
      await page.type('.input_3OO5Xc');
    await page.click('.input-group-btn');
    await page.waitForXPath('//*[@id="deck"]/div[5]/div/div[2]/label/span[1]')
    await page.click('//*[@id="container"]/div/div[2]/div/div');
    await page.waitForXPath('//*[@id="container"]/div/div[3]');
    //await page.waitForXPath('//*span[@class="a-size-base"][1]')
    let elHandle = await page.$x('//*[@id="container"]/div/div[3]');
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
//https://www.flipkart.com/offers-store?otracker=nmenu_offer-zone&fm=neo%2Fmerchandising&iid=M_b93f84a1-c1bf-4e03-80dd-9ec5a120c2ff_1_372UD5BXDFYS_MC.G6ZC4RAJ9OHU&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Top%2BOffers_G6ZC4RAJ9OHU&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L0_view-all&cid=G6ZC4RAJ9OHU
//*[@id="container"]/div/div[2]/div/div/div[1]/a/div[2]