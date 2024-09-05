// routes/annonceRoutes.js
const express = require('express');
const router = express.Router();
const Annonce = require('../models/annonce');

// Créer une nouvelle annonce
router.post('/', async (req, res) => {
    try {
        const { titre, description,category, images, author } = req.body;
        const newAnnonce = new Annonce({ titre, description, category, images, author });
        await newAnnonce.save();
        res.status(201).json(newAnnonce);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Récupérer toutes les annonces
router.get('/', async (req, res) => {
    try {
        const annonces = await Annonce.find().populate('author', 'name email'); // Peupler l'auteur avec ses informations
        res.json(annonces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer une annonce par son ID
router.get('/:id', async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id).populate('author', 'name email');
        if (!annonce) return res.status(404).json({ message: 'Annonce non trouvée' });
        res.json(annonce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Récupérer toutes les annonces avec possibilité de filtrer par titre, description ou catégorie
router.get('/', async (req, res) => {
    try {
        const { titre, description, category } = req.query;
        
        // Construire le filtre basé sur les paramètres de requête
        let filter = {};
        if (titre) {
            filter.titre = { $regex: new RegExp(titre, 'i') }; // 'i' pour une recherche insensible à la casse
        }
        if (description) {
            filter.description = { $regex: new RegExp(description, 'i') };
        }
        if (category) {
            filter.category = category;
        }

        // Trouver les annonces avec le filtre
        const annonces = await Annonce.find(filter).populate('author', 'name email');
        res.json(annonces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Mettre à jour une annonce
router.put('/:id', async (req, res) => {
    try {
        const updatedAnnonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAnnonce) return res.status(404).json({ message: 'Annonce non trouvée' });
        res.json(updatedAnnonce);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une annonce
router.delete('/:id', async (req, res) => {
    try {
        const deletedAnnonce = await Annonce.findByIdAndDelete(req.params.id);
        if (!deletedAnnonce) return res.status(404).json({ message: 'Annonce non trouvée' });
        res.json({ message: 'Annonce supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
