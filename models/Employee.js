const { Model } = require('objection');
// const knex = require('../config/database.js');
// Model.knex(knex);

class Employee extends Model {
	static get tableName() {
		return 'employees';
	}
	static get idColumn() {
		return 'employeeNumber';
	}
	static get relationMappings() {
		const Office = require('./Office.js');
		const Customer = require('./Customer.js');
		return {
			office: {
				relation: Model.BelongsToOneRelation,
				modelClass: Office,
				join: {
					from: 'employees.officeCode',
					to: 'offices.officeCode',
				},
			},
			customers: {
				relation: Model.ManyToManyRelation,
				modelClass: Customer,
				join: {
					from: 'employees.employeeNumber',
					through: {
						from: 'customers.salesRepEmployeeNumber',
						to: 'employees.employeeNumber',
					},
					to: 'customers.customerNumber',
				},
			},
		};
	}
}
module.exports = Employee;
