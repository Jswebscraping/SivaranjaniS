
const puppeteer = require('puppeteer');
(async function dairy(){
    try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://www.jiomart.com/', {waitUntil:'networkidle0', timeout: 0});
        //click drop down for dairy
        let drop_down = await page.waitForXPath('(//*[@id="nav_link_61"])');
        await drop_down.click();
        console.log('dropdown clicked');
        let drop_down_dairy = await page.waitForXPath('(//*[@id="maincontent"]/div[2]/div[1]/div[1]/ul/li[2]/ul/li[1]/a)');
        await drop_down_dairy.click();
        console.log('dairy clicked');
        //collect all links of popularity button
        let pop_link_list = [];//store popularity links list
        //collect all buttons xpath high
        
        let buttons = ['//*[@id="sort_container"]/button[1]',
        '//*[@id="sort_container"]/button[2]',
        '//*[@id="sort_container"]/button[3]',
        '//*[@id="sort_container"]/button[4]']
        await page.waitForTimeout(6000);
        for(const button of buttons){
            let button_click = await page.waitForXPath(button);
            await button_click.click();
            console.log('button clicked');
            await page.waitForTimeout(6000);
            //collect all href link
            await page.waitForXPath('(//a[@class="category_name prod-name"])');  ////*[@id="product_wrapper"]/div[1]/div[2]
            let pop_link_ele = await page.$x('(//a[@class="category_name prod-name"])');
            await page.waitForTimeout(6000);
            for(const i of pop_link_ele){
                let pop_link = await i.evaluate(a=> a.href, pop_link_ele[0]);
                pop_link_list.push(pop_link);
                //console.log({pop_link});
            }
            console.log(pop_link_list);
            ////////////////////////collect all details of products buttonwise//////////////////////////
            let popularity_detail = []; 
            for(const j of pop_link_list){
                //go into url one by one
                await page.goto(j);
                //get title name
                await page.waitForXPath('(//*[@id="center_col"]/div[1]/h1)');
                let title_ele = await page.$x('(//*[@id="center_col"]/div[1]/h1)');
                let title = await page.evaluate(h1 => h1.textContent, title_ele[0]);
                popularity_detail.push(title);
                //get brand name
                await page.waitForXPath('(//*[@id="center_col"]/a/div)');
                let brand_ele = await page.$x('(//*[@id="center_col"]/a/div)');
                let brand = await page.evaluate(div => div.textContent, brand_ele[0]);
                popularity_detail.push(brand);
                //get price 
                await page.waitForXPath('(//*[@id="alg_price"]/span[1]/span)');
                let price_ele = await page.$x('(//*[@id="alg_price"]/span[1]/span)');
                let price = await page.evaluate(span => span.textContent, price_ele[0]);
                popularity_detail.push(price);
                //get availability (stoock)
                await page.waitForXPath('(//*[@id="is_in_stock"]/div)'); 
                let stock_ele = await page.$x('(//*[@id="is_in_stock"]/div)');
                let stock = await page.evaluate(div => div.textContent, stock_ele[0]);
                popularity_detail.push(stock);
                console.log({ title, brand, price, stock});
            }
            console.log(popularity_detail);
            pop_link_list.length = 0;
            console.log(pop_link_list);
             //click drop down for dairy
             let drop_down = await page.waitForXPath('(//*[@id="nav_link_61"])');
             await drop_down.click();
             console.log('dropdown clicked');
             let drop_down_dairy = await page.waitForXPath('(//*[@id="maincontent"]/div[2]/div[1]/div[1]/ul/li[2]/ul/li[1]/a)');
             await drop_down_dairy.click();
             console.log('dairy clicked');
            }
        

        
       
    }catch(e){
        console.log(e);
    }
})();