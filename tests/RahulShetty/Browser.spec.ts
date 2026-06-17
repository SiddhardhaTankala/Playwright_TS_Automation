import {test, expect} from '@playwright/test';

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title and then assertion
    await page.title();   //to simply fetch the title
    console.log(await page.title());    //to print in console

    //assertion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //selectors - CSS, xPath
    // user name, password
    //to enter someting into edit box type or fill.

    // page.locator('input#username').type("learning");    //type is depricated, so use fill as valid 
    await page.locator('input#username').fill("learning");
    await page.locator("[type='password']").fill("learning");
    await page.locator("[name='signin']").click();

    //validate the error for wrong username or password
    console.log(await page.locator("[style*='block']").textContent());

    //validate the message have the word Incorect
    //assertion
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');



});


test('Browser Context Playwright test', async ({browser})=>
{
 
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    //setting constant variables for each locators for username and password and any other for multiple use
    const userName = page.locator('#username'); //
    const password = page.locator("[type='password']");
    const signIn = page.locator("[name='signin']");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title and then assertion
    await page.title();   //to simply fetch the title
    console.log(await page.title());    //to print in console

    //assertion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //selectors - CSS, xPath
    // user name, password
    //to enter someting into edit box type or fill.

    // page.locator('input#username').type("learning");    //type is depricated, so use fill as valid 
    await page.locator('input#username').fill("learning");
    await page.locator("[type='password']").fill("learning");
    await page.locator("[name='signin']").click();

    //validate the error for wrong username or password
    console.log(await page.locator("[style*='block']").textContent());

    //validate the message have the word Incorect
    //assertion
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //to clear wrong inputs and enter or fill the correct ones
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("")
    await password.fill("Learning@830$3mK2");
    await signIn.click();

    //validate to locate the object for successful login
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").last().textContent());
    //OR
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").nth(2).textContent());
    console.log(await page.locator(".card-body a").nth(3).textContent());

    console.log("another way to fetch by assigning locator to variable ");
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log("print all products under the class");
    console.log(await cardTitles.allTextContents()); //to fetch all titles in the class

    await expect(cardTitles).toContainText([ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]);
});


test('UIControls', async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("select.form-control").selectOption("Consultant"); //to select form drop down
    await page.locator(".radiotextsty").nth(1).click();  //to click on second radio button
    await page.locator("#okayBtn").click(); //to click on Okay button in pop up
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); //to verify if the last radio button is checked or not


    await page.locator("#terms").check(); //to check the checkbox
    await expect(page.locator("#terms")).toBeChecked();
    await expect(page.locator("#terms")).toBeChecked({checked: true}); //to verify if the checkbox is checked or not, it will return true or false
    //await page.locator("#terms").uncheck(); //to uncheck the checkbox
    await page.locator("#terms").isChecked(); //to verify if the checkbox is checked or not, it will return true or false
    
    
    
    //await page.pause(); //to pause the execution and see the state of the page at that moment
        

});


test.only('Checkbox for Terms with all possible methods',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");

    //to print the state of checkbox before any action
    console.log(await page.locator("#terms").isChecked());

    //verify if the checkbox is not checked before checking the terms and conditions
    await expect(page.locator("#terms")).not.toBeChecked();
    
    //check terms and conditions
    await page.locator("#terms").check();

    //verify if the checkbox is checked before submitting the form
    await expect(page.locator("#terms")).toBeChecked();

    //to uncheck terms and conditions
    await page.locator("#terms").uncheck();

    //to verify if the checkbox is unchecked
    await expect(page.locator("#terms")).not.toBeChecked();

    //to check with true or false using setChecked
    await page.locator("#terms").setChecked(true); //to check the checkbox
     //to verify if the check is checked on not explicitly using to beChecked with checked true or false
    await expect(page.locator("#terms")).toBeChecked({checked: true}); 

    await page.locator("#terms").setChecked(false); //to uncheck the checkbox
    //to verify if the check is checked on not explicitly using to beChecked with checked true or false
    await expect(page.locator("#terms")).toBeChecked({checked: false}); 
   

    await page.locator("[name='signin']").click();

    //verify if the login is successful by checking the presence of a specific element on the page after login
    await expect(page.locator(".card-body a").first()).not.toBeVisible();   

});

test ('Blink Elements', async({page}) =>{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const BlinkElement = page.locator("[href*='documents-request']");

    //to check if the element is visible on the page
    await expect(BlinkElement).toHaveAttribute("class", "blinkingText");

    await BlinkElement.click();
    
});

test('Handling Child Windows with Promise', async({browser}) =>{
    
    //BrowserContext - to handle multiple tabs or windows
    //In below scenario, we are opening a browser and click on URL which opens new tab which is page2, we copy the text and split the text to get email id and use it in the page1 to login

    const context = await browser.newContext();
    const page1 = await context.newPage();

    await page1.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page1.title());

    const BlinkElement = page1.locator("[href*='documents-request']");      //varible to store the locator for blinking element
    
    const [page2] = await Promise.all([         //to handle the child window that opens after clicking on the blinking element, we use Promise.all to wait for the new page to open and then click on the blinkning element.

        context.waitForEvent('page'),   //to wait for the new page to open
        BlinkElement.click(),       //to click on the blinking element to open the new page
    ]);

    const textCapture = await page2.locator(".red").textContent();
    console.log(textCapture);

    const arrayText = textCapture.split("@");
    const domain = arrayText[1].split(" ")[0];   //to split the text and get the domain name from the email id
    console.log(domain);

    //copy and paste in login component to login to the application
    await page1.locator("#username").fill(domain);
    
    //inputValue() to fetch the entered value in the text area
    console.log(await page1.locator("#username").inputValue());
        
});


