const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

//read methods
router.get('/', userController.findAll);
router.get('/:surname', userController.findOne);

//create methods
router.post('/', userController.create)

//update methods
router.patch('/:username', userController.update);

//delete methods
router.delete('/:username', userController.delete);

module.exports = router;