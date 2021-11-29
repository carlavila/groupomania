const express = require("express");
const router = express.Router();

// CONTROLLERS
const userCtrl = require("../controllers/user.js");

//MIDDLEWARE
const auth = require('../middleware/userAuth.js');
const multer = require('../middleware/multer-config.js');

// ROUTES

/* '/' = http://localhost:3000/api/users */

/* route création user */
router.post('/signup', userCtrl.signup);

/* route authentification user */
router.post('/login', userCtrl.login);

/* route modification user */
router.put('/:id', auth, multer, userCtrl.editUser);

/* route affichage ensemble des users */
router.get('/all', userCtrl.getAllUsers);

/* route affichage user connecté */
router.get('/:id', auth, userCtrl.getOneUser);

/* route suppression user */
router.delete('/:id', auth, userCtrl.deleteUser);

// EXECUTION
module.exports = router;