var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/create_user', userController.createUser);
router.get('/view/:id', userController.getUserDetail);
router.get('/edit/:id', userController.editUser);
router.post('/update_user/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router
