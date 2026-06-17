import {test, expect} from '@playwright/test';

test("Calendar test", async({page}) => {

    const monthNumber = "6";
    const day = "16";
    const year = "2026";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();

    await expect(page.locator("div")
                .filter({hasText: monthNumber+'/'+day+'/'+year}).nth(4))
                .toBeVisible();

                
});