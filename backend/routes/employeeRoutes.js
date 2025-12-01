const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/Employee');
const authenticateToken = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'employee-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// GET /employees - Get all employees
router.get('/employees', authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.find().sort({ created_at: -1 });
        res.status(200).json({
            status: true,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

// GET /employees/:id - Get employee by ID
router.get('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            status: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

// POST /employees - Create new employee
router.post('/employees', authenticateToken, upload.single('profile_picture'), async (req, res) => {
    try {
        const employeeData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            position: req.body.position,
            salary: req.body.salary,
            date_of_joining: req.body.date_of_joining,
            department: req.body.department
        };

        if (req.file) {
            employeeData.profile_picture = req.file.path;
        }

        const employee = new Employee(employeeData);
        await employee.save();

        res.status(201).json({
            status: true,
            message: 'Employee created successfully',
            employee_id: employee._id,
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

// PUT /employees/:id - Update employee
router.put('/employees/:id', authenticateToken, upload.single('profile_picture'), async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        // Update fields
        const updateFields = ['first_name', 'last_name', 'email', 'position', 'salary', 'date_of_joining', 'department'];
        updateFields.forEach(field => {
            if (req.body[field] !== undefined) {
                employee[field] = req.body[field];
            }
        });

        // Handle profile picture update
        if (req.file) {
            // Delete old picture if exists
            if (employee.profile_picture && fs.existsSync(employee.profile_picture)) {
                fs.unlinkSync(employee.profile_picture);
            }
            employee.profile_picture = req.file.path;
        }

        await employee.save();

        res.status(200).json({
            status: true,
            message: 'Employee updated successfully',
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

// DELETE /employees/:id - Delete employee
router.delete('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        // Delete profile picture if exists
        if (employee.profile_picture && fs.existsSync(employee.profile_picture)) {
            fs.unlinkSync(employee.profile_picture);
        }

        await Employee.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: true,
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

// GET /employees/search - Search employees by department or position
router.get('/search', authenticateToken, async (req, res) => {
    try {
        const { department, position } = req.query;
        const searchQuery = {};

        if (department) {
            searchQuery.department = { $regex: department, $options: 'i' };
        }

        if (position) {
            searchQuery.position = { $regex: position, $options: 'i' };
        }

        if (Object.keys(searchQuery).length === 0) {
            return res.status(400).json({
                status: false,
                message: 'Please provide department or position to search'
            });
        }

        const employees = await Employee.find(searchQuery);

        res.status(200).json({
            status: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

module.exports = router;