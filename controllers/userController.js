// IMPORT DATABASE FILE
var DB = require('../models')
const { validationResult } = require('express-validator')

/**
 * CREATE SINGLE USER
 * @param {user object} req
 * @param {*} res
 */

const createUser = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// CREATE USER IN DATABASE

		let insert_data = {
			FirstName: req.body.first_name,
			LastName: req.body.last_name,
			Email: req.body.email,
			PhoneNumber: req.body.phone_number,
		}

		let result = await DB.users.create(insert_data)

		// RETURN RESPONSE
		return res.redirect('/users')
	} catch (error) {
		console.log(error)
		// RETURN RESPONSE
		return res.status(400).send(JSON.stringify({ message: error.message }))
	}
}

/**
 * GET USERS FROM DATABASE, CALLED FROM USERS LISTING PAGE
 * @param {*} req
 * @param {*} res
 */

const getUsers = async (req, res) => {
	try {
		// GET ALL USER FROM DATABASE

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		let users = await DB.users.findAll()

		// // RETURN SUCCESS RESPONSE
		// return res.render('user_list', { title: 'User List', entities: users })
		return res.render('user_list', { title: 'User List',entities: users})
	} catch (error) {
		// RETURN ERRIR RESPONSE
		console.log(error.message)
		return res.render('error', { title: 'Error', error })
	}
}

/**
 * GET USER DETAIL FROM DATABASE
 * @param {userId} req
 * @param {*} res
 */

const getUserDetail = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// GET USER DATA FROM USER ID
		let user = await DB.users.findOne({
			where: {
				id: req.params.id,
			},
		})
		return res.render('user_details', { title: 'User Details', user })
	} catch (error) {
		// RETURN ERROR RESPONSE
		return res.render('error', { title: 'Error', error })
	}
}
/**
 * GET USER DETAIL FROM DATABASE
 * @param {userId} req
 * @param {*} res
 */

const editUser = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// GET USER DATA FROM USER ID
		let user = await DB.users.findOne({
			where: {
				id: req.params.id,
			},
		})
		return res.render('user_edit', { title: 'Edit User', user })
	} catch (error) {
		// RETURN ERROR RESPONSE
		return res.render('error', { title: 'Error', error })
	}
}

/**
 * UPDATE SINGLE USER IN DATABASE
 * @param {user object} req
 * @param {*} res
 */

const updateUser = async (req, res) => {
	try {
		// UPDATE USER IN DATABASE

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		let update_data = {
			FirstName: req.body.first_name,
			LastName: req.body.last_name,
			Email: req.body.email,
			PhoneNumber: req.body.phone_number,
		}

		//we need to set publishedAt, if status is publish
		//but we need to check whether this user is already published or it is being published now
		//because we don't want the issue that the publishedAt is populated everytime the user is updated
		await DB.users.update(update_data, {
			where: {
				id: req.params.id,
			},
		})

		// RETURN SUCCESS RESPONSE
		return res.redirect('/users')
	} catch (error) {
		console.log(error.message)
		// RETURN ERROR RESPONSE
		return res.render('error', { title: 'Error', error })
	}
}

/**
 * PHYSICALLY DELETE SINGLE USER FROM DATABASE
 * @param {userId} req
 * @param {*} res
 */

const deleteUser = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		let { userId } = req.body
		//DELETE USER IN DATABASE
		await DB.users.destroy({
			where: {
				id: req.params.id,
			},
		})

		// RETURN SUCCESS RESPONSE
		return res.redirect('/users')
	} catch (error) {
		console.log(error.message)
		// RETURN ERROR RESPONSE
		return res.render('error', { title: 'Error', error })
	}
}

module.exports = {
	deleteUser,
	updateUser,
	getUserDetail,
	createUser,
	getUsers,
	editUser,
}
