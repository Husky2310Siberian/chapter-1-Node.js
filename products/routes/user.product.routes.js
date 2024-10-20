const express = require('express');
const router = express.Router();

const userProductController = require('../controllers/user.product.controller');

router.get('/', userProductController.findUsersProducts);
router.get('/:username', userProductController.findUserProducts);
router.post('/:username/products', userProductController.insertUserProduct)
router.patch('/:username/product/:id', userProductController.update)
router.delete('/:username/products/:id', userProductController.deleteUserProduct)
module.exports = router;