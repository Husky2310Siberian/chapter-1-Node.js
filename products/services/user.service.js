const User = require("../models/user.model")

async function findLastInsertedUser() {
    console.log("Find last inserted user");

    try {
        const result = await User.find({}).sort({_id:-1}).limit(1)
        return result[0];
    } catch(err){
        console.log("Problem in finding the last inserted user" , err)

    }
}

async function findUsersProduct(username) {
    console.log("Find user's product", username);


    try{
        const result = await User.findOne(
        {username: username},
        {username:1 , products:1})
        // console.log(result)
        return result;
    }catch(err){
        console.log("Proble in finding user's product")
        return false;
    }
}

module.exports = {findLastInsertedUser, findUsersProduct};
