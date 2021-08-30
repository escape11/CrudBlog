/*************************************************************************
USERS TABLE
*************************************************************************/

module.exports = function (sequelize, Sequelize) {
	var Post = sequelize.define(
		'posts',
		{
			PostName: {
				type: Sequelize.STRING,
				field: 'post_name',
			},
		
		},
		{
			freezeTableName: true,
		},
	)
	return Post
}