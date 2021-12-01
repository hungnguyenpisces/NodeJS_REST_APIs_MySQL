const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Employee = require('../models/Employee.js');

class UserService {
	hashPassword = (password) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(+process.env.SALT));
	};

	isPasswordValid = (password, hashedPwd) => {
		return bcrypt.compareSync(password, hashedPwd);
	};

	generateToken = (user) => {
		const { employeeNumber, officeCode, role } = user.employee;
		return jwt.sign(
			{ employeeNumber, officeCode, role },
			process.env.TOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		);
	};

	createUser = async (req, res) => {
		try {
			const user = await User.query().findById(req.body.username);
			if (user) {
				return res.status(400).json({
					message: 'Username already exists',
				});
			}

			const employee = await Employee.query().findById(req.body.employeeNumber);
			if (!employee) {
				return res.status(400).json({
					message: 'Employee does not exist',
				});
			}

			const checkuser = await User.query()
				.where('employeeNumber', req.body.employeeNumber)
				.first();

			if (checkuser) {
				return res.status(400).json({
					message: 'Employee number is owned by another user',
				});
			}
			const { username, password, employeeNumber } = req.body;
			const hashedPwd = this.hashPassword(password);
			const newUser = await User.query().insert({
				username,
				password: hashedPwd,
				employeeNumber,
			});
			res.status(200).json({
				message: 'User created successfully',
				newUser,
			});
		} catch (err) {
			res.status(500).json({
				message: 'Error creating user',
				err,
			});
		}
	};

	login = async (req, res) => {
		try {
			const { username, password } = req.body;
			const user = await User.query()
				.findById(username)
				.withGraphFetched('employee');
			if (!user) {
				return res.status(401).json({
					message: 'User not found',
				});
			}
			if (!this.isPasswordValid(password, user.password)) {
				return res.status(401).json({
					message: 'Incorrect password',
				});
			}
			const token = this.generateToken(user);
			res.status(200).json({
				message: 'User logged in successfully',
				token,
				user,
			});
		} catch (err) {
			res.status(500).json({
				message: 'Error logging in user',
				err,
			});
		}
	};
}
module.exports = new UserService();
