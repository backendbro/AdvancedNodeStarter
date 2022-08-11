const puppeteer = require('puppeteer')
describe('Puppeteer tests', () => {
    beforeEach(() => {
      jest.setTimeout(10000);
    });

    
    test('Launch a browser instance', async () => {
        const browser = await puppeteer.launch({
            headless:false
        })
        const page = await browser.newPage()
        await page.goto('http://localhost:3000/')
        
        const text = await page.$eval('a.brand-logo', el => el.innerHTML)
        expect(text).toEqual("Blogster")
      })

  });
