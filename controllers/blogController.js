// IMPORT DATABASE FILE
var DB = require('../models')
const { validationResult } = require('express-validator')

/**
 * CREATE SINGLE USER
 * @param {user object} req
 * @param {*} res
 */

const createPost = async (req, res) => {
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

		let result = await DB.posts.create(insert_data)

		// RETURN RESPONSE
		return res.redirect('/posts')
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

const getPosts = async (req, res) => {
	try {
		// GET ALL USER FROM DATABASE

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		let posts = await DB.posts.findAll()

		// // RETURN SUCCESS RESPONSE
		// return res.render('user_list', { title: 'User List', entities: users })
		return res.render('post_list', { title: 'User List',entities: posts})
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

const getPostDetail = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// GET USER DATA FROM USER ID
		let post = await DB.posts.findOne({
			where: {
				id: req.params.id,
			},
		})
		return res.render('post_details', { title: 'Post Details', post })
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

const editPost= async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// GET USER DATA FROM USER ID
		let post = await DB.posts.findOne({
			where: {
				id: req.params.id,
			},
		})
		return res.render('post_edit', { title: 'Edit Post', post })
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

const updatePost = async (req, res) => {
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
		await DB.posts.update(update_data, {
			where: {
				id: req.params.id,
			},
		})

		// RETURN SUCCESS RESPONSE
		return res.redirect('/posts')
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

const deletePost = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		let { postId } = req.body
		//DELETE USER IN DATABASE
		await DB.posts.destroy({
			where: {
				id: req.params.id,
			},
		})

		// RETURN SUCCESS RESPONSE
		return res.redirect('/posts')
	} catch (error) {
		console.log(error.message)
		// RETURN ERROR RESPONSE
		return res.render('error', { title: 'Error', error })
	}
}

module.exports = {
	deletePost,
	updatePost,
	getPostDetail,
	createPost,
	getPosts,
	editPost,
}
