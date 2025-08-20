import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface ConversionResult {
  numerator: number;
  denominator: number;
  decimal: number;
  percentage: number;
  fraction: string;
}

const FractionToDecimalConverter = () => {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convertFraction = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      const decimal = num / den;
      const percentage = decimal * 100;
      
      setResult({
        numerator: num,
        denominator: den,
        decimal,
        percentage,
        fraction: `${num}/${den}`
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Fraction to Decimal Converter</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Numerator (Top Number)</label>
          <input
            type="number"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter numerator"
            step="1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Denominator (Bottom Number)</label>
          <input
            type="number"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter denominator"
            step="1"
            min="1"
          />
        </div>
        
        <button
          onClick={convertFraction}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Convert to Decimal
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Fraction:</span> {result.fraction}</p>
                <p><span className="font-medium">Decimal:</span> {result.decimal}</p>
                <p><span className="font-medium">Percentage:</span> {result.percentage.toFixed(2)}%</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Decimal Conversion Formula:</strong></p>
                <p>Decimal = Numerator ÷ Denominator</p>
                <p>Decimal = {result.numerator} ÷ {result.denominator}</p>
                <p>Decimal = {result.decimal}</p>
                <br />
                <p><strong>Percentage Conversion:</strong></p>
                <p>Percentage = Decimal × 100</p>
                <p>Percentage = {result.decimal} × 100</p>
                <p>Percentage = {result.percentage.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FractionToDecimalConverter;