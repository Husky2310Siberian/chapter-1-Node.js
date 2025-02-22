const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index')
const helpers = require('../services/user.service')

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to MONGODB for Jest established")},
        err => {console.log('Failed to connect to MONGODB' , err)}
    )
});

afterEach(async () => {
    await mongoose.connection.close()
})

describe("TESTS for /api/user-product/users/products requests" , () => {
    it("GET for /api/user-product/users/products" , async () => {
        const res = await request(app)
            .get('/api/user-product/users/products');

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});

describe("TESTS for /api/user-product/{username}/products requests", () => {
        it("GET for /api/user-product/{username}/products" , async() => {
            const res = await request(app)
            .get('/api/user-product/user3/products')

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBeTruthy();
            expect(res.body.data.username).toBe('user3')
            expect(res.body.data.products.length).toBeGreaterThan(0)
        })
        it("POST for /api/user-product/{username}/products" , async() => {
            const result = await helpers.findLastInsertedUser();
            const username = result.username;
            console.log(username);
            const res = await request(app)
                .post('/api/user-product/' +username + '/products')
                .send({
                    username: username,
                    products: [{
                        product: "new product",
                        quantity: 20,
                        cost: 10
                    }]
                })
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeTruthy();
        })
    });

    describe("TEST for /api/user-product/{username}/products/{id}", () => {
        it("PATCH for /api/user-product/{username}/products/{id}" , async() => {
            let result = await helpers.findLastInsertedUser();
            const username = result.username;
            // const result = await helpers.findUsersProduct('user3',"678fb95f2c41a4a750fcf3f6")

            const product = await helpers.findUsersProduct(username);

            // username = result.username;
            id = product.products[0]._id;
            console.log(username , id)

            const res = await request(app)
            .patch('/api/user-product/'+ username + '/products/' + id)
            .send({
                username: result.username,
                product: {
                    quantity : 80
                }
            })  
            result = await helpers.findLastInsertedUser();
            //console.log(result);      
            expect(res.statusCode).toBe(200);
            expect(result.products[0].quantity).toBe(20)
        });
        it("DELETE for /api/user-product/{username}/products/{id}", async()=> {
            let result = await helpers.findLastInsertedUser();
            const username = result.username
            const id = result.products[0]._id;

            const res = await request(app)
                    .delete('/api/user-product/' +username + '/products/' +id)

            result = await helpers.findLastInsertedUser()
            console.log(result);
            expect(res.statusCode).toBe(200)
            expect(result.products.length).toBe(0)
        });
    })