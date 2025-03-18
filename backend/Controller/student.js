const Student = require('../Model/student');
const cloudinary = require('../utils/cloudinary');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { Name, Age, Status } = req.body;
        let imageUrl = null;

        // Upload image to Cloudinary if provided
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadResult.secure_url;
        }

        const newStudent = new Student({ Name, Image: imageUrl, Age, Status });
        await newStudent.save();

        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const { Name, Age, Status } = req.body;

        // Find existing student
        const existingStudent = await Student.findById(req.params.id);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        let imageUrl = existingStudent.Image; // Keep the old image by default

        // If a new image is uploaded, replace the old one
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadResult.secure_url;
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { Name, Image: imageUrl, Age, Status },
            { new: true }
        );

        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update student status (Active/Inactive)
exports.updateStudentStatus = async (req, res) => {
    try {
        const { Status } = req.body; // Get new status from request body        
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { Status: Status },
            { new: true } // Return the updated student
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student status updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
