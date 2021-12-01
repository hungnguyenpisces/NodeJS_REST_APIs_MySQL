const { Model } = require('objection');
// const knex = require('../config/database.js');
// Model.knex(knex);

class Office extends Model {
	static get tableName() {
		return 'offices';
	}

	static get idColumn() {
		return 'officeCode';
	}

	static get relationMappings() {
		const Employee = require('./Employee.js');

		return {
			employees: {
				relation: Model.HasManyRelation,
				modelClass: Employee,
				join: {
					from: 'offices.officeCode',
					to: 'employees.officeCode',
				},
			},
		};
	}
}
module.exports = Office;
