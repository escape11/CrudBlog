/*************************************************************************
USERS TABLE
*************************************************************************/

module.exports = function (sequelize, Sequelize) {
	var User = sequelize.define(
		'users',
		{
			FirstName: {
				type: Sequelize.STRING,
				field: 'first_name',
			},
			LastName: {
				type: Sequelize.STRING,
				field: 'last_name',
			},
			Email: {
				type: Sequelize.STRING,
				field: 'email',
			},
			PhoneNumber: {
				type: Sequelize.STRING,
				field: 'phone_number',
			},
		},
		{
			freezeTableName: true,
		},
	)
	return User
}
