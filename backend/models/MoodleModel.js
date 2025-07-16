const mongoose = require('mongoose');

const moodleSchema = mongoose.Schema(
  {
    cmid: { type: Number, required: true },
    userId: { type: Number, required: true },
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
    vatScore:{
    v : { type: Number, required: true, default: 0 },
    a : { type: Number, required: true, default: 0 },
    t : { type: Number, required: true, default: 0 }
    },
    cviScore:{
    finalScore : { type: Number, required: true, default: 0 },
    totalClicks : { type: Number, required: true, default: 0 },
    wrongSelect : { type: Number, required: true, default: 0 },
    finalQuadrantCode : { type: Number, required: true, default: 10 }
    },
    auditoryIssue : { type: String, required: true },
    visualIssue : { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('MoodleModel', moodleSchema);
