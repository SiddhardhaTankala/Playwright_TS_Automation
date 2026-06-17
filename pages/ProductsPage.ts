import {Page, expect} from '@playwright/test';

export class ProductsPage {

    //--- locators ---
    private page: Page;
    private cartButton = "button.btn.btn-custom";
    private addToCartConfirmation = "Product Added To Cart";
    private itemaddToCart = ".card-body";



    //--- constructor ---
    constructor(page: Page) {
        this.page = page;
        
    };

    // --- Actions ---
    async addItemsToCart(arrayItemsToBuy: string[]) {
        for(const item of arrayItemsToBuy) {
            const itemAddToCart = await this.page.locator(this.itemaddToCart)
                    .filter({hasText: item})
                    .locator("button")
                    .filter({hasText: "Add To Cart"});

            await itemAddToCart.click();
            await expect(this.page.getByText(this.addToCartConfirmation)).toBeVisible();  // wait for confirmation message after adding each item to cart.
        };
    };

    //to click on the cart button to view the items added to cart and then verify the items in the cart page.
    async clickCartButton() {
        await this.page.locator(this.cartButton)
                .filter({hasText:'Cart'})
                .click();

    };
    

}