import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

interface RatioResult {
  valueA: number;
  valueB: number;
  ratio: string;
  decimal: number;
  percentage: number;
  simplified: string;
}

const RatioCalculator = () => {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [result, setResult] = useState<RatioResult | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculateRatio = () => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    
    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      const decimal = a / b;
      const percentage = (a / b) * 100;
      
      // Simplify ratio
      const gcdValue = gcd(Math.round(a * 1000), Math.round(b * 1000));
      const simplifiedA = Math.round(a * 1000) / gcdValue;
      const simplifiedB = Math.round(b * 1000) / gcdValue;
      
      setResult({
        valueA: a,
        valueB: b,
        ratio: `${a}:${b}`,
        decimal,
        percentage,
        simplified: `${simplifiedA}:${simplifiedB}`
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Ratio Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Value (A)</label>
          <input
            type="number"
            value={valueA}
            onChange={(e) => setValueA(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter first value"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Second Value (B)</label>
          <input
            type="number"
            value={valueB}
            onChange={(e) => setValueB(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter second value"
            min="0"
            step="0.01"
          />
        </div>
        
        <button
          onClick={calculateRatio}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Ratio
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Original Ratio:</span> {result.ratio}</p>
                <p><span className="font-medium">Simplified Ratio:</span> {result.simplified}</p>
                <p><span className="font-medium">Decimal Form:</span> {result.decimal.toFixed(4)}</p>
                <p><span className="font-medium">Percentage:</span> {result.percentage.toFixed(2)}%</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Ratio Formula:</strong></p>
                <p>Ratio of A:B = A/B</p>
                <p>Ratio = {result.valueA}/{result.valueB}</p>
                <p>Ratio = {result.decimal.toFixed(4)}</p>
                <br />
                <p><strong>Percentage Formula:</strong></p>
                <p>Percentage = (A/B) × 100</p>
                <p>Percentage = ({result.valueA}/{result.valueB}) × 100</p>
                <p>Percentage = {result.percentage.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatioCalculator;