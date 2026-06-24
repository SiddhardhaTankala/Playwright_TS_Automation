# POM Structure and components

## pages (structure)
import {Page, expect} from '@playwright/test'       

//importing the functions from playwright
//Page is Type or interface, used for TS for checking used for importing


export class <classname> {

    //export: makes the class available to be imported into your test files.

    // --- locators ---
    private page:Page;
    private username: '#userName';
    private password: 'password';
    .
    .
    .
    // private is an access modifier, restricts the use of property or method only inside this class.

    // --- constructor ---
    constructor(page:Page) {
        this.page = page;

    };

    // --- actions ---
    async LoginPage(username: string, password: string) {
        ...steps goes here..

    };



};


## test --> TS file
import { page, expect} from '@playwright/test'

import {LoginPage} from '../../pages/LoginPage'
import {ProductsPage} from '../../pages/ProductsPage'
.
.
.

test("test case name", asysnc ({browser}) => {

    const context = await browser.newContext();
    const page = context.newPage();

    //initializing page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    .
    .
    .

    const username = 'Sid.tankala@gmail.com';
    const password = 'Siddhu123#';

    await loginPage.goto();
    await loginPage.<functionname(username, password)>;


    await productsPage.<functionname(arguments)>;


});





