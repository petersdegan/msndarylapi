// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète'; 
const jwt = require('jsonwebtoken');



// Créer un nouvel utilisateur
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Connexion de l'utilisateur
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' } // Le token expire après 24h heure, ajustez selon vos besoins
        );

        // Répondre avec le token et les informations de l'utilisateur
        res.json({ message: 'Connexion réussie', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les utilisateurs (exemple, utile pour un admin)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
