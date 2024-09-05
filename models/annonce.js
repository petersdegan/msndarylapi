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
        enum: ['Entreprise', 'Hotel', 'Portofolio', 'Restauration', 'Ventes', 'Autres'], // Exemple de catégories
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
    },
}, { timestamps: true });

module.exports = mongoose.model('Annonce', annonceSchema);
