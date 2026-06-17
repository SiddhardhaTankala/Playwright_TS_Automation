import {test, expect} from '@playwright/test';

test.describe('Login and shop', () => {

    test.beforeEach(async ({page}) =>
    {
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        console.log(await page.title());
    });


    test ("Login to shop - wrong username", async({page}) => {
        
        await expect(page).toHaveTitle("Let's Shop");

        await page.fill("input#userEmail","sidd.tankala@gmail.com");
        await page.fill("[type='password']","siddhu123#");
        await page.click("#login");

        const errorMsg = await page.locator("[role='alert']").textContent();
        console.log(errorMsg);
        await expect(errorMsg).toContain("Incorrect");
    });

    test('Login to shop - wrong password', async({page}) => {        

        await expect(page).toHaveTitle("Let's Shop");

        const userName = page.locator("input#userEmail");
        const password = page.locator("[type='password']");
        const loginBtn = page.locator("#login");

        await userName.fill("sid.tankala@gmail.com");
        await password.fill("Sidhu123#");
        await loginBtn.click();

        console.log(await page.locator("[role='alert']").textContent());
        await expect(page.locator("[role='alert']")).toContainText("Incorrect");
    });

    test('Login to shop - successful', async({page}) => {

        await expect(page).toHaveTitle("Let's Shop");

        const userName = page.locator("input#userEmail");
        const password = page.locator("[type='password']");
        const loginBtn = page.locator("#login");

        await userName.fill("sid.tankala@gmail.com");
        await password.fill("Siddhu123#");
        await loginBtn.click();
            
        console.log(await page.getByLabel("Login Successfully").textContent());;
        await expect(page.getByLabel("Login Successfully")).toContainText("Successfully")
        console.log(await page.title());
        await expect(page).toHaveTitle("Let's Shop");
        
        await page.waitForLoadState("networkidle");
        await page.locator(".card-body").first().waitFor();         //wait for this element to load completely

        console.log(await page.locator(".card-body").first().textContent());
        console.log(await page.locator(".card-body").last().textContent());
        console.log(await page.locator(".card-body").nth(0).textContent());
        console.log(await page.locator(".card-body").nth(1).textContent());
        console.log(await page.locator(".card-body").nth(2).textContent());
        
        console.log(await page.locator(".card-body").allTextContents());
    
    
    });


});

