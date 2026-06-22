import {test, expect, request} from '@playwright/test';

const loginPayLoad = {userEmail: "sid.tankala@gmail.com", userPassword: "Siddhu123#"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let token: string;


test.beforeAll( async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: loginPayLoad
        });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    token = loginResponseJson.token;
    expect(loginResponseJson.token).toBeDefined;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

        {
            data: orderPayLoad,
            headers: 
            {
                'Authorization': token,
                'content-type': "application/json"
            }

        });
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    
    const orderID = orderResponseJson.orders[0];
    
});

// test.beforeEach(async ({page}) =>
//     {
        // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        // console.log(await page.title());
//     });

test('Login to shop - successful', async({page}) => {

        await page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, token);

        //add product to cart and validate the order using API and UI


        // await expect(page).toHaveTitle("Let's Shop");

        // const userName = page.locator("input#userEmail");
        // const password = page.locator("[type='password']");
        // const loginBtn = page.locator("#login");

        // await userName.fill("sid.tankala@gmail.com");
        // await password.fill("Siddhu123#");
        // await loginBtn.click();
            
        // console.log(await page.getByLabel("Login Successfully").textContent());;
        // await expect(page.getByLabel("Login Successfully")).toContainText("Successfully")
        // console.log(await page.title());
        // await expect(page).toHaveTitle("Let's Shop");
        
        // await page.waitForLoadState("networkidle");
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator(".card-body").first().waitFor();         //wait for this element to load completely
        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator("tbody tr").first().waitFor();     //to wait for the orders table to be visible before fetching the order ID from the orders page.

        const orderIDCount = await page.locator(".em-spacer-1 .ng-star-inserted").count();     //to fetch the order ID from the order summary page.
        const orderIDArr = [];     //to create an array to store the actual order ID.
        for (let i=0; i< orderIDCount; ++i)
        {
            const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").nth(i).textContent();
            console.log(orderID);     //to print the order ID in the console.
            if (!orderID) continue;     //to check if the order ID is null or undefined, if yes then skip to the next iteration.
            orderIDArr.push(orderID.split("|")[1].trim());     //to split the order ID and get the actual order ID and trim the whitespace.
            
        }

        console.log(orderIDArr);  
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
        
        });


