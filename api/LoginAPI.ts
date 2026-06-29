import {APIRequestContext, expect} from '@playwright/test';

export class LoginAPI {

    //
    private request: APIRequestContext;
    private loginUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";

    //contructor
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(email: string, password: string): Promise<string>   {
        const response = await this.request.post(this.loginUrl, {

            data:   {
                userEmail: email,
                userPassword: password,
            }
        });

        //assert status code
        expect(response.status()).toBe(200);

        //parse response body
        const responseBody = await response.json();

        //assert token exist
        expect(responseBody.token).toBeTruthy();
        expect(responseBody.message).toBe("Login Successfully");

        console.log("Login Token:", responseBody.token);
        
        //return token for use in subsequest API calls
        return responseBody.token;


    };


};