const express = require('express'); // importation du paquet express
const app = express(); // Création de l'application express
const bodyParser = require('body-parser'); // importation du paquet body-parser
const path = require('path');
const helmet = require("helmet");

require('dotenv').config();

// App Routes
const usersRoutes = require('./routes/users.js');
const postsRoutes = require('./routes/posts.js');
const commentsRoutes = require ('./routes/comments.js');



//Appel des différents models de la base de données
const { sequelize } = require('./models/index.js');

//HELMET
app.use(helmet());


/* Vérification si la connexion avec est bien établie */
try {
	sequelize.authenticate();
	console.log('Connection Sequelize to MySQL > successful');
    } catch (error) {
	console.error('Unable to connect sequelize to the database:', error);
    }


//CORS
//Initialisation des headers pour éviter les erreurs de CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
    });




//Transforme le corp de la requête en object Javascript utilisable
app.use(bodyParser.json());


// Access Routes
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));




module.exports = app;