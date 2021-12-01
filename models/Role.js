const { Model } = require('objection');

class Role extends Model {
	static get tableName() {
		return 'roles';
	}
	static get idColumn() {
		return 'id';
	}

	static relationMappings() {
		const Employee = require('./Employee.js');
		return {
			employees: {
				relation: Model.HasManyRelation,
				modelClass: Employee,
				join: {
					from: 'roles.id',
					to: 'employees.role',
				},
			},
		};
	}
}
module.exports = Role;
