import React, { useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

interface CompoundInterestResult {
  principal: number;
  rate: number;
  time: number;
  compoundFrequency: number;
  finalAmount: number;
  compoundInterest: number;
}

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('12'); // Monthly by default
  const [result, setResult] = useState<CompoundInterestResult | null>(null);

  const frequencyOptions = [
    { value: '1', label: 'Annually' },
    { value: '2', label: 'Semi-annually' },
    { value: '4', label: 'Quarterly' },
    { value: '12', label: 'Monthly' },
    { value: '52', label: 'Weekly' },
    { value: '365', label: 'Daily' }
  ];

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100; // Convert percentage to decimal
    const t = parseFloat(time);
    const n = parseFloat(frequency);
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && !isNaN(n) && p > 0 && r >= 0 && t > 0 && n > 0) {
      // A = P(1 + r/n)^(nt)
      const finalAmount = p * Math.pow(1 + r / n, n * t);
      const compoundInterest = finalAmount - p;
      
      setResult({
        principal: p,
        rate: parseFloat(rate),
        time: t,
        compoundFrequency: n,
        finalAmount,
        compoundInterest
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Compound Interest Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Principal Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter principal amount"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter annual interest rate"
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Time Period (years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter time in years"
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Compound Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {frequencyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value} times per year)
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={calculateCompoundInterest}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Compound Interest
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Principal:</span> ${result.principal.toFixed(2)}</p>
                <p><span className="font-medium">Interest Rate:</span> {result.rate}% per year</p>
                <p><span className="font-medium">Time Period:</span> {result.time} years</p>
                <p><span className="font-medium">Compound Frequency:</span> {result.compoundFrequency} times per year</p>
                <p><span className="font-medium">Compound Interest:</span> ${result.compoundInterest.toFixed(2)}</p>
                <p><span className="font-medium">Final Amount:</span> ${result.finalAmount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Compound Interest Formula:</strong></p>
                <p>A = P(1 + r/n)^(nt)</p>
                <p>Where:</p>
                <ul className="ml-4 list-disc">
                  <li>A = Final Amount</li>
                  <li>P = Principal = ${result.principal}</li>
                  <li>r = Annual Interest Rate (decimal) = {(result.rate / 100).toFixed(4)}</li>
                  <li>n = Compound Frequency = {result.compoundFrequency}</li>
                  <li>t = Time = {result.time} years</li>
                </ul>
                <br />
                <p><strong>Calculation:</strong></p>
                <p>A = ${result.principal}(1 + {(result.rate / 100).toFixed(4)}/{result.compoundFrequency})^({result.compoundFrequency} × {result.time})</p>
                <p>A = ${result.principal}(1 + {(result.rate / 100 / result.compoundFrequency).toFixed(6)})^{(result.compoundFrequency * result.time).toFixed(0)}</p>
                <p>A = ${result.principal}({(1 + result.rate / 100 / result.compoundFrequency).toFixed(6)})^{(result.compoundFrequency * result.time).toFixed(0)}</p>
                <p>A = ${result.finalAmount.toFixed(2)}</p>
                <br />
                <p><strong>Compound Interest:</strong></p>
                <p>CI = Final Amount - Principal</p>
                <p>CI = ${result.finalAmount.toFixed(2)} - ${result.principal.toFixed(2)}</p>
                <p>CI = ${result.compoundInterest.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;