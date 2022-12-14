const Page = require('./helpers/page')

let page; 

    beforeEach(async() => {
      jest.setTimeout(30000);
    
      page = await Page.build()
      await page.goto('http://localhost:3000')
    
    });

    afterEach(async () => {
    await page.close()
    })
    
    // top level describe statement
    describe('When logged In', async () => {
      
      beforeEach(async () => {
        await page.login()
        await page.click('a.btn-floating')
      })

      test('Check if we are in the create blog session', async () => {
        const label = await page.getContentsOf('form label')
        expect(label).toEqual('Blog Title')
      })

      // nested describe statement
      describe('And using valid inputs', async () => {
        beforeEach(async () => {
          await page.type('.title input', "My Title")
          await page.type('.content input', "My Content")
          await page.click('form button')
        })

        test('Suubmitting takes user to review screen', async () => {
          const text = await page.getContentsOf('h5')
          expect(text).toEqual('Please confirm your entries')
        })

        test('Suubmitting then saving add blogs to index page', async () => {
          await page.click('button.green')
          await page.waitFor('.card')

          const title = await page.getContentsOf('.card-title')
          const content = await page.getContentsOf('p')

          expect(title).toEqual('My Title')
          expect(content).toEqual('My Content')
        })
      })
    
      // nested describe statement 
      describe('And using invalid inputs', async () => {
        
        beforeEach(async () => {
          await page.click('form button')
        }) 

        test('the form shows an error message', async () => {
          const titleError = await page.getContentsOf('.title .red-text')
          const contentError = await page.getContentsOf('.content .red-text')
          
          expect(titleError).toEqual('You must provide a value')
          expect(contentError).toEqual('You must provide a value')
        })

      }) 
    
    
    })

    
    // Another top level describe statement 
    describe("User is not logged in", () => {
      
      const actions = [
        {
          method:"get",
          path: '/api/blogs'
        },
        {
          method:'post',
          path:'/api/blogs',
          data: {
            title:'T',
            content:'C'
          }
        }
      ]

      test('Blog related actions', async () => {
        const results = await page.execRequests(actions)
        for(let result of results){
          expect(result).toEqual({error:'You must log in!'})
        }
      })


      })

