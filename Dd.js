const puppeteer = require('puppeteer');

async function dairy(){
    try{
    let launchOption = {headless: false,args: ['--start-maximized']};
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    await page.goto('https://www.jiomart.com/',{waitUntil: 'networkidle2', timeout: 0});
    let drop_down = await page.waitForXPath('https://www.jiomart.com/c/groceries/dairy-bakery/61');
    await drop_down.click();
    console.log('dropdown clicked');
    let drop_down_dairy = await page.waitForXPath('https://www.jiomart.com/c/groceries/dairy-bakery/dairy/62');
    await drop_down_dairy.click();
    console.log('dairy.clicked');

    await page.waitForXPath('//*[@id="vertical_banner"]/h1')
    let elHandle = await page.$x('//*[@id="vertical_banner"]/h1');
    let details= await page.evaluate(el => el.innerText, elHandle[0]);
    console.log(details);
    
    }
    catch(err){
        console.error(err);
    }
}
start();