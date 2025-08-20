import React, { useState } from 'react';
import { Package, DollarSign } from 'lucide-react';

interface UnitPriceResult {
  totalPrice: number;
  quantity: number;
  unitPrice: number;
  unit: string;
}

const UnitPriceCalculator = () => {
  const [totalPrice, setTotalPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('item');
  const [result, setResult] = useState<UnitPriceResult | null>(null);

  const calculateUnitPrice = () => {
    const price = parseFloat(totalPrice);
    const qty = parseFloat(quantity);
    
    if (!isNaN(price) && !isNaN(qty) && price > 0 && qty > 0) {
      const unitPrice = price / qty;
      
      setResult({
        totalPrice: price,
        quantity: qty,
        unitPrice,
        unit
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Package className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Unit Price Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Total Price ($)</label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter total price"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter quantity"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Unit Type</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="item">Item</option>
            <option value="lb">Pound (lb)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="oz">Ounce (oz)</option>
            <option value="g">Gram (g)</option>
            <option value="L">Liter (L)</option>
            <option value="ml">Milliliter (ml)</option>
            <option value="ft">Foot (ft)</option>
            <option value="m">Meter (m)</option>
          </select>
        </div>
        
        <button
          onClick={calculateUnitPrice}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Unit Price
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Total Price:</span> ${result.totalPrice.toFixed(2)}</p>
                <p><span className="font-medium">Quantity:</span> {result.quantity} {result.unit}(s)</p>
                <p><span className="font-medium">Unit Price:</span> ${result.unitPrice.toFixed(4)} per {result.unit}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Unit Price Formula:</strong></p>
                <p>Unit Price = Total Price ÷ Quantity</p>
                <p>Unit Price = ${result.totalPrice} ÷ {result.quantity}</p>
                <p>Unit Price = ${result.unitPrice.toFixed(4)} per {result.unit}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitPriceCalculator;