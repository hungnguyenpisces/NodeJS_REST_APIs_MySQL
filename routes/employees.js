const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth.js');
const employees = require('../services/Employees.js');
// const validate = require('../middleware/validators.js');

//Employee
// router.get( '/:employeeNumber', auth(['President', 'Manager', 'Leader']), employees.getEmployeeByNumber);
router.get('/:employeeNumber', employees.getEmployeeByNumber);

// router.get('/', // auth(['President', 'Manager', 'Leader']), employees.getAllEmployees);
router.get('/', employees.getAllEmployees);

// router.post('/', auth(['President', 'Manager']), validate.employee, employees.createEmployee);
router.post('/', employees.createEmployee);

// router.put('/', auth(['President', 'Manager']), validate.employee, employees.updateEmployee);
router.put('/:employeeNumber', employees.updateEmployee);

// router.delete('/:employeeNumber', auth(['President']), employees.deleteEmployee);
router.delete('/:employeeNumber', employees.deleteEmployee);

module.exports = router;
