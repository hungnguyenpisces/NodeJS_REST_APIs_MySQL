const express = require('express');
const router = express.Router();
const Offices = require('../services/Offices.js');
const auth = require('../middleware/auth.js');

router.get('/', auth([1]), Offices.getAllOffices);
router.put('/:officeCode', auth([1]), Offices.updateOffice);

module.exports = router;
