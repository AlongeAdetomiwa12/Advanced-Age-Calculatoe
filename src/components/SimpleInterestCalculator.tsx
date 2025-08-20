import React, { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface SimpleInterestResult {
  principal: number;
  rate: number;
  time: number;
  interest: number;
  totalAmount: number;
}

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<SimpleInterestResult | null>(null);

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p > 0 && r >= 0 && t > 0) {
      const interest = (p * r * t) / 100;
      const totalAmount = p + interest;
      
      setResult({
        principal: p,
        rate: r,
        time: t,
        interest,
        totalAmount
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Simple Interest Calculator</h3>
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
          <label className="block text-sm font-medium mb-2">Interest Rate (% per year)</label>
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
        
        <button
          onClick={calculateSimpleInterest}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Simple Interest
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Principal:</span> ${result.principal.toFixed(2)}</p>
                <p><span className="font-medium">Interest Rate:</span> {result.rate}% per year</p>
                <p><span className="font-medium">Time Period:</span> {result.time} years</p>
                <p><span className="font-medium">Simple Interest:</span> ${result.interest.toFixed(2)}</p>
                <p><span className="font-medium">Total Amount:</span> ${result.totalAmount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Simple Interest Formula:</strong></p>
                <p>SI = (P × R × T) ÷ 100</p>
                <p>Where:</p>
                <ul className="ml-4 list-disc">
                  <li>P = Principal = ${result.principal}</li>
                  <li>R = Rate = {result.rate}% per year</li>
                  <li>T = Time = {result.time} years</li>
                </ul>
                <br />
                <p><strong>Calculation:</strong></p>
                <p>SI = (${result.principal} × {result.rate} × {result.time}) ÷ 100</p>
                <p>SI = {(result.principal * result.rate * result.time).toFixed(2)} ÷ 100</p>
                <p>SI = ${result.interest.toFixed(2)}</p>
                <br />
                <p><strong>Total Amount:</strong></p>
                <p>Total = Principal + Simple Interest</p>
                <p>Total = ${result.principal} + ${result.interest.toFixed(2)}</p>
                <p>Total = ${result.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleInterestCalculator;