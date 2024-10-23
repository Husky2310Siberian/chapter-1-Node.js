const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title":"Products CRUD API",
        "description": "Products and Users application",
        "contact": {
            "name": "Coding Factory",
            "url" : "https://www.example.com",
            "email": "support@example.com"
        }
    },
    "components" : {
        "schemas" : {
            User: m2s(User)
        }
    },
    "servers": [
        {
            url:"http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "https://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags" :[
        {
            "name" : "Users",
            "description": "Requests for user"
        },
        {
            "name" : "Users and Products",
            "description" : "Requests for user's products"
        }
    ],
    "paths": {
        "/api/users":{
            "get":{
                "tags": ["Users"],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "List of all users",
                        "content": {
                            "application/json":{
                                "schema": {
                                    "type":"array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Users"],
                "description": "Creates new User",
                "requestBody": {
                    "description": "Data for user that we create",
                    "content": {
                        "application/json": {
                            "schema":{
                                "type":"object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "password": {"type": "string"},
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "email":{"type": "email"},
                                    "address": {
                                        "type":"object",
                                        "propertties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    },
                                    "phone":{
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type":"string"},
                                                "number":{"type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required":["username", "password", "name", "surname"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New User is created"
                    }
                }
            }
        },
        "/api/users/{username}": {
            "get":{
                "tags": ["Users"],
                "parameters":[
                    {
                        "name": "surname",
                        "in": "path",
                        "required": true,
                        "description": "Surname of user that we want to find",
                        "type": "string"
                    }
                ],
                "description": "Get user with specific surname",
                "responses": {
                    "200":{
                        "description": "User result",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags":["Users"],
                "description":"Update user",
                "parameters": [{
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description": "username of user we want to update",
                    "type":"string"
                }
            ],
            "requestBody": {
                "description":"User to update",
                "content": {
                    "application/json": {
                        "schema": {
                            "type":"object",
                            "properties": {
                                "name":{"type":"string"},
                                "surname":{"type":"string"},
                                "email":{"type":"string"},
                                "address":{
                                    "type":"object",
                                    "properties": {
                                       "area": {"type": "string"},
                                       "road": {"type": "string"}
                                    }
                                }
                            },
                            "required" : ["email"]
                        }
                    }
                }
            },
                "responses": {
                    "200": {
                        "description": "Update user",
                        "schema": {
                            "$ref" : "#/components/schema/User"
                        }
                    }
                }
            },
            "delete": {
                "tags":["Users"],
                "description":"Delete user",
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required": true,
                        "description":"username of user that we want to delete",
                        "type":"string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "delete user"
                    }
                }
            }
    },
    "/api/user-product/users/products":{
        "get": {
            "tags":["Users and Products"],
            "description": "returns all users and with their products", 
            "responses" : {
                "200": {
                    "description": "All users with their products"
            }
        }
        }
    },
    "/api/user-product/{username}/products": {
        "get": {
            "tags" : ["Users and Products"],
            "parameters":[
                {
                    "name" : "username",
                    "in": "path",
                    "required": "true",
                    "description":"Username of user to find products",
                    "type":"string"
                }
            ],
            "description": "Username and Products",
            "responses": {
                "200" : {
                    "description": "User and Products to find"
                }
            }
        },
        "post": {
            "tags" : ["Users and Products"],
            "description": "Add new products to user",
            "parameters":[
                {
                    "name" : "username",
                    "in": "path",
                    "required": "true",
                    "description":"Username of user to find products",
                    "type":"string"
                }
            ],
            "requestBody" : {
                "description" : "Data to add products",
                "content" : {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties" : {
                                "username": {"type" : "string"},
                                "products": {
                                    "type": "array",
                                    "items":{
                                        "type": "object",
                                        "properties": {
                                            "product": {"type": "string"},
                                            "cost": {"type":"number"},
                                            "quantity":{"type":"nuber"}
                                        }
                                    }
                                }
                            },
                            "required": ["quantity"]
                            }
                        }
                    }
                },
                    "responses": {
                        "200" : {
                            "description": "New products to user"
                        }
                    }
            }
        }
    }
}
