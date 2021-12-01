const Employee = require('../models/Employee.js');
/*
CREATE TABLE `employees` (
  `employeeNumber` int(11) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `officeCode` varchar(10) NOT NULL,
  `reportsTo` int(11) DEFAULT NULL,
  `jobTitle` varchar(50) NOT NULL,
  PRIMARY KEY (`employeeNumber`),
  KEY `reportsTo` (`reportsTo`),
  KEY `officeCode` (`officeCode`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`reportsTo`) REFERENCES `employees` (`employeeNumber`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`officeCode`) REFERENCES `offices` (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/
// using knex to query the database
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
