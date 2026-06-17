# My Playwright Cheat Sheet

## playwright.config.ts — Key Properties
- testDir: where my test files are located or created

## Test File Structure
import { test, expect } from '@playwright/test';            -> importing test and expect functions to the current file, from playwright package installed

test.describe('Sample project', () =>  {                     -> 'test' is playwright test object imported from above statement, 'describe' is a block of tests inside, 'Sample project' - block name, ()

    test('Test1', async({page}) => {
        //test steps goes here
        
    });

    test('Test2', async({page}) => {
        //test steps goes here

    });

    -> test is the function imported
    -> 'Test1' is the test case name

});

## Fixtures
- Fixture = Playwright automatically creates, sets up and gives to my test
- I don't write code to open/close browser — Playwright handles it
- Every test gets its own fresh page — tests don't affect each other
- { } is destructuring — used to PICK a fixture from all available fixtures

- browser           -> entire browser instance
- page              -> one browser tab

## Navigation
await page.goto("URL");

## Actions
- await page.locator().click();                     -> to click on objects
- await page.loactor().fill("text");                -> to type or fill text into 
- await page.locator().textContent();               -> to read the content of the display elements like heading text, links, Divs, Spans, Paragraphs etc.,
- await page.locator().inputValue();                -> to read the values from 'form elements' like input field value, select option value, textarea value
- await page.title();                               -> to read the actual title of the page
- console.log(await page.title());                  -> to print the title of the page in console runtime
- await page.locator().selectOption("value");       -> to select value from dropdown
- await page.fill("selector","value");               -> other way to type or fill value into
- await page.click("#selector");                     -> other way to click on objects
- await page.locator().check();                      -> check the checkbox
- await page.locator().uncheck();                    -> unchecks the checkbox
- await page.locator().setChecked(true);             -> check the checkbox
- await page.locator().setChecked(false);            -> unchecks the checkbox
- await page.locator().allTextContents();            -> retreives all contents to an array

## Assertions
- await expect(page.locator()).toBeVisible();                         -> to check if the locator or element is visible
- await expect(page.locator()).toHaveText("expected text");           -> to verify the exact match of text is availbale
- await expect(page.locator()).toContainText();                       -> to verify some part of string in a text (partial text or substring types)
- await expect(page.locator()).toBeChecked();                         -> to verify if the radio button or checkbox is checked
- await expect(page.locator()).not.toBeChecked();                     -> to verify if the radio button or check box is unchecked
- await expect(page.locator()).setChecked(true);                      -> to verify if the radio button or checkbox is checked
- await expect(page.locator()).setChecked(false);                     -> to verify if the radio button of checkbox is unchecked
- await exepct(page.locator()).toBeChecked({checked:true});           -> to verify if the checkbox is checked explicitly  
- await exepct(page.locator()).toBeChecked({checked:false});          -> to verify if the checkbox is unchecked explicitly
- await expect(page.locator()).toHaveAttribute("attributeName", "expectedValue")    -> to verify if the specific html attribue with specific value. 

## Locators (finding elements)
- page.locator("#id");                      ->  using id of the element
- page.locator(".classname");               ->  using .classname 
- page.locator("tagname.classname");        ->  using tagname.classname, if multiple options with only .classname
- page.locator("[attribute='value']");      ->  using attribute and value
- page.locator("tag#value");                ->  using tag + ID   *** preferred more weight as it has both tag and ID, over just ID
- page.locator("#ID");                      ->  using only ID

## All 7 getBy Locators
- getByLabel('text')              → input with visible label
- getByRole('role', {name:''})    → by functional role
- getByText('text')               → by visible text content
- getByPlaceholder('hint')        → input with placeholder
- getByAltText('alt')             → image alt attribute
- getByTitle('tooltip')           → title/tooltip attribute
- getByTestId('id')               → data-testid attribute

- Priority:
    getByRole → getByLabel → getByTestId → getByPlaceholder → getByText → getByAltText → getByTitle → CSS/XPath

getByText options:
{ exact: true }   → exact full match (default)
{ exact: false }  → partial / case insensitive match

## Hooks
- eachBefore            -> This hook executes everytime before a each test with onetime hook
    test.eachBefore(async({page})=>{
        await page.goto("URL");
    });



## Wait Mechanisms

- page.waitForLoadState("networkidle");         -> to wait for the network calls are done 
- page.locator().waitFor();                     -> will wait for the object to completely load.
- page.pause();                                 -> to pause the exeution and see the state of page at that moment

## Handling Child Windows
- Problem statement: As playwright loses reference to new tab when opened by clicking on a link in 1st tab.
- Solution: Promise.all() + waitForEvent('page')
- Here we have to use 'browser' fixture, as we can control multiple tabs, where 'page' fixture allows only one tab.
- syntax:
    const [page2] = await Promise.all([
        context.waitForEvent('page'),   //waiting for new tab or page to open
        await page1.locator().click(),  //action performed on page1, which opens new page2 or tab2
    ]);

## fill() — Two Different Signatures /This applies for many other actions in TS

page.fill("selector", "value")
→ called on PAGE object
→ needs TWO arguments — WHERE and WHAT
→ selector + value

locator.fill("value")
→ called on LOCATOR object
→ needs ONE argument — WHAT only
→ value only — because WHERE is already defined in locator

Rule:
- page = entire browser tab → doesn't know which element → needs selector
- locator = specific element → already knows which element → needs value only

## String conversions/Functions
- const uppercaseArray = array.map(item => itme.uppercase());

### futureDateandTime() — Custom Date Function

    What: Returns future date-time as formatted string
    Format: "YYYY-MM-DDTHH:MM" (ISO 8601)
    Use: Fill datetime-local input fields in forms

    Key JavaScript Date methods:
    - new Date()           → current date and time
    - .getDate()           → day of month (1-31)
    - .setDate(n)          → set day of month
    - .getMonth()          → month (0-11) → always +1
    - .getFullYear()       → 4-digit year
    - .getHours()          → hour (0-23)
    - .getMinutes()        → minutes (0-59)

    - padStart(2, '0')     → ensure 2 digits → "6" becomes "06"
    - Template literal     → `${variable}` inserts variable into string
    - T in date format     → separator between date and time (ISO standard)


## Arrays
- const arrayExample = [];
    - arrayExample.push("value");                           -> to add an element to the existing array
    - arrayExample.map(item => item.toUpperCase());         -> converts the each element to uppercase. (item is not a fixed term, can use i, item, id, x, element etc.. what not, it just converts the element to used method)
            - .map(item => item.toLowerCase());
            - .map(item => item.split("|")[1].trim())       -> splits the element with '|' delimiter and also trims the spaces if any
    - arrayExample.filter(item => item === 'adidas');       -> returns new array smaller or same length by filtering with the item
    - arrayExample.find(item => item ==='adidas');          -> returns single item
    - arrayExample.includes("das");                         -> return true or false if the element exist
    - arrayExample.indexOf("IPHONE");                       -> returns index of the item in the array
    - arrayExample.forEach(item=> console.log(item))        -> loops through each item and prints each item
    - arrayExample.some(item => item==="ZARA")              -> check if atleast one item matches in the array, returns true/false
    - arrayExample.every(item => item.length > 3)           -> check if all items match, returns true/false
    - arrayExample.join("|")                                -> combines all array items into a string seperating with delimiter e.g."iphone|zara|adidas"
    - arrayExample.length                                   -> returns count of items in the array.

### Frames, dialogs, Eventlisteners
## Navigation
page.goBack()        → browser back button
page.goForward()     → browser forward button

## Visibility
toBeVisible()        → element exists AND visible
toBeHidden()         → element exists but hidden
not.toBeVisible()    → hidden OR doesn't exist

## Dialogs
page.on("dialog", dialog => dialog.accept())   → handle alert/confirm
page.on("dialog", dialog => dialog.dismiss())  → cancel
CRITICAL: register handler BEFORE clicking button ⚠️

dialog.type()        → alert / confirm / prompt
dialog.message()     → text shown in dialog
dialog.accept()      → click OK
dialog.dismiss()     → click Cancel

## Hover
await locator.hover()   → mouse over element

## page.pause()
Pauses test, opens Inspector
REMOVE before committing ⚠️

## iFrames
const frame = page.frameLocator("#id")
frame.locator()   → find element inside iframe
frame.getByRole() → all locator methods work
:visible          → CSS pseudo-class, only visible elements

iFrame vs Child Window:
iFrame      → embedded page → frameLocator()
Child window → new tab       → Promise.all + waitForEvent

## Conditions, Loops
- if (value1 === value2)
    {
        ....
    }

- for ... loop
    for (let i=0; i<5; i++ or ++i)
        {
            ...
            // i is an iterator or index
            //i=0 -> initialization or the start
            //i<0 -> the condition
            //i++ -> Final expression
        }   

- for...of loop
    e.g. const colors = ['red', 'green', 'blue'];
    for (const color or colors)
        {
            ...
        }




## Terminal commands
- npx playwright test                         -> to run all the test files in the testDir
- npx playwright test tests/example.spec.js   ->  to run specific test file under testDir 'tests'
- npx playwright show-report                  -> opens HTML report for most recenbt test run.
- npx playwright test --ui                    -> test runner to see the results with step by step executed
- npx playwright test --debug                 -> playwright inspector to debug the test step by step - a default debug tool by playwright
- npx playwright codegen <url>                -> to record and generate the test on a particualar url with code, assertions, and to convert into different scripts like java, pytest using target.