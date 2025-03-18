const express = require('express');
const router = express.Router();
const studentController = require('../Controller/student');
const {authMiddleware } = require('../Middleware/jwt');
const upload = require('../Middleware/multer');


// Routes for student management
router.post('/',authMiddleware,upload.single('Image'), studentController.createStudent);
router.get('/',authMiddleware, studentController.getAllStudents);
router.get('/:id',authMiddleware, studentController.getStudentById);
router.put('/:id',authMiddleware,upload.single('Image'), studentController.updateStudent);
router.delete('/:id',authMiddleware, studentController.deleteStudent);
router.patch('/:id/status', studentController.updateStudentStatus);

module.exports = router;
