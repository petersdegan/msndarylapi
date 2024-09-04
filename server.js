
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');






dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
   // useNewUrlParser: true,
    //useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/annonces', require('./routes/annoncesRoutes'));

// Démarrer le serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
