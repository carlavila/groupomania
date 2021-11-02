const express = require("express");
const router = express.Router();

//CONTROLLERS
const postCtrl = require('../controllers/post.js');
const likesCtrl = require('../controllers/likes.js');

//MIDDLEWARE
const auth = require('../middleware/auth.js');
const postAuth = require('../middleware/postAuth.js')
const multer = require('../middleware/multer-config.js');

//ROUTES

/* route création post */
router.post('/create', auth, multer, postCtrl.createPost);
/* route affichage ensemble des posts */
router.get('/all', postCtrl.getAllPosts);
/* route affichage d'un post en particulier */
router.get('/:id', postCtrl.getOnePost);
/* route modification post */
router.put('/:id', postAuth, multer, postCtrl.editPost);
/* route pour like un post */
router.post('/:postId/like', likesCtrl.likePost);
/* route pour récupérer les likes d'un post */
router.get('/:postId/likes', likesCtrl.getAllLikesPost);
/* route suppression post */
router.delete('/:id', postAuth, postCtrl.deletePost);

// Execution
module.exports = router;   