const Customer = require('../models/customer.js');

/*
CREATE TABLE `customers` (
  `customerNumber` int(11) NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `contactLastName` varchar(50) NOT NULL,
  `contactFirstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `salesRepEmployeeNumber` int(11) DEFAULT NULL,
  `creditLimit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`customerNumber`),
  KEY `salesRepEmployeeNumber` (`salesRepEmployeeNumber`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees` (`employeeNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/

class CustomerService {
	getAllCustomers = async (req, res) => {
		try {
			const customers = await Customer.query();
			res.status(200).json({
				total: customers.length,
				customers: customers,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	getCustomerByNumber = async (req, res) => {
		try {
			const customer = await Customer.query().findById(
				req.params.customerNumber
			);
			if (!customer) {
				res.status(404).json({
					message: 'Customer not found',
				});
			} else {
				res.status(200).json({
					customer: customer,
				});
			}
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	createCustomer = async (req, res) => {
		try {
			const customer = await Customer.query().insert(req.body);
			res.status(201).json({
				message: 'Customer created successfully',
				customer: customer,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	updateCustomer = async (req, res) => {
		try {
			const customer = await Customer.query().patchAndFetchById(
				req.params.customerNumber,
				req.body
			);
			res.status(200).json({
				message: 'Customer updated successfully',
				customer: customer,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	deleteCustomer = async (req, res) => {
		try {
			const customer = await Customer.query().deleteById(
				req.params.customerNumber
			);
			res.status(200).json({
				message: 'Customer deleted successfully',
				customer: customer,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};
}
module.exports = new CustomerService();
