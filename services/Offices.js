const Office = require('../models/office.js');
// using knex to query the database
/*
CREATE TABLE `offices` (
  `officeCode` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `postalCode` varchar(15) NOT NULL,
  `territory` varchar(10) NOT NULL,
  PRIMARY KEY (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/

class OfficeSevice {
	getAllOffices = async (req, res) => {
		try {
			const offices = await Office.query();
			res.status(200).json({
				total: offices.length,
				offices: offices,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	};

	updateOffice = async (req, res) => {
        try {
            const { officeCode } = req.params;
            const { city, phone, addressLine1, addressLine2, state, country, postalCode, territory } = req.body;
            const office = await Office.query().where('officeCode', officeCode).update({
                city,
                phone,
                addressLine1,
                addressLine2,
                state,
                country,
                postalCode,
                territory,
            });
            res.status(200).json({
                message: 'Office updated successfully',
                office,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
	};
}
module.exports = new OfficeSevice();
