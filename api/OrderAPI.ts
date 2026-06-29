import {APIRequestContext, expect} from '@playwright/test';

export class OrderAPI {

    private request: APIRequestContext;
    private createOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/create-order";
    private deleteOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/delete-order";
    private getOrdersUrl = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer";

    //constructor
    constructor(request: APIRequestContext) {
        this.request = request;

    };

    async createOrder(token: string, ProductId: string, country: string): Promise<string> {

        const response = await this.request.post(this.createOrderUrl, {

            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            data: {
                orders: [
                    {
                        country: country,
                        productOrderedId: ProductId
                    }
                ]

            }

        });
        if (response.status() !== 201) {
            console.error("Server Response Error Details:", await response.text());
        }
        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.message).toBe("Order Placed Successfully");
        expect(responseBody.orders).toBeTruthy();

        const orderId = responseBody.orders[0];
        console.log("Orders created. ID:", orderId);

        return orderId;

    };

    async getOrders(token:string): Promise<void> {

        const response = await this.request.get(

            `${this.getOrdersUrl}/${token}`,
            {
                headers: {
                    Authorization: token
                },

            }

        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const OrderId = responseBody.data.id;
        
    };

    async deleteOrder(token: string, orderId: string): Promise<void> {
        const response = await this.request.delete(
            `${this.deleteOrderUrl}/${token}`,
            {
                headers: {
                    Authorization: token,
                }
            }

        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.message).toBe("Orders Deleted Successfully");

        console.log("Order Deleted:", orderId);

    };

};