const User = require('../models/user.model');

exports.findUsersProducts = async(req , res) => {
    console.log("Find all users products")

    try{
        const result = await User.find({} , {username:1 , products:1 , _id:0});
        res.json({status:true , data:result});
    }catch(err) {
        res.json({status: false , data:err})
    }
}

exports.findUserProducts = async(req, res) => {
    const username = req.params.username;
    console.log("Find products for user", username);

    try {
        const result = await User.findOne({username: username}, {username:1, products:1, _id:0})
        res.json({status:true , data: result})
    } catch(err) {
        res.json({status:false , data: err})
    }
}

exports.insertUserProduct = async(req, res) => {
    const username = req.body.username;
    const products = req.body.products;
    console.log("Insert products to user" , username);

    try{
        const result = await User.updateOne(
            {username: username},
            {
                $push: {
                    products:products
                }
            }
        )
        res.json({status: true, data:result})
    } catch(err){
        res.json({status: false, data:err})
    }
}

exports.updateUserController = async(req , res) => {
    const username = req.params.username;
    const product_id = req.body.product._id;
    const quantity = req.body.product.quantity
    console.log("Update product quantity for user", username)
    try {
        const result = await User.findOneAndUpdate(
            {username: username, "products._id": product_id},
            {
                $set: {
                "products.$.quantity":product-quantity
                }
            }
        )
        res.json({status: true , data:result})
    } catch(err){
        res.json({status:false , data: err})
    }
}

exports.deleteUserProduct = async(req , res) => {
    const username = req.params.username;
    const product_id = req.params.id

    console.log("Delete product from user", username);

    try {
        const result = await User.updateOne(
            {username: username}, 
            {
                $pull: {
                    products: {_id: product_id}
                }
            }
        )
        res.json({status: true , data: result})
    } catch(err){
    res.json({status: false, data: err})
    }
} 

exports.stats1 = async(req , res) => {
    console.log("For all users sum by product and count");

    try{
        const result = await User.aggregate([
            {
                $unwind: "$products"
            },
            {
                $project: {
                    _id:1 , username:1 , products:1
                }
            },
              {
                $group: {
                    _id: {
                        username: "$username",
                        product: "$products.product"   
            },
                totalAmount: {
                    $sum: {
                        $multiply: ["$products.cost", "$products.quantity"]
                    }
                },
                count: {$sum:1}
            }
            }, 
            {
                $sort: {
                    "_id.username": 1 , "_id.product" :1}
                }
        ])
        res.json({status:true , data:result})
        console.log("stats1")
    } catch(err) {
        res.json({status:false , data:err})
        console.log("problem occured")
    }
}

exports.stats2 = async(req , res) => {
    console.log("stats2")

    try{
        const result = await User.aggregate(
            [
                {
                    $unwind: "$products"
                },
                {
                    $project: {
                        _id:0,
                        products:1 
                    }
                },
                {
                    $group: {
                        _id: {
                            product:"$products.product"},
                            totalAmount: {
                                $sum: {
                                    $multiply:["$products.quantity", "$products.cost"]
                                }
                            },
                            count: {
                                $sum:1}
                    }
                },
                {
                    $sort: {
                        "totalAmount":-1 , "count": 1
                    }
                }
            ]
        )
        res.json({status:true , data:result})
        console.log("stats2 ok")
    }catch(err) {
        res.json({status:false , data:err})
        console.log("problem occured")
    }
}

exports.stats3 = async(req , res) => {
    const username = req.params.username
    console.log("Stats by username" , username)

    try{
        const result = await User.aggregate(
            [
                {
                $match: {
                    username: username
                }
            },
            {
                $unwind: "$products"
            },
            {
                $project: {
                    _id:0 , products:1
                }
            },
            {
                $group: {
                    _id: {
                        product: "$products.product"}, 
                        totalAmount : {
                            $sum: {
                                $multiply : ["$products.cost", "$products.quantity"]
                            }
                        },
                        count: {$sum:1}
                }
            },
            {
                $sort: {"totalAmount": -1
                }
            }
        ])
        res.json({status:true , data:result})
        console.log("stats3 ok")
    }catch(err) {
        res.json({status:false , data:err})
        console.log("problem occured")
    }
}