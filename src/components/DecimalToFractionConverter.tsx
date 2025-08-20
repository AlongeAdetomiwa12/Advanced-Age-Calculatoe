import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface FractionResult {
  decimal: number;
  numerator: number;
  denominator: number;
  fraction: string;
  simplified: string;
}

const DecimalToFractionConverter = () => {
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState<FractionResult | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const convertDecimal = () => {
    const dec = parseFloat(decimal);
    
    if (!isNaN(dec)) {
      // Convert decimal to fraction
      const decimalPlaces = (decimal.split('.')[1] || '').length;
      const denominator = Math.pow(10, decimalPlaces);
      const numerator = dec * denominator;
      
      // Simplify fraction
      const gcdValue = gcd(Math.abs(numerator), denominator);
      const simplifiedNum = numerator / gcdValue;
      const simplifiedDen = denominator / gcdValue;
      
      setResult({
        decimal: dec,
        numerator: Math.round(numerator),
        denominator,
        fraction: `${Math.round(numerator)}/${denominator}`,
        simplified: `${Math.round(simplifiedNum)}/${Math.round(simplifiedDen)}`
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Decimal to Fraction Converter</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Decimal Number</label>
          <input
            type="number"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter decimal number (e.g., 0.75)"
            step="0.001"
          />
        </div>
        
        <button
          onClick={convertDecimal}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Convert to Fraction
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Decimal:</span> {result.decimal}</p>
                <p><span className="font-medium">Original Fraction:</span> {result.fraction}</p>
                <p><span className="font-medium">Simplified Fraction:</span> {result.simplified}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Conversion Process</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Step 1:</strong> Count decimal places</p>
                <p>Decimal places in {result.decimal}: {(decimal.split('.')[1] || '').length}</p>
                <br />
                <p><strong>Step 2:</strong> Create fraction</p>
                <p>Numerator = {result.decimal} × {result.denominator} = {result.numerator}</p>
                <p>Denominator = 10^{(decimal.split('.')[1] || '').length} = {result.denominator}</p>
                <p>Fraction = {result.fraction}</p>
                <br />
                <p><strong>Step 3:</strong> Simplify by finding GCD</p>
                <p>Simplified = {result.simplified}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecimalToFractionConverter;