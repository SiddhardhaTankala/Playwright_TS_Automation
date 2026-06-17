import {Page, expect} from '@playwright/test';

export class LoginPage {

    // ---locators---
    private page: Page;
    private userName = "email@example.com"
    private password = "enter your passsword"
    private loginBtn = "login"
    private successMessage = "Login Successfully";
    private pageTitle = "Practice Website for Rahul Shetty Academy Students"
    private logo = ".logo";

    // ---constructor---
    constructor(page:Page){
        this.page = page;

    };

    // ---actions---
    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    };

    async verifyPageTitle() {
         await expect(this.page.getByTitle(this.pageTitle)).toBeVisible(); 
        console.log(await this.page.title());

    };
   
   async login(userName: string, password: string) {
        await this.page.getByPlaceholder(this.userName).fill(userName);
        await this.page.getByPlaceholder(this.password).fill(password);
        await this.page.getByRole("button", {name:this.loginBtn}).click();
   };

    async verifySuccessMessage() {
        await expect(this.page.getByText(this.successMessage)).toBeVisible();
        await expect(this.page.locator(this.logo)).toContainText("Automation Practice");

    };
    


};