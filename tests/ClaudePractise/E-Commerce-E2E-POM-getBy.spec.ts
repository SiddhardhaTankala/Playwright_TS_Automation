import {test, expect} from '@playwright/test';
import {LoginPage} from "../../pages/LoginPage_getBy";
import {ProductsPage} from "../../pages/ProductsPage_getBy";

test("E-commerce E2E shopping with GetBy locators", async ({browser}) => {

    const context = await browser.newContext();
    const page= await context.newPage();

    // ---Initialize page objects---

    const loginPage = new LoginPage(page);

    const username = "sid.tankala@gmail.com"
    const password = "Siddhu123#"

    // step 1: login
    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.verifySuccessMessage();

    // step 2: add items to cart and verify
    const productsPage = new ProductsPage(page);
    const arrayITemsToBuy = ["ADIDAS ORIGINAL", "ZARA COAT 3", "IPHONE 13 PRO"];
    await productsPage.addItemsToCart(arrayITemsToBuy);
    await productsPage.clickCartButton();
    
});

