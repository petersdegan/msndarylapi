// models/annonce.js
const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est obligatoire'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire'],
    },

    category: {
        type: String,
        required: [true, 'La catégorie est obligatoire'],
        enum: ['Entreprise', 'Hotel', 'Portofolio', 'Restauration', 'Ventes', 'Autres'], // Exemple de catégories
    },
    images: {
        type: [String], // Tableau de chaînes pour les URLs des images
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Référence à l'utilisateur (auteur) de l'annonce
        required: [true, "L'auteur est obligatoire"],
    },
}, { timestamps: true });

module.exports = mongoose.model('Annonce', annonceSchema);
