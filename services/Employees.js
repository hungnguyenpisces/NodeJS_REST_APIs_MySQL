const Employee = require('../models/Employee.js');

class EmployeeService {
	getAllEmployees = async (req, res) => {
		try {
			const employees = await Employee.query();
			res.status(200).json({
				total: employees.length,
				employees: employees,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	getEmployeeByNumber = async (req, res) => {
		try {
			const employee = await Employee.query().findById(
				req.params.employeeNumber
			);
			res.status(200).json({
				employee: employee,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	updateEmployee = async (req, res) => {
		try {
			const employee = await Employee.query().patchAndFetchById(
				req.params.employeeNumber,
				req.body
			);
			res.status(200).json({
				employee: employee,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	createEmployee = async (req, res) => {
		try {
			const employee = await Employee.query().insert(req.body);
			res.status(200).json({
				employee: employee,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	deleteEmployee = async (req, res) => {
		try {
			const employee = await Employee.query().deleteById(
				req.params.employeeNumber
			);
			res.status(200).json({
				message: 'Employee deleted successfully',
				employee: employee,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};
}
module.exports = new EmployeeService();
