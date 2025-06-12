import React, { useEffect, useState } from 'react';

// const importAll = (r) => r.keys().map(r);
// const rawImages = importAll(require.context('../media/cvi_test_material', false, /\.(jpeg|jpg|png|gif)$/));

const rows = 4;
const cols = 4;
const totalCells = rows * cols;

// const colorOptions = ['red', 'blue', 'green', 'orange', 'purple', 'yellow', 'pink', 'grey'];
const imageOptions = {
  red: 'red.jpeg',
  blue: 'blue.jpeg',
  green: 'green.jpeg',
  orange: 'orange.jpeg',
  purple: 'purple.jpeg',
  yellow: 'yellow.jpeg',
  pink: 'pink.jpeg',
  grey:'grey.jpeg',
};

const getRandomElements = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const generateGrid = () => {
  const numPairs = 8;
  const selectedColors = getRandomElements(Object.keys(imageOptions), numPairs);

  const pairs = selectedColors.map((color) => ({
    color,
    image: imageOptions[color],
    matched: false,
  }));

  const grid = Array(totalCells).fill(null);
  const availableIndices = [...Array(totalCells).keys()];

  pairs.forEach((pair) => {
    const imageIndex = availableIndices.splice(
      Math.floor(Math.random() * availableIndices.length),
      1
    )[0];
    const colorIndex = availableIndices.splice(
      Math.floor(Math.random() * availableIndices.length),
      1
    )[0];

    grid[imageIndex] = { type: 'image', value: pair.image, color: pair.color, matched: false };
    grid[colorIndex] = { type: 'color', value: pair.color, matched: false };
  });

  return { grid, pairs };
};

const CVITest = ({ updateScoresCVI }) => {
  const [gridData, setGridData] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [wrongMatches, setWrongMatches] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const { grid, pairs } = generateGrid();
    setGridData(grid);
    setPairs(pairs);
  }, []);

  useEffect(() => {
    const trackMouse = (e) => {
      setMouseTrail((prev) => [...prev, e.clientX]);
    };
    document.addEventListener('mousemove', trackMouse);
    return () => document.removeEventListener('mousemove', trackMouse);
  }, []);

  const handleCellClick = (cell, index) => {
    if (!cell || cell.matched) return;

    if (!selectedCell) {
      setSelectedCell({ ...cell, index });
      return;
    }

    if (selectedCell.index === index) return;

    const isValidMatch =
      (selectedCell.type === 'image' && cell.type === 'color' && selectedCell.color === cell.value) ||
      (selectedCell.type === 'color' && cell.type === 'image' && selectedCell.value === cell.color);

    if (isValidMatch) {
      const newCount = matchedCount + 1;
      const newGrid = [...gridData];

      newGrid[selectedCell.index].matched = true;
      newGrid[index].matched = true;

      setGridData(newGrid);
      setMatchedCount(newCount);
      setCorrectMatches((prev) => prev + 1);
      setSelectedCell(null);

      if (newCount === pairs.length) {
        setIsCompleted(true);
      }
    } else {
      setWrongMatches((prev) => prev + 1);
      alert('Wrong match!');
      setSelectedCell(null);
    }
  };

  const calculateFocusDistribution = () => {
    const width = window.innerWidth;
    const sectionWidth = width / 3;

    let left = 0, center = 0, right = 0;

    mouseTrail.forEach((x) => {
      if (x < sectionWidth) left++;
      else if (x < 2 * sectionWidth) center++;
      else right++;
    });

    const total = left + center + right;

    console.log(left, center,right );

    return {
      left: total ? ((left / total) * 100).toFixed(2) + '%' : '0%',
      center: total ? ((center / total) * 100).toFixed(2) + '%' : '0%',
      right: total ? ((right / total) * 100).toFixed(2) + '%' : '0%',
    };

  };

  const handleSubmit = () => {
    if (!isCompleted) {
      alert('Please finish all matches before submitting.');
      return;
    }

    const focusedArea = mouseTrail.length;
    const focusDistribution = calculateFocusDistribution();

    updateScoresCVI({
      score: matchedCount,
      correct: correctMatches,
      wrong: wrongMatches,
      focusedArea,
      focusDistribution,
    });

    console.log('Focus Distribution:', focusDistribution);

    alert('Test submitted!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Color Vision Match Test</h1>

      <div className="grid grid-cols-4 gap-2">
        {gridData.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(cell, index)}
            className={`w-24 h-24 border-2 rounded flex items-center justify-center cursor-pointer transition
              ${cell?.matched ? 'opacity-50 cursor-default' : ''}
              ${selectedCell?.index === index ? 'border-blue-500' : 'border-gray-300'}
            `}
            style={{ backgroundColor: cell?.type === 'color' ? cell.value : 'white' }}
          >
           {cell?.type === 'image' && (
                <img
                  src={require(`../media/cvi_test_material/${cell.value}`)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}

          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-green-700 font-semibold">Correct Matches: {correctMatches}</p>
        <p className="text-red-600 font-semibold">Wrong Matches: {wrongMatches}</p>
      </div>

      {isCompleted && (
        <div className="text-center text-green-600 font-bold mt-4">
          All matches completed!
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CVITest;
