import React, { useState } from 'react';
import { Percent, DollarSign } from 'lucide-react';

interface DiscountResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
}

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [result, setResult] = useState<DiscountResult | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    
    if (!isNaN(price) && !isNaN(discount) && price > 0 && discount >= 0 && discount <= 100) {
      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;
      
      setResult({
        originalPrice: price,
        discountPercent: discount,
        discountAmount,
        finalPrice,
        savings: discountAmount
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Percent className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Discount Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Original Price ($)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter original price"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Discount Percentage (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter discount percentage"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        
        <button
          onClick={calculateDiscount}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Discount
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Original Price:</span> ${result.originalPrice.toFixed(2)}</p>
                <p><span className="font-medium">Discount Amount:</span> ${result.discountAmount.toFixed(2)}</p>
                <p><span className="font-medium">Final Price:</span> ${result.finalPrice.toFixed(2)}</p>
                <p><span className="font-medium">You Save:</span> ${result.savings.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Discount Amount Formula:</strong></p>
                <p>Discount = (Original Price × Discount %) ÷ 100</p>
                <p>Discount = (${result.originalPrice} × {result.discountPercent}%) ÷ 100</p>
                <p>Discount = ${result.discountAmount.toFixed(2)}</p>
                <br />
                <p><strong>Final Price Formula:</strong></p>
                <p>Final Price = Original Price - Discount Amount</p>
                <p>Final Price = ${result.originalPrice} - ${result.discountAmount.toFixed(2)}</p>
                <p>Final Price = ${result.finalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCalculator;