import {Page, expect} from '@playwright/test';

export class LoginPage {

        //--- locators ---
        private page: Page;
        private userEmail = '#userEmail';
        private userPassword = '#userPassword';
        private loginButton = '[name="login"]';
        private loginSuccessMessage = 'Login Successfully';
        private logo = '.logo';
        private pageTitle = 'h1.title';
        

        //--- constructor ---
        constructor(page:Page) {
            this.page = page;
            
        };
        
        //---Actions ---
        async goto() {
            await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

        };
        async verifyPageTitle() {
            await expect(
                this.page.locator(this.pageTitle)
                    .filter({hasText: "Practice Website"})
            ).toContainText("Practice Website for Rahul Shetty Academy Students");

        };

        async login(username: string, password: string) {
            await this.page.locator(this.userEmail).fill(username);
            await this.page.locator(this.userPassword).fill(password);
            await this.page.locator(this.loginButton).click();

        };

        async verifyLoginSuccess() {
            await expect(this.page.getByText(this.loginSuccessMessage)).toBeVisible();      //after login click, it's a pop-up message.
            await expect(this.page.locator(this.logo)).toContainText("Automation Practice");    //we see this element after login.
            
        };




};