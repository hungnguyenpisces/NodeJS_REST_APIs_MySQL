const Customer = require('../models/customer.js');

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
