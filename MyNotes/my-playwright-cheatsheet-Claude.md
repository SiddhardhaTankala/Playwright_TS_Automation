# My Playwright Cheat Sheet

## playwright.config.ts — Key Properties
testDir        → folder where tests are ('./tests')
baseURL        → root URL ('http://localhost:3000')
fullyParallel  → run tests simultaneously (true/false)
retries        → retry failed tests (0 locally, 2 in CI)
workers        → parallel processes (1 in CI, auto locally)
reporter       → output format ('html', 'list', 'json')
trace          → record test steps ('on-first-retry')
projects       → browsers to test (chromium, firefox, webkit)

## Test File Structure
import { test, expect } from '@playwright/test';

test('test name here', async ({ page }) => {
  // your steps here
});

## Navigation
await page.goto('/path')              → go to a page
await page.goto('https://full-url')   → full URL

## Actions
await page.click('selector')          → click element
await page.fill('selector', 'value')  → type into field
await page.press('selector', 'Enter') → press keyboard key
await page.hover('selector')          → hover over element
await page.selectOption('sel', 'val') → select dropdown

## Assertions
await expect(page).toHaveTitle('text')
await expect(page).toHaveURL('/dashboard')
await expect(locator).toBeVisible()
await expect(locator).toHaveText('text')
await expect(locator).toBeEnabled()
await expect(locator).toBeChecked()
await locator.click()                      // toggles — avoid if state unknown
await locator.check()                      // always checks ✅ recommended
await locator.uncheck()                    // always unchecks ✅ recommended
await locator.setChecked(true/false)       // set specific state — data driven

### Read state
const state = await locator.isChecked()    // returns true or false

### Assertions
await expect(locator).toBeChecked()
await expect(locator).not.toBeChecked()
await expect(locator).toBeChecked({ checked: true })
await expect(locator).toBeChecked({ checked: false })

## Radio Buttons

### Actions
await locator.click()                      // select radio
await locator.check()                      // select radio ✅ recommended

### Note
- Only ONE radio can be selected in a group
- Cannot be unchecked — only deselected by selecting another
- uncheck() on radio throws error

### Assertions — same as checkbox
await expect(locator).toBeChecked()
await expect(locator).not.toBeChecked()

## .not — Reverses Any Assertion
await expect(locator).not.toBeVisible()
await expect(locator).not.toBeChecked()
await expect(locator).not.toBeEnabled()
await expect(page).not.toHaveURL('/login')

## count() — Count Multiple Elements
const count = await locator.count()        // returns number of matching elements

## Locators (finding elements)
page.locator('#id')               → by ID
page.locator('.classname')        → by class
page.locator('button')            → by tag
page.locator('text=Click Me')     → by visible text
page.getByRole('button', { name: 'Submit' })  → by role
page.getByPlaceholder('Email')    → by placeholder
page.getByLabel('Password')       → by label

## Wait Mechanisms

### Auto Wait — Built In ✅
- Playwright automatically waits for elements before actions
- No code needed for basic click, fill, etc.

### waitForLoadState()
await page.waitForLoadState("load");             // page fully loaded
await page.waitForLoadState("domcontentloaded"); // HTML loaded
await page.waitForLoadState("networkidle");      // no network calls for 500ms

### waitFor() — on locator
await locator.waitFor();                          // visible by default
await locator.waitFor({ state: "visible" });      // wait to appear
await locator.waitFor({ state: "hidden" });       // wait to disappear
await locator.waitFor({ state: "attached" });     // wait to exist in DOM
await locator.waitFor({ state: "detached" });     // wait to be removed

### waitForURL()
await page.waitForURL("**/dashboard");            // wait for URL change

### waitForResponse()
await page.waitForResponse("**/api/products");    // wait for API call

### waitForTimeout() — avoid in real code ⚠️
await page.waitForTimeout(2000);                  // hardcoded 2 second wait

## Checkboxes

### Actions
await locator.click()                      // toggles — avoid if state unknown
await locator.check()                      // always checks ✅ recommended
await locator.uncheck()                    // always unchecks ✅ recommended
await locator.setChecked(true/false)       // set specific state — data driven

### Read state
const state = await locator.isChecked()    // returns true or false

