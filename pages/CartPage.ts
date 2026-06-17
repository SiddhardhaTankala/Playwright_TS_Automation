import {Page, expect} from '@playwright/test';

export class CartPage {
    
    // --- locators ---
    private page: Page;
    private cartButton = ".heading.cf";                     //cart page heading
    private cartSection = ".cartSection";                   //cart section which has the items added to cart
    private cartItems = ".cartSection h3";                  //items in cart page
    private checkoutButton = "button.btn.btn-primary";      //checkout button in cart page


    // ---constructor ---
    constructor(page: Page) {
        this.page = page;
        };

    // --- actions ---
    async verifyCartItems(arrayItemsToBuy: string[]) {
        //Step3: Place the order with assertions
        await expect(this.page.locator(this.cartButton).nth(0)).toContainText("My Cart");

        await this.page.locator(this.cartSection).first().waitFor();     //to wait for the cart section to be visible before fetching the items in cart page.

        const arrItemsInCart = await this.page.locator(this.cartItems).allTextContents();    //to fetch the text content of all the items in cart page and store it in an array.
        console.log(arrItemsInCart);     //to print the list of items in cart page.

         //to convert the items in cart page to uppper case to match with the array items to buy.
        const noramlizedItemsInCart = arrItemsInCart.map(item =>item.toUpperCase());

        //Assertion to verify the items in cart page with the items added to cart.
        await expect(arrayItemsToBuy).toEqual(noramlizedItemsInCart);

    };

    
    
    async checkout() {

        await this.page.locator(this.checkoutButton).filter({hasText: "checkout"}).click();     //to click on the checkout button to proceed to checkout page.")

    }

    
   

    


}   