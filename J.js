const puppeteer = require('puppeteer');

async function start(){
    try{
    let launchOption = {headless: false,args: ['--start-maximized']};
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g',{waitUntil: 'networkidle2', timeout: 0});
    await page.waitForTimeout(0);
    await page.waitForSelector('#form');
    var elementisvisible = await (page, "https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g")
    await page.waitForXPath('(//div[@class="bv_avgRating_component_container notranslate"])', {visible: true});
    let rate = await page.$x('(//div[@class="bv_avgRating_component_container notranslate"])', {visible: true});
    let rating = await page.evaluate(button => button.textContent, rate[0]);
    console.log(elementisvisible)
    console.log(rating);

    if(rating){
      try {
      const page = await browser.newPage();
      await page.goto('https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6',{waitUntil: 'networkidle2', timeout: 0});
      await page.waitForTimeout(0);
      await page.waitForSelector('#Left-Content > div:nth-child(11) > div.productDetail > div > table > tbody > tr:nth-child(2) > td.product_details > div:nth-child(6) > div > button > div.bv_avgRating_component_container.notranslate', {hidden: true, timeout: 0});
      var myElementIsNotVisible = await (page, 'https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6');
      await page.waitForXPath('(//div[@class="bv_avgRating_component_container notranslate"])',{visibility: false});
      let rate = await page.$x('(//div[@class="bv_avgRating_component_container notranslate"])',{visibility: false});
      let hidden = await page.evaluate(button => button.visibility = 'hidden', rate[0]);
      console.log(myElementIsNotVisible);
      console.log(hidden);
    }
    
    catch (hidden) {
      console.error(hidden)
    }
      //console.log(rating);
      
    }
    if(rating){
      try {
        
      
      const page = await browser.newPage();
      await page.goto('https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml',{waitUntil: 'networkidle2', timeout: 0});
      await page.waitForTimeout(0);
      await page.waitForSelector('#Left-Content > div:nth-child(11) > div.productDetail > div > table > tbody > tr:nth-child(2) > td.product_details > div:nth-child(6) > div > button > div.bv_avgRating_component_container.notranslate', {hidden: true});
     // var myElementIsVisible = await (page, 'https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml');
      await page.waitForXPath('(//div[@class="bv_avgRating_component_container notranslate"])',{visibility: false});
      let rate = await page.$x('(//div[@class="bv_avgRating_component_container notranslate"])',{visibility: false});
      let hidden = await page.evaluate(button => button.visibility = 'hidden', rate[0]);
      console.log(myElementIsVisible);
    console.log(hidden);
  } 
  catch (hidden) {
     console.log(hidden)   
  }
  
    }
  }
    catch(err){
        console.error(err);
    }

}

start();