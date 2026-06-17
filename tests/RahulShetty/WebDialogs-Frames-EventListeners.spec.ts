import {test, expect} from '@playwright/test';

test("Popup validation", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).not.toBeVisible();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //alerts or popups which are called java popups are handled by playwright using the below method
    await page.on("dialog", dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();
   
    await page.on("dialog", dialog =>dialog.dismiss());
    await page.locator("#confirmbtn").click();
    

    //hover mouse action and select option
    await page.locator("#mousehover").hover();
    await page.locator("a").filter({hasText: "Top"}).click();
    await page.pause();

    //handle frames within the webpage
    //a frame is a webpage within a webpage and it is used to embed another webpage within the current webpage
    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime-access']:visible").click();
    await expect(frame.locator("h1")).toHaveText("All Access Subscription");



});