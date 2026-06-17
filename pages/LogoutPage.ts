import {Page, expect} from '@playwright/test'

export class LogoutPage {

    // --- locators ---
    private page: Page;
    private logoutButton = ".fa.fa-sign-out";   
    private emailInput = "#userEmail";  
    
    // ---construnctor---
    constructor(page: Page) {
        this.page = page;
    };


    // ---actions---
    async logout() {
        //Step4: Logout from the application with assertions
        await this.page.locator(this.logoutButton).click();     //to click on the logout button to logout from the application.

    }

    async verifyLogout() {
        await expect(this.page.locator(this.emailInput)).toBeVisible();     //to verify the user is logged out successfully by checking the presence of the email input field on the login page.

    }
     
        
};