const express = require('express');
const router = express.Router();
const adminController = require('../Controller/admin');
const {authMiddleware } = require('../Middleware/jwt');


router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/',authMiddleware,adminController.getAllAdmins);
router.delete('/:id',authMiddleware,adminController.deleteAdmin);

module.exports = router;
