import {Page, expect} from '@playwright/test';

export class CheckoutPage {

    // --- locators ---
    private page: Page;
    private countryInput = "input[placeholder='Select Country']";     //country input field in checkout page.
    private dropdownOptions = ".ta-results" ;     //dropdown options for country selection in checkout page.
    private emialIDField = ".user__name [type='text']";     //email ID field in shipping information section of checkout page.
    private placeOrderButton = ".action__submit";     //place order button in checkout page.
    private OrderSuccessMsg = "Order Placed Successfully";   //order success message after placing the order.
    private OrderConfirmmation = ".hero-primary";    //order confirmation message in order summary page after placing the order.
    private orderIDlocator = ".em-spacer-1 .ng-star-inserted";     //order ID locator in order summary page after placing the order.
    private myOrdersButton = "button[routerlink='/dashboard/myorders']";     //my orders button to navigate to orders page.
    private ordersTable = "tbody tr";     //orders table in orders page.
    private orderPageHeading = "h1.ng-star-inserted";     //heading in orders page to verify the navigation to orders page.
    private orderPageIDs = "tbody tr.ng-star-inserted th";     //order IDs in orders page to verify the order ID generated after placing the order.

   
    // ---constructor ---
    constructor(page: Page) {
        this.page = page;
    };


    // ---actions ---

    async selectoCountry(country: string) {
        //to fill out the required details for checkout and place the order with assertions.
        await this.page.locator(this.countryInput).pressSequentially(country);
    
        const dropdownOptions = this.page.locator(this.dropdownOptions);
        await dropdownOptions.waitFor();

        const dropdownOptionsCount = await dropdownOptions.locator("button").count();

        for (let i=0; i < dropdownOptionsCount; ++i)
            {
                const text = await dropdownOptions.locator("button").nth(i).textContent();
                if(text?.trim() === country)
                    {
                        await dropdownOptions.locator("button").nth(i).click();
                        break;
                    }
            }        

    };


    async verifyShippingEmailID(email: string) {
        await expect(this.page.locator(this.emialIDField).first()).toHaveText(email);     //to verify the email id in the shipping information section.)

    };

    
    async placeOrder() {
        await this.page.locator(this.placeOrderButton).click();     //to click on the place order button to place the order.
    };

    async verifyOrderSuccess() {
        await expect(this.page.getByText(this.OrderSuccessMsg)).toBeVisible();     //to verify the order placed successfully by checking the confirmation message.

    }
    
    async verifyOrderConfirmation() {
        await expect(this.page.locator(this.OrderConfirmmation)).toHaveText(" Thankyou for the order. ");     //to verify the order summary page with the confirmation message.

    };

    async getOrderIDs(): Promise<string[]> {
        const orderIDCount = await this.page.locator(this.orderIDlocator).count();     //to fetch the order ID from the order summary page.
        const orderIDArr: string[] = [];     //to create an array to store the actual order ID.
        for (let i=0; i< orderIDCount; ++i)
            {
                const orderID = await this.page.locator(this.orderIDlocator).nth(i).textContent();
                console.log(orderID);     //to print the order ID in the console.
                if (!orderID) continue;     //to check if the order ID is null or undefined, if yes then skip to the next iteration.
                orderIDArr.push(orderID.split("|")[1].trim());     //to split the order ID and get the actual order ID and trim the whitespace.
                
            }

            console.log(orderIDArr);     //to print the actual order ID in the console.
            
            return orderIDArr;
    };

    
    async verifyOrdersInOrdersPage(orderIDArr: string[]) {
        
        const orderIDCount = await this.page.locator(this.orderIDlocator).count();     //to fetch the order ID from the order summary page.
    
        //assertion to verify the order ID is generated and displayed on the your orders page.
        await this.page.locator(this.myOrdersButton).click();
        await this.page.locator(this.ordersTable).first().waitFor();     //to wait for the orders table to be visible before fetching the order ID from the orders page.

        await expect(this.page.locator(this.orderPageHeading)).toContainText("Your Orders");
        const orderpageOrderIDCount = await this.page.locator(this.orderPageIDs).count();     //to fetch the number of orders displayed on the orders page.)
        
            for (let j=0; j< orderIDCount; ++j)
            {
                for (let k=0; k< orderpageOrderIDCount;++k)
                    {
                        const orderPageOrderID = await this.page.locator(this.orderPageIDs).nth(k).textContent();

                        if (orderIDArr[j] === orderPageOrderID?.trim())     //to compare the actual order ID with the order ID displayed on the orders page and trim the whitespace.
                        {
                            console.log("Order ID is displayed on the orders page and verified successfully.");
                            break;
                        }

                    }
            }


    };
    
   

};
