import {test, expect, BrowserContext} from '@playwright/test';
let webContext: BrowserContext;

//test('sample', async({browser})=>{
test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill("sid.tankala@gmail.com")
    await page.locator("[type='password']").fill("Siddhu123#");    
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path: 'state.json'}); //.json file will be created with all the data from the session

    webContext = await browser.newContext({storageState: 'state.json'});


});

test('1.Login to shop with api context using storage session', async() => {

    //const context = await browser.newContext();
    const page  = await webContext.newPage();

    //Step1: Login to the application (URL:https://rahulshettyacademy.com/client/#/auth/login) with credentials and assertions
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    //while verifying the page has a text, we found mulitple elements with the same test, so we use filter to get specific element with the text and then verify
   // await expect(page.locator("h1.title")
     //               .filter({hasText: "Practice Website"})
     //           ).toContainText("Practice Website for Rahul Shetty Academy Students");

    const username = "sid.tankala@gmail.com";
    const password = "Siddhu123#"

    //await page.locator("#userEmail").fill(username);
    //await page.locator("#userPassword").fill(password);
   // await page.locator("[name='login']").click();
   // await expect(page.getByText("Login Successfully")).toBeVisible();      //after login click, it's a pop-up message.
   // await expect(page.locator(".logo")).toContainText("Automation Practice");    //we see this element after login.


    //Step2: Scan and add item(s) to the cart with assertions
    const arrayItemsToBuy = ["ADIDAS ORIGINAL", "ZARA COAT 3", "IPHONE 13 PRO"];
    for(const item of arrayItemsToBuy) {
        const itemAddToCart = await page.locator(".card-body")
                    .filter({hasText: item})
                    .locator("button")
                    .filter({hasText: "Add To Cart"});

        await itemAddToCart.click();
        await expect(page.getByText("Product Added To Cart")).toBeVisible();  // wait for confirmation message after adding each item to cart.
    };

    console.log(arrayItemsToBuy);       //to print the list of run-time items found on the page.

    //to click on the cart button to view the items added to cart and then verify the items in the cart page.
    await page.locator("button.btn.btn-custom")
                .filter({hasText:'Cart'}).click();

    //fetch the number of items added to cart and verify the items in cart page    
    //const AddedItemsToCartArr = await page.locator("button[class='btn btn-custom'] label").textContent();

    //console.log(AddedItemsToCartArr);     //to print the text content of the cart button which has the number of items added to cart.

    
    //const intAddedItemsToCart = AddedItemsToCartArr.split(" ")[2].trim();    //to split the text content and get the number of items added to cart and convert it to integer.
    //console.log(intAddedItemsToCart);     //to print the number of items added to cart.
    
    //Step3: Place the order with assertions
    await expect(page.locator(".heading.cf").nth(0)).toContainText("My Cart");

    await page.locator(".cartSection").first().waitFor();     //to wait for the cart section to be visible before fetching the items in cart page.
    const arrItemsInCart = await page.locator(".cartSection h3").allTextContents();    //to fetch the text content of all the items in cart page and store it in an array.

    console.log(arrItemsInCart);     //to print the list of items in cart page.

    //to convert the items in cart page to uppper case to match with the array items to buy.
    const noramlizedItemsInCart = arrItemsInCart.map(item =>item.toUpperCase());

    //Assertion to verify the items in cart page with the items added to cart.
    await expect(arrayItemsToBuy).toEqual(noramlizedItemsInCart);


    await page.locator("button.btn.btn-primary").filter({hasText: "checkout"}).click();     //to click on the checkout button to proceed to checkout page.")

    //to fill out the required details for checkout and place the order with assertions.
    await page.locator("input[placeholder='Select Country']").pressSequentially("India");
    
    const dropdownOptions = page.locator(".ta-results");
    await dropdownOptions.waitFor();

    const dropdownOptionsCount = await dropdownOptions.locator("button").count();

    for (let i=0; i < dropdownOptionsCount; ++i)
        {
            const text = await dropdownOptions.locator("button").nth(i).textContent();
            if(text === " India")
                {
                    await dropdownOptions.locator("button").nth(i).click();
                    break;
                }
        }        
    

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);     //to verify the email id in the shipping information section.)
    
    await page.locator(".action__submit").click();     //to click on the place order button to place the order.

    await expect(page.getByText("Order Placed Successfully")).toBeVisible();     //to verify the order placed successfully by checking the confirmation message.

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");     //to verify the order summary page with the confirmation message.
    
    const orderIDCount = await page.locator(".em-spacer-1 .ng-star-inserted").count();     //to fetch the order ID from the order summary page.
    const orderIDArr = [];     //to create an array to store the actual order ID.
    for (let i=0; i< orderIDCount; ++i)
        {
            const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").nth(i).textContent();
            console.log(orderID);     //to print the order ID in the console.
            if (!orderID) continue;     //to check if the order ID is null or undefined, if yes then skip to the next iteration.
            orderIDArr.push(orderID.split("|")[1].trim());     //to split the order ID and get the actual order ID and trim the whitespace.
            
        }

        console.log(orderIDArr);     //to print the actual order ID in the console.
    //assertion to verify the order ID is generated and displayed on the your orders page.

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody tr").first().waitFor();     //to wait for the orders table to be visible before fetching the order ID from the orders page.

    await expect(page.locator("h1.ng-star-inserted")).toContainText("Your Orders");

    const orderpageOrderIDCount = await page.locator("tbody tr.ng-star-inserted th").count();     //to fetch the number of orders displayed on the orders page.)
    
        for (let j=0; j< orderIDCount; ++j)
        {
            for (let k=0; k< orderpageOrderIDCount;++k)
                {
                    const orderPageOrderID = await page.locator("tbody tr.ng-star-inserted th").nth(k).textContent();

                    if (orderIDArr[j] === orderPageOrderID?.trim())     //to compare the actual order ID with the order ID displayed on the orders page and trim the whitespace.
                    {
                        console.log("Order ID is displayed on the orders page and verified successfully.");
                        break;
                    }

                }
        }
        
        //Step4: Logout from the application with assertions
        //await page.locator(".fa.fa-sign-out").click();     //to click on the logout button to logout from the application.

        //await expect(page.locator("#userEmail")).toBeVisible();     //to verify the user is logged out successfully by checking the presence of the email input field on the login page.


});

test('2. Login to shop with api context using storage session', async() => {

    //const context = await browser.newContext();
    const page  = await webContext.newPage();

    //Step1: Login to the application (URL:https://rahulshettyacademy.com/client/#/auth/login) with credentials and assertions
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    //while verifying the page has a text, we found mulitple elements with the same test, so we use filter to get specific element with the text and then verify
   // await expect(page.locator("h1.title")
     //               .filter({hasText: "Practice Website"})
     //           ).toContainText("Practice Website for Rahul Shetty Academy Students");

    const username = "sid.tankala@gmail.com";
    const password = "Siddhu123#"

    //await page.locator("#userEmail").fill(username);
    //await page.locator("#userPassword").fill(password);
   // await page.locator("[name='login']").click();
   // await expect(page.getByText("Login Successfully")).toBeVisible();      //after login click, it's a pop-up message.
   // await expect(page.locator(".logo")).toContainText("Automation Practice");    //we see this element after login.


    //Step2: Scan and add item(s) to the cart with assertions
    const arrayItemsToBuy = ["ADIDAS ORIGINAL", "ZARA COAT 3"];
    for(const item of arrayItemsToBuy) {
        const itemAddToCart = await page.locator(".card-body")
                    .filter({hasText: item})
                    .locator("button")
                    .filter({hasText: "Add To Cart"});

        await itemAddToCart.click();
        await expect(page.getByText("Product Added To Cart")).toBeVisible();  // wait for confirmation message after adding each item to cart.
    };

    console.log(arrayItemsToBuy);       //to print the list of run-time items found on the page.

    //to click on the cart button to view the items added to cart and then verify the items in the cart page.
    await page.locator("button.btn.btn-custom")
                .filter({hasText:'Cart'}).click();

    //fetch the number of items added to cart and verify the items in cart page    
    //const AddedItemsToCartArr = await page.locator("button[class='btn btn-custom'] label").textContent();

    //console.log(AddedItemsToCartArr);     //to print the text content of the cart button which has the number of items added to cart.

    
    //const intAddedItemsToCart = AddedItemsToCartArr.split(" ")[2].trim();    //to split the text content and get the number of items added to cart and convert it to integer.
    //console.log(intAddedItemsToCart);     //to print the number of items added to cart.
    
    //Step3: Place the order with assertions
    await expect(page.locator(".heading.cf").nth(0)).toContainText("My Cart");

    await page.locator(".cartSection").first().waitFor();     //to wait for the cart section to be visible before fetching the items in cart page.
    const arrItemsInCart = await page.locator(".cartSection h3").allTextContents();    //to fetch the text content of all the items in cart page and store it in an array.

    console.log(arrItemsInCart);     //to print the list of items in cart page.

    //to convert the items in cart page to uppper case to match with the array items to buy.
    const noramlizedItemsInCart = arrItemsInCart.map(item =>item.toUpperCase());

    //Assertion to verify the items in cart page with the items added to cart.
    await expect(arrayItemsToBuy).toEqual(noramlizedItemsInCart);


    await page.locator("button.btn.btn-primary").filter({hasText: "checkout"}).click();     //to click on the checkout button to proceed to checkout page.")

    //to fill out the required details for checkout and place the order with assertions.
    await page.locator("input[placeholder='Select Country']").pressSequentially("India");
    
    const dropdownOptions = page.locator(".ta-results");
    await dropdownOptions.waitFor();

    const dropdownOptionsCount = await dropdownOptions.locator("button").count();

    for (let i=0; i < dropdownOptionsCount; ++i)
        {
            const text = await dropdownOptions.locator("button").nth(i).textContent();
            if(text === " India")
                {
                    await dropdownOptions.locator("button").nth(i).click();
                    break;
                }
        }        
    

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);     //to verify the email id in the shipping information section.)
    
    await page.locator(".action__submit").click();     //to click on the place order button to place the order.

    await expect(page.getByText("Order Placed Successfully")).toBeVisible();     //to verify the order placed successfully by checking the confirmation message.

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");     //to verify the order summary page with the confirmation message.
    
    const orderIDCount = await page.locator(".em-spacer-1 .ng-star-inserted").count();     //to fetch the order ID from the order summary page.
    const orderIDArr = [];     //to create an array to store the actual order ID.
    for (let i=0; i< orderIDCount; ++i)
        {
            const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").nth(i).textContent();
            console.log(orderID);     //to print the order ID in the console.
            if (!orderID) continue;     //to check if the order ID is null or undefined, if yes then skip to the next iteration.
            orderIDArr.push(orderID.split("|")[1].trim());     //to split the order ID and get the actual order ID and trim the whitespace.
            
        }

        console.log(orderIDArr);     //to print the actual order ID in the console.
    //assertion to verify the order ID is generated and displayed on the your orders page.

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody tr").first().waitFor();     //to wait for the orders table to be visible before fetching the order ID from the orders page.

    await expect(page.locator("h1.ng-star-inserted")).toContainText("Your Orders");

    const orderpageOrderIDCount = await page.locator("tbody tr.ng-star-inserted th").count();     //to fetch the number of orders displayed on the orders page.)
    
        for (let j=0; j< orderIDCount; ++j)
        {
            for (let k=0; k< orderpageOrderIDCount;++k)
                {
                    const orderPageOrderID = await page.locator("tbody tr.ng-star-inserted th").nth(k).textContent();

                    if (orderIDArr[j] === orderPageOrderID?.trim())     //to compare the actual order ID with the order ID displayed on the orders page and trim the whitespace.
                    {
                        console.log("Order ID is displayed on the orders page and verified successfully.");
                        break;
                    }

                }
        }
        
        //Step4: Logout from the application with assertions
        await page.locator(".fa.fa-sign-out").click();     //to click on the logout button to logout from the application.

        await expect(page.locator("#userEmail")).toBeVisible();     //to verify the user is logged out successfully by checking the presence of the email input field on the login page.


});