import {APIRequestContext, expect} from '@playwright/test';

export class ProductAPI{

    private request: APIRequestContext;
    private getProductsUrl = "https://rahulshettyacademy.com/api/ecom/product/get-all-products";

    //constructor
    constructor(request: APIRequestContext) {
        this.request = request;

    };

    //
    async getAllProducts(token: string): Promise<any[]> {
        const response = await this.request.post(this.getProductsUrl, {
            data: {},
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }

        });
        console.log("Debug Status:", response.status());
       expect(response.status()).toBe(200);
       
       const responseBody = await response.json();

       expect(responseBody.data).toBeTruthy();

        console.log("Total Products:", responseBody.data.length);

        return responseBody.data
       
    };

    async getProductIdByName(token: string, productName: string): Promise<string> {
        const products = await this.getAllProducts(token);

        const product = products.find(
            p => p.productName === productName
        );

        expect(product).toBeTruthy();

        console.log("Product Found:", product.productName, "ID:", product._id);

        return product._id;


    };

};