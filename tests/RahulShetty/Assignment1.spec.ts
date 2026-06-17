import {test, expect, type Page} from '@playwright/test';

async function login(page: Page) {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("sid.tankala@gmail.com");
    await page.getByRole('textbox',{name:'password'}).fill("Siddhu123#");
    await page.getByRole('button',{name:'Sign In'}).click();

    await expect(page.getByTestId('nav-events')).toBeVisible({timeout: 10000});
};

test("Assignment 1 - event booking", async({page}) =>{
    const eventName = 'Playwright Assignement 1' + Date.now();
    console.log(eventName);

    await login(page);

    await page.getByText('Admin').click();
    await page.locator('a').filter({hasText: 'Manage Events'}).first().click();
    await expect(page.getByText('+ New Event')).toBeVisible();

    await page.locator('#event-title-input').fill(eventName);
    await page.getByPlaceholder('Describe the event…').fill('This is an event created by Playwright');
    await page.locator('#city').fill('Bangalore');
    await page.getByPlaceholder('Venue name & address').fill('Bangalore, Indiranagar');
   // await page.getByLabel('event-date-&-time').fill(futureDateandTime(5));
    await page.getByText('Price ($)*').fill('100');
    await page.locator('#total-seats').fill('100');
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();

    await page.getByTestId('nav-events').click();
    await expect(page.getByText('Upcoming Events')).toBeVisible();

    await page.getByAltText(eventName)
        .locator('span')
        .filter({hasText: '100 seats available' })
        .locator('#book-now-btn')
        .click();



});

//function futureDateandTimes(daysAhead: number): string {
//    const future = new Date();
//    future.setDate(future.getDate() + daysAhead);
//    const year = future.getFullYear();
//    const month = String(future.getMonth() + 1).padStart(2, '0');
//    const day = String(future.getDate()).padStart(2, '0');
 //   const hours = String(future.getHours()).padStart(2, '0');
 //   const minutes = String(future.getMinutes()).padStart(2, '0');
 //   return `${year}-${month}-${day}T${hours}:${minutes}`;
//}


function futureDateandTime(daysAhead: number): string{
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysAhead);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth()+1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day}, ${hours}:${minutes} ${seconds}`;
    
};
