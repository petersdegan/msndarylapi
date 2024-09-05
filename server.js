
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');






dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Autorise toutes les origines par défaut
app.use(express.json()); // Permet de parser les requêtes JSON

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
