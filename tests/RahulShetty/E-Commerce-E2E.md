import {test, expect} from 'playwright/test'

test.describe('E-commerce E2E shopping', () =>{





test("E-commerce E2E shopping", async({browser}) =>{
    const context = await browser.newContext();
    const page  = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    await expect(page).toHaveText("Pracice Website for Rahul Shetty Academy Students");

    const username = "sid.tankala@gmail.com";
    const password = "Siddhu123#"

    await page.locator("#userEmail").fill(username);
    await page.locator("userPassword").fill(password);
    await page.locator("[name='login']");
    await expect(page.locator(".logo")).toContainText("Automation Practice");    

    const arrayItemsToBuy = ["ADIDAS ORIGINAL", "ZARA COAT 3", "IPHONE 13 PRO"];
    for(const item of arrayItemstoBuy) {

        await page.locator(".card-body")
                    .filter({hasText: item})
                    .locator("button")
                    .filter({hasText: Add To Cart"}).click();
        
    }

    //fetch the number of items added to cart and verify the items in cart page

    intAddedItemsToCartArr = page.locator(".btn btn-custom")
                                .filter({hasText:'Cart'});

    intAddedItemsToCart = intAddedItemsToCartArr.split(" ")[1];

    await page.locator(".btn btn-custom").click();

    await expect(page.locator(".heading.cf").nth(0)).tocontainText("My Cart");


});



});

