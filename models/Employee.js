const { Model } = require('objection');

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
		const User = require('./User.js');
		const Role = require('./Role.js');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'employees.employeeNumber',
					to: 'users.employeeNumber',
				},
			},
			office: {
				relation: Model.BelongsToOneRelation,
				modelClass: Office,
				join: {
					from: 'employees.officeCode',
					to: 'offices.officeCode',
				},
			},
			role: {
				relation: Model.BelongsToOneRelation,
				modelClass: Role,
				join: {
					from: 'employees.role',
					to: 'role.id',
				},
			},
			customers: {
				relation: Model.HasManyRelation,
				modelClass: Customer,
				join: {
					from: 'employees.employeeNumber',
					to: 'customers.salesRepEmployeeNumber',
				},
			},
		};
	}
}
module.exports = Employee;
