import { test, expect } from '@playwright/test';

test.describe('Page Playwright test', () => 
{
    test('Should login with credentials', async({page}) =>
    {
        const userName = page.locator('#username');
        const password = page.locator("[type='password']");
        const customRadio = page.locator(".customradio");
        const signIn = page.locator("[name='signin']"); 
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        
        await userName.fill("learning");
        await password.fill("learning");
        await signIn.click();

        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText("Incorrect");


    });

    test('Claude Practice Test login page with valid credentials', async({page}) => {
        
        await page.goto("https://practicetestautomation.com/practice-test-login/");
        console.log(await page.title());
        await page.fill("#username", "student");
        await page.fill("#password", "Password123");
        await page.click("#submit");

        await expect(page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");
        await expect(page.locator("h1")).toHaveText("Logged In Successfully");

    });

    test('Claude Practise test login page with invalid username', async({page}) => {

        await page.goto("https://practicetestautomation.com/practice-test-login/");
        console.log(await page.title());

        await page.fill("#username", "students");
        await page.fill("#password", "Password123");
        await page.click("#submit");

        await expect(page.locator("#error")).toBeVisible();
        await expect(page.locator("#error")).toHaveText("Your username is invalid!");

    });

    test('Claude Practise test login page with invalid password', async({page}) =>{

        await page.goto("https://practicetestautomation.com/practice-test-login/");
        console.log(page.title());
        await page.fill("#username","student");
        await page.fill("#password","Password1234");
        await page.click("#submit");

        await expect(page.locator("#error")).toBeVisible();
        await expect(page.locator("#error")).toHaveText("Your password is invalid!");

    });
    
});