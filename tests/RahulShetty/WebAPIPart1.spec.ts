import {test, expect, request} from '@playwright/test';

const loginPayLoad = {userEmail: "sid.tankala@gmail.com", userPassword: "Siddhu123#"};
let token;

test.beforeAll( async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayLoad});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    token = loginResponseJson.token;
    expect(loginResponseJson.token).toBeDefined;
    console.log(token);


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

        console.log(await page.locator(".card-body").first().textContent());
        console.log(await page.locator(".card-body").last().textContent());
        console.log(await page.locator(".card-body").nth(0).textContent());
        console.log(await page.locator(".card-body").nth(1).textContent());
        console.log(await page.locator(".card-body").nth(2).textContent());
        
        console.log(await page.locator(".card-body").allTextContents());
    
    
    });