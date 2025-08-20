import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PercentageChangeResult {
  oldValue: number;
  newValue: number;
  change: number;
  percentageChange: number;
  isIncrease: boolean;
}

const PercentageChangeCalculator = () => {
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState<PercentageChangeResult | null>(null);

  const calculatePercentageChange = () => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    
    if (!isNaN(old) && !isNaN(newVal) && old !== 0) {
      const change = newVal - old;
      const percentageChange = (change / old) * 100;
      const isIncrease = change > 0;
      
      setResult({
        oldValue: old,
        newValue: newVal,
        change,
        percentageChange,
        isIncrease
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Percentage Increase/Decrease Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Original Value</label>
          <input
            type="number"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter original value"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">New Value</label>
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter new value"
            step="0.01"
          />
        </div>
        
        <button
          onClick={calculatePercentageChange}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Percentage Change
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className={`p-4 rounded-lg border ${result.isIncrease ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center space-x-2 mb-3">
                {result.isIncrease ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <h4 className={`font-semibold ${result.isIncrease ? 'text-green-800' : 'text-red-800'}`}>
                  {result.isIncrease ? 'Increase' : 'Decrease'} Results
                </h4>
              </div>
              <div className={`space-y-2 ${result.isIncrease ? 'text-green-700' : 'text-red-700'}`}>
                <p><span className="font-medium">Original Value:</span> {result.oldValue}</p>
                <p><span className="font-medium">New Value:</span> {result.newValue}</p>
                <p><span className="font-medium">Change:</span> {result.change > 0 ? '+' : ''}{result.change.toFixed(2)}</p>
                <p><span className="font-medium">Percentage Change:</span> {result.percentageChange > 0 ? '+' : ''}{result.percentageChange.toFixed(2)}%</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Percentage Change Formula:</strong></p>
                <p>Change % = ((New Value - Old Value) / Old Value) × 100</p>
                <p>Change % = (({result.newValue} - {result.oldValue}) / {result.oldValue}) × 100</p>
                <p>Change % = ({result.change.toFixed(2)} / {result.oldValue}) × 100</p>
                <p>Change % = {result.percentageChange.toFixed(2)}%</p>
                <br />
                <p><strong>Interpretation:</strong></p>
                <p>
                  {result.isIncrease 
                    ? `The value increased by ${Math.abs(result.percentageChange).toFixed(2)}%`
                    : `The value decreased by ${Math.abs(result.percentageChange).toFixed(2)}%`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentageChangeCalculator;