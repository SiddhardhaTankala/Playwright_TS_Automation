import {test, expect} from '@playwright/test';
import {LoginPage} from "../../pages/LoginPage";
import {ProductsPage} from "../../pages/ProductsPage";
import {CartPage} from "../../pages/CartPage";
import {CheckoutPage} from "../../pages/CheckoutPage";
import {LogoutPage} from '../../pages/LogoutPage';


test ("E-commerce E2E shopping", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //---- Intialize Page Objects ----
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckoutPage(page);
    const logoutPage = new LogoutPage(page);


    const username = "sid.tankala@gmail.com";
    const password = "Siddhu123#"
    const arrayItemsToBuy = ["ADIDAS ORIGINAL", "ZARA COAT 3", "IPHONE 13 PRO"];

    // --- step 1: Login ---
    await loginPage.goto();
    await loginPage.verifyPageTitle();
    await loginPage.login(username, password);
    await loginPage.verifyLoginSuccess();
    
    // --- step 2: Add to Cart ---
    await productsPage.addItemsToCart(arrayItemsToBuy);
    await productsPage.clickCartButton();

    // --- step 3: Verify Cart ---
    await cartPage.verifyCartItems(arrayItemsToBuy);
    await cartPage.checkout();

    // --- step 4: Checkout ---
    await checkOutPage.selectoCountry("India");
    await checkOutPage.verifyShippingEmailID(username);
    await checkOutPage.placeOrder();
    await checkOutPage.verifyOrderSuccess();
    await checkOutPage.verifyOrderConfirmation();

    // --- step 5: Verify Orders ---
    const orderIDs = await checkOutPage.getOrderIDs();
    await checkOutPage.verifyOrdersInOrdersPage(orderIDs);

    // --- step 6: Logout ---
    await logoutPage.logout();
    await logoutPage.verifyLogout();


});
