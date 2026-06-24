What is an API? or API testing?
    - API stands for Application Programming Interface.
    - API is a messenger that carries your request to the server and brings back the response.
    - API testing means directly testing API - without going through the browser UI

Why test APIs directly?
    - Faster - no browser rendering needed
    - More stable - not affected by UI changes
    - Earlier - test before UI is built or ready
    - Deeper - test edge cases UI can't reach

What do we test in API testing?
    1. Status code      - is response 200? 201? 401?
    2. Response Body    - is data correct?
    3. Respone Time     - is it fast enough?
    4. Headers          - corrent content-type returned?, or any other headers returned correctly?
    5. Authentication   - does token work?, does wrong token fail?
    6. Error handling   - does wrong data return correct error?
    7. Schema           - is response structure correct?

What are the important parts or parameters of API, with example?
    - Every single API call has below 5 pars,
        i.      URL (Endpoint)      - WHERE to send the request
        ii.     Method              - WHAT to do? (GET/POST/PUT/DELETE)
        iii.    Headers             - EXTRA INFO about the request
        IV.     Body                - DATA sent with the request
        v.      Response            - What server sents back

    Explanation:
        1. URL -> https://rahulshettyacademy.com/api/ecom/user/login
            Endpoint (is one specific operation)
                /api/ecom/user/login            - handles login
                /api/ecom/user/register         - handles registration
                /api/ecom/user/get-all-products - gets all products
                /api/ecom/user/create-order     - creates order
        2. HTTP Methods:
            This is what action you want to perform
                GET     -   Read/Fetch data         eg.: Get list of products
                POST    -   Create new data         eg.: Create new order, login etc,.
                PUT     -   Update entire record    eg.: Update full profile
                PATCH   -   Update partial record   eg.: Update only phone number
                DELETE  -   Delete data             eg.: Delete product from cart.

        3. Headers:
            - are extra information sent with every request.
            Common Request Headers: 
                Content-Type: application/json      - I am sending JSON data
                Authorization: Bearer token123      - here is my auth token
                Accept: application/json            - I want JSON back

        4. Request Body:
            - The data you send to the server - only in POST, PUT, PATCH
            json
            //Login request body
                {
                    "userEmail": "sid.xxxxxx@gmail.com",
                    "userPassword": "xxxxxxxx"
                }
            
            //Create order request body
                {
                    "orders":   [
                        {"country": "India", "productOrderId": "w3rqwhrjkhrreqwrrewrhi4234"}
                    ]
                }
            The JSON(JavaScript Object Notation) rules:
                { }     - object
                [ ]     - array
                " "     - string values in double quotes
                :       - seperate key and value
                ,       - seperate multiple key-value pairs

        5. Response:
            - What servers sends back after processing your request
            - Every response has Status Code and Response Body
                i. Status Codes:
                        a. 2xx -> Success
                                200 OK                      -   request successful
                                201 Created                 -   new resource created successfully
                        b. 4xx -> Client Error (Our mistake)
                                400 Bad Request             -   you sent wrong data
                                401 Unauthorized            -   not logged in/invalid token
                                403 Forbidden               -   logged in but no permission
                                404 Not Found               -   endpoint doesn't exist
                        c. 5xx -> Server Error (Their mistake)
                                500 Internal Server error   -   server crashed
                                503 Service Unvailable      -   server is down  
                ii. Response Body - the actual data
                    json
                    //Login success response
                    {
                        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..",
                        "userId": "6581ca979fd99c85e8ee7f45",
                        "message": "Login Successfully"
                    }
