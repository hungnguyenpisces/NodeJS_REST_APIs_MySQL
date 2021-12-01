const { Model } = require('objection');

class User extends Model {
	static get tableName() {
		return 'users';
	}
	static get idColumn() {
		return 'username';
	}
	static get relationMappings() {
		const Employee = require('./Employee');
		return {
			employee: {
				relation: Model.BelongsToOneRelation,
				modelClass: Employee,
				join: {
					from: 'users.employeeNumber',
					to: 'employees.employeeNumber',
				},
			},
		};
	}
}
module.exports = User;
