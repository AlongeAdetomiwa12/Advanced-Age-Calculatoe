import React, { useState } from 'react';
import { BarChart, Plus, Minus } from 'lucide-react';

interface AverageResult {
  numbers: number[];
  sum: number;
  count: number;
  average: number;
  median: number;
  mode: number[];
}

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<AverageResult | null>(null);

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const calculateAverage = () => {
    const validNumbers = numbers
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));
    
    if (validNumbers.length > 0) {
      const sum = validNumbers.reduce((acc, num) => acc + num, 0);
      const average = sum / validNumbers.length;
      
      // Calculate median
      const sorted = [...validNumbers].sort((a, b) => a - b);
      const median = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];
      
      // Calculate mode
      const frequency: { [key: number]: number } = {};
      validNumbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
      });
      
      const maxFreq = Math.max(...Object.values(frequency));
      const mode = Object.keys(frequency)
        .filter(key => frequency[parseFloat(key)] === maxFreq)
        .map(key => parseFloat(key));
      
      setResult({
        numbers: validNumbers,
        sum,
        count: validNumbers.length,
        average,
        median,
        mode
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Average Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Enter Numbers</label>
          <div className="space-y-2">
            {numbers.map((number, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => updateNumber(index, e.target.value)}
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder={`Number ${index + 1}`}
                  step="0.01"
                />
                {numbers.length > 2 && (
                  <button
                    onClick={() => removeNumber(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={addNumber}
            className="mt-2 flex items-center space-x-2 text-purple-600 hover:bg-purple-50 p-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Number</span>
          </button>
        </div>
        
        <button
          onClick={calculateAverage}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Statistics
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Numbers:</span> {result.numbers.join(', ')}</p>
                <p><span className="font-medium">Count:</span> {result.count}</p>
                <p><span className="font-medium">Sum:</span> {result.sum.toFixed(2)}</p>
                <p><span className="font-medium">Average (Mean):</span> {result.average.toFixed(4)}</p>
                <p><span className="font-medium">Median:</span> {result.median.toFixed(4)}</p>
                <p><span className="font-medium">Mode:</span> {result.mode.length === result.numbers.length ? 'No mode' : result.mode.join(', ')}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Average (Mean) Formula:</strong></p>
                <p>Average = Sum of all numbers ÷ Count of numbers</p>
                <p>Average = {result.sum.toFixed(2)} ÷ {result.count}</p>
                <p>Average = {result.average.toFixed(4)}</p>
                <br />
                <p><strong>Sum Calculation:</strong></p>
                <p>Sum = {result.numbers.join(' + ')}</p>
                <p>Sum = {result.sum.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AverageCalculator;