const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

let addressSchema = new Schema({
    area: {type: String},
    road: {type:String}
}, {_id:false})

let phoneSchema = new Schema({
    type: {type: String},
    number: {type: String}
}, {_id:false})

let productSchema = new Schema({
    product:{type: String},
    quantity: {type: Number},
    cost: {type: Number , required: true},
    date: {type: Date, default: Date.now}
})


let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        max: 100,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        max: 100,

    }, 
    name: {
        type: String,
        required: [true, 'Name is required'],
        max: 100,
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        max: 100,
        trim: true
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        max: 100,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email address is not valid",
        ], 
    },
    //address is an Object
    address: addressSchema,
    phone: {type : [phoneSchema], null:true},
    products: {type: [productSchema], null:true}


}, 
{
    collection: 'users',
    timestamps: true
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);