import React, { useState } from 'react';
import { Receipt, DollarSign } from 'lucide-react';

interface SalesTaxResult {
  price: number;
  taxRate: number;
  taxAmount: number;
  finalPrice: number;
}

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<SalesTaxResult | null>(null);

  const calculateSalesTax = () => {
    const priceValue = parseFloat(price);
    const taxValue = parseFloat(taxRate);
    
    if (!isNaN(priceValue) && !isNaN(taxValue) && priceValue > 0 && taxValue >= 0) {
      const taxAmount = (priceValue * taxValue) / 100;
      const finalPrice = priceValue + taxAmount;
      
      setResult({
        price: priceValue,
        taxRate: taxValue,
        taxAmount,
        finalPrice
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Receipt className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Sales Tax Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Before Tax ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter price before tax"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter tax rate"
            min="0"
            step="0.1"
          />
        </div>
        
        <button
          onClick={calculateSalesTax}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Sales Tax
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Price Before Tax:</span> ${result.price.toFixed(2)}</p>
                <p><span className="font-medium">Tax Rate:</span> {result.taxRate}%</p>
                <p><span className="font-medium">Tax Amount:</span> ${result.taxAmount.toFixed(2)}</p>
                <p><span className="font-medium">Final Price:</span> ${result.finalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Tax Amount Formula:</strong></p>
                <p>Tax = (Price × Tax Rate) ÷ 100</p>
                <p>Tax = (${result.price} × {result.taxRate}%) ÷ 100</p>
                <p>Tax = ${result.taxAmount.toFixed(2)}</p>
                <br />
                <p><strong>Final Price Formula:</strong></p>
                <p>Final Price = Price + Tax</p>
                <p>Final Price = ${result.price} + ${result.taxAmount.toFixed(2)}</p>
                <p>Final Price = ${result.finalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTaxCalculator;