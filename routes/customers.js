const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth.js');
const customers = require('../services/Customers.js');
// const validate = require('../middleware/validators.js');

//Customer
// router.get(	'/:customerNumber',	auth(['President', 'Manager', 'Leader', 'Staff']),	customers.getCustomerByNumber);
router.get('/:customerNumber', customers.getCustomerByNumber);

// router.get('/',	auth(['President', 'Manager', 'Leader', 'Staff']),	customers.getAllCustomers);
router.get('/', customers.getAllCustomers);

// router.post('/', auth(['President', 'Manager', 'Leader', 'Staff']), validate.customer, customers.createCustomer);
router.post('/', customers.createCustomer);

// router.put('/', auth(['President', 'Manager', 'Leader']), customers.updateCustomer);
router.put('/:customerNumber', customers.updateCustomer);

// router.delete('/:customerNumber', auth(['President', 'Manager', 'Leader']), customers.deleteCustomer);
router.delete('/:customerNumber', customers.deleteCustomer);

module.exports = router;
