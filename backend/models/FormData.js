const mongoose = require('mongoose');

const formDataSchema = mongoose.Schema({
    name: { type: String, required: true },
    school: { type: String, required: true },
    rollNumber: { type: String, required: true },
    fleschScore: { type: Number, required: true },
    ipScore: { type: [Number], required: true },
    wmcScore: { type: Number, required: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('FormData', formDataSchema);
