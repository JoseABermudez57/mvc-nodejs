const express = require('express');
const userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').get(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
// ruta para busqueda de usuario por nombre
router.route('/user/findbyname').get(userController.searchUserDBServiceFunc);
// ruta para eliminar un usuario por correo
router.route('/user/delete').delete(userController.deleteUserDBServiceFunc);

module.exports = router;
