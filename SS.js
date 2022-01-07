const puppeteer = require('puppeteer');
(async function getLinks (){
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.myntra.com/chennai?f=Color%3ABlue_0074D9', {waitUntil: 'networkidle0', timeout: 0});
        //collect all href links using atrributes
        // await page.waitForXPath('(//li[@class="product-base"])//a'); 
        // let link_ele = await page.$x('(//li[@class="product-base"]//a)');
        // for(const i of link_ele){
        //     let links = await i.evaluate(a=> a.href, link_ele[0]);
        //     return links;
        //     //console.log(link);
        // }       
        await page.waitForXPath('(//*[@id="desktopSearchResults"]/div[2]/section/ul//span/text()[2])');
        let price_ele = await page.$x('(//*[@id="desktopSearchResults"]/div[2]/section/ul//span/text()[2])');
        let price_list = [];
        for(const j of price_ele){
            let pricee = await j.evaluate(span => span.textContent, price_ele[0]);
            let price = parseInt(pricee);
            price_list.push(price);
            console.log(pricee);
        }
        //finding price less than 5000
        const less_than5000 = a => a.filter(e => +e === e && e < 5000);
        console.log(less_than5000(price_list));
    } catch (error) {
        console.log(error);
    }

})();
//collect all urls iterate in a loop, then collect all prices then push into array, give condition to collect the price less than 5000.
