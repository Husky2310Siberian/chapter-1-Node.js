const User = require('../models/user.model')

exports.findAll = async(req , res) => {
    console.log("Find all users")

    try{
        const result = await User.find()
        res.json({status: true , data:result})
    } catch(err) {
        res.json({status: false , data:err})
    }
}

exports.findOne = async(req , res) => {
    const surname = req.params.surname;
    console.log("find user with surname " , surname);

    try{
        const result = await User.findOne({username: surname})
        res.json({status: true , data: result})
    } catch(err) {
        res.json({status: false , data: err});
    }
}