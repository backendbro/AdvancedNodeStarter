const puppetter = require('puppeteer')

test('We can launch a brower', async () => {
    const browser = await puppetter.launch({
        headless:false
    })
    const page = await browser.newPage()
    await page.goto('localhost:3000')
})