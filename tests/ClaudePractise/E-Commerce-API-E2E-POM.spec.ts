import {test, expect} from '@playwright/test';
import {LoginAPI} from "../../api/LoginAPI";
import {ProductAPI} from "../../api/ProductAPI";
import { OrderAPI } from '../../api/OrderAPI';
import { LoginPage } from '../../pages/LoginPage';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe("E2E Shopping Cart - API + UI", () => {

    const username = "sid.tankala@gmail.com";
    const password = "Siddhu123#";
    const productName = "ADIDAS ORIGINAL";
    const country = "India";

    let token: string;
    let productId: string;
    let orderId: string;

    test("Complete shopping flow - API setup + UI verify", async({request, page}) => {

        // ---STEP1: API LOGIN -> GET TOKEN

        const loginAPI = new LoginAPI(request);
        token = await loginAPI.login(username, password);

        // ---STEP2: API GET PRODUCT ID
        const productAPI = new ProductAPI(request);
        const productId = await productAPI.getProductIdByName(token, productName);

        // ---STEP3: API CREATE ORDER
        const orderAPI = new OrderAPI(request);
        orderId = await orderAPI.createOrder(token, productId, country);

        // ---STEP4: UI VERIFY ORDER
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(username, password);
        await loginPage.verifyLoginSuccess();
        // 1. Visit the base app first so the browser opens the domain storage context
        // await page.goto("https://rahulshettyacademy.com/client/");

        // 2. Inject all 3 values the app requires to pull your order history
        // const loginUserId = userId; 
        // const loginEmail = "sid.tankala@gmail.com";

        // 2. Preemptively load your exact matching parameters before page elements load
        // await page.addInitScript(({ apiToken, uid, email }) => {
        //     window.localStorage.setItem('token', apiToken);
        //     window.localStorage.setItem('user_id', uid);
        //     window.localStorage.setItem('userEmail', email);
        // }, { apiToken: token, uid: loginUserId, email: loginEmail });

        // NAVIGATE TO ORDERS PAGE AND VERIFY
        await page.goto("https://rahulshettyacademy.com/client/dashboard/myorders");
        const firstOrderIdCell = await page.locator("tbody tr").first();
        await expect(firstOrderIdCell).not.toBeEmpty();
        const orderIds = await page.locator("tbody tr.ng-star-inserted th")
            .allTextContents();
        console.log("Verified Order IDs currently showing in UI Table:", orderIds);

        const normalizedIds = orderIds.map(id => id.trim());
        expect(normalizedIds).toContain(orderId);
        console.log(`Order ${orderId} verified in UI`);

        // ---STEP5: API DELETE ORDER (CLEANUP)
        await orderAPI.deleteOrder(token, orderId);

        // ---STEP6: UI Logout
        const logoutPage = new LogoutPage(page);
        await logoutPage.logout();
        await logoutPage.verifyLogout();
    



    });

});