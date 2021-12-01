const express = require('express');
const router = express.Router();
const offices = require('../services/Offices.js');

router.get('/', offices.getAllOffices);
router.put('/:officeCode', offices.updateOffice);

module.exports = router;
