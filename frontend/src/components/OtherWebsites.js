import React from "react";

const OtherWebsites = () => (
  <section className="my-8 text-center">
    <h2 className="text-4xl font-bold mb-4">Other Websites</h2>
    <p className="text-lg text-justify mb-2">
      Discover similar educational resources that align with our mission and goals.
    </p>
    <ul className="list-none p-0 text-justify">
      <li className="mb-4">
        <a href="https://www.lumosity.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Lumosity:
        </a>
        Brain training games to improve memory, attention, and problem-solving skills.
      </li>
      <li className="mb-4">
        <a href="https://www.elevate.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Elevate:
        </a>
        Personalized brain training to improve focus, reading comprehension, and writing skills.
      </li>
      <li className="mb-4">
        <a href="https://www.duolingo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Duolingo:
        </a>
        Learn a new language to boost cognitive flexibility and memory.
      </li>
      <li className="mb-4">
        <a href="https://www.chess.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Chess.com:
        </a>
        Play chess to enhance strategic thinking, problem-solving, and memory.
      </li>
      <li className="mb-4">
        <a href="https://www.sudoku.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Sudoku.com:
        </a>
        Solve Sudoku puzzles to improve logical reasoning, concentration, and memory.
      </li>
    </ul>
  </section>
);

export default OtherWebsites;