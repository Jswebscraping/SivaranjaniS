const puppeteer = require('puppeteer');
(async() =>{
    try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const url = ['https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g'];
        for(let i=0; i<url.length; i++){
            urls = url[i];
            console.log(urls);
            await page.goto(urls, {waitUntil: 'networkidle0', timeout: 0}); 
            if(url){
            try{
                await page.waitForXPath('(//div[@class="bv_avgRating_component_container notranslate"])', {visible: true});
                let rating_ele = await page.$x('(//div[@class="bv_avgRating_component_container notranslate"])', {visible: true});
                let rating = await page.evaluate(button => button.textContent, rating_ele[0]);
                console.log(rating);
            }catch(e){
                console.log(e);
            }
        }  
        if(url){
            const url = ['https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6',
            'https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml',
            'https://www.chemistwarehouse.co.nz/buy/87293/l-oreal-serie-expert-nutrifier-shampoo-300ml',
            'https://www.chemistwarehouse.co.nz/buy/41302/biotene-dry-mouth-relief-mouthwash-fresh-mint-470ml'];
            for(let i=0; i<url.length; i++){
            urls = url[i];
            console.log(urls);
            await page.goto(urls);
            try{
            await page.waitForXPath('(//div[@class="bv_avgRating_component_container notranslate"])', {visible: true});
            let rating_ele = await page.$x('(//div[@class="bv_avgRating_component_container notranslate"])', {visible: true});
            let rating = await page.evaluate(button => button.textContent, rating_ele[0]);
            console.log(rating);
            }
            catch(e){
                console.log('hidden')
            }
        }
    }
        }await browser.close();
    }catch(e){
        console.log(e);
    }
})();
