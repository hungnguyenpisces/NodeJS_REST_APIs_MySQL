module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: 'localhost',
			port: 3306,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			charset: 'utf8',
		},
		debug: true,
		pool: { min: 0, max: 10 },
	},
};
