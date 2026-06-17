import {Page,expect} from '@playwright/test';


export class ProductsPage{

    // ---loactors---
    private page:Page
    private itemaddtoCart = ".card-body";
    private addToCartBtn = "Add To Cart"
    private cartBtn = "button.btn.btn-custom";
    private addedtoCartConfirmation = "Product Added To Cart";

    // ---constructor---
    constructor(page:Page) {
        this.page = page;

    };

    // --actions---
    async addItemsToCart(arrItemsToBuy: string[]) {        
        for(const item of arrItemsToBuy) {            
            const itemAddToCart = await this.page.locator(this.itemaddtoCart)
                        .filter({hasText: item})
                        .locator("button")
                        .filter({ hasText: "Add To Cart" });
            
            await itemAddToCart.click();
            await expect(this.page.getByText(this.addedtoCartConfirmation)).toBeVisible();
        }; 
    };

    async clickCartButton() {
        await this.page.locator(this.cartBtn)
                        .filter({hasText: 'Cart'})
                        .click();

    };


};
