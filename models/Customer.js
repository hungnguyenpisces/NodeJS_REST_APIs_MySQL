const { Model } = require('objection');
// const knex = require('../config/database.js');
// Model.knex(knex);

class Customer extends Model {
	static get tableName() {
		return 'customers';
	}

	static get idColumn() {
		return 'customerNumber';
	}

	static get relationMappings() {
		const Employee = require('./Employee.js');
		return {
			salesRep: {
				relation: Model.BelongsToOneRelation,
				modelClass: Employee,
				join: {
					from: 'customers.salesRepEmployeeNumber',
					to: 'employees.employeeNumber',
				},
			},
		};
	}
}
module.exports = Customer;
