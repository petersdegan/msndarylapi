
// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Adresse email invalide'], 
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire'],
        minlength: [8, 'Le mot de passe doit comporter au moins 8 caractères'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode pour comparer le mot de passe lors de la connexion
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
