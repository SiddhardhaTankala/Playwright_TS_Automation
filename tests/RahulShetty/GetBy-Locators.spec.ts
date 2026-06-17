import {test, expect} from '@playwright/test';


test.describe("Special Elements with GetBy locators", () => {


    test.beforeEach(async({page}) => {

        await page.goto("https://rahulshettyacademy.com/angularpractice/");
        console.log(page.title());

        
    });

    test("GetBy Locators", async({page})=> {
        await expect(page).toHaveTitle("ProtoCommerce");

        await page.getByLabel("Check me out if you Love IceCreams!").click();
        await page.getByLabel("Employed").click();
        await page.getByLabel("Gender").selectOption("Female");
        
        await page.getByPlaceholder("Password").fill("abc123");

        await page.getByRole("button", {name: 'Submit'}).click();
        await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

        await page.getByRole("link", {name: "Shop"}).click();
        await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
        

    });


});