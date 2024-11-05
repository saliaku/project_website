import React, { useState } from 'react';

const ReadabilityAssessment = () => {
  const [text, setText] = useState('');
  const [score, setScore] = useState(null);

  const calculateReadability = (text) => {
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    console.log(words);
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    console.log(sentences);
    const syllables = text.split(/\s+/).reduce((count, word) => count + countSyllables(word), 0);
    console.log(syllables);
    // Flesch Reading Ease formula
    const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    console.log(fleschScore);
    return Math.round(fleschScore);
  };

  const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1; // simple rule for short words
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const readabilityScore = calculateReadability(text);
    setScore(readabilityScore);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Readability Assessment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="8"
          className="w-full p-2 border rounded-lg shadow"
          placeholder="Write about a topic of your choice..."
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Assess Readability
        </button>
      </form>

      {score !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Readability Score: {score}</h2>
          <p className="text-gray-600">
            {score > 60 ? "Your text is easily understandable by 13- to 15-year-old students." : 
             score > 30 ? "Your text may be difficult for some readers." : 
             "Your text is very complex and may be hard for most readers."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadabilityAssessment;
