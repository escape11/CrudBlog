var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: 'Post' });
});

/* GET users listing. */
router.get('/', blogController.getPosts);
router.post('/create_post', blogController.createPost);
router.get('/view/:id', blogController.getPostDetail);
router.get('/edit/:id', blogController.editPost);
router.post('/update_post/:id', blogController.updatePost);
router.get('/delete/:id', blogController.deletePost);

module.exports = router