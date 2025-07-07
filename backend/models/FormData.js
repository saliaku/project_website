const mongoose = require('mongoose');

const formDataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    school: { type: String, required: true },
    rollNumber: { type: String, required: true },
    fleschScore: { type: Number, required: true },
    ipScore: {
      image: { type: Number, required: true, default: 0 },
      audio: { type: Number, required: true, default: 0 },
      text: { type: Number, required: true, default: 0 },
    },
    wmcScore: {
      image: { type: Number, required: true, default: 0 },
      audio: { type: Number, required: true, default: 0 },
      text: { type: Number, required: true, default: 0 },
    },
    
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('FormData', formDataSchema);
