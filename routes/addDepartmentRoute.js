const express = require('express');
const addDepartmentRoute = express.Router();
const { addDepartment } = require('../controllers/departmentController');

addDepartmentRoute.post('/add', addDepartment);

module.exports = addDepartmentRoute;