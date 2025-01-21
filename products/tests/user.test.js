const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../index');

const helpers = require("../services/user.service")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to Mongo from Jest established")},
        err => {console.log("Failed to connect to Mongo from Jest")}
    )
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe("Tests for /api/users requests", () => {
    it("GET /api/users" , async() => {
        const result = await request(app).get('/api/users');
        expect(result.statusCode).toBe(200);
        expect(result.body.statusCode).toBeTruthy;
        expect(result.body.data.length).toBeGreaterThan(0);
    },10000)
    it("POST /api/users", async() => {
        const result = await request(app).post('/api/users')
            .send({
                username: "test4",
                password:"12345",
                name:"test4 name",
                surname:"test4 surname",
                email:"test@4aueb.gr",
                address: {
                    area:"area66",
                    road:"road66"
                }
            });
        expect(result.statusCode).toBe(200);
        expect(result.body.status).toBeTruthy();
        expect(result.body.data).toBeTruthy
    })
})

describe("Tests for /api/users/{username} requests", () => {
    it("GET /api/users/{username}" , async() => {
        const results = await helpers.findLastInsertedUser();
        console.log(results.username)
        const result = await request(app).get('/api/users/' +results.username);

        expect(result.statusCode).toBe(200);
        expect(result.body.status).toBeTruthy();
        expect(result.body.data.username).toBe(results.username);
        expect(result.body.data.email).toBe(results.email)
    })
    it("DELETE /api/users/{username} " , async() => {
        const results = await helpers.findLastInsertedUser();
        console.log(results.username)
        const result = await request(app).delete('/api/users/'+results.username);

        expect(result.statusCode).toBe(200);
        expect(result.body.status).toBeTruthy();
    })
})