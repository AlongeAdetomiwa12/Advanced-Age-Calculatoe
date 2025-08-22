import React, { useState } from 'react'
import { Heart, TrendingUp } from 'lucide-react'

interface LifeExpectancyResult {
  currentAge: number
  gender: string
  country: string
  lifeExpectancy: number
  remainingYears: number
  estimatedDeathYear: number
}

const LifeExpectancyCalculator = () => {
  const [currentAge, setCurrentAge] = useState('')
  const [gender, setGender] = useState('male')
  const [country, setCountry] = useState('US')
  const [result, setResult] = useState<LifeExpectancyResult | null>(null)

  // Simplified life expectancy data (in a real app, this would come from actuarial tables)
  const lifeExpectancyData: { [key: string]: { male: number, female: number } } = {
    'US': { male: 76.3, female: 81.1 },
    'UK': { male: 79.4, female: 83.1 },
    'CA': { male: 80.9, female: 84.7 },
    'AU': { male: 80.9, female: 85.0 },
    'JP': { male: 81.6, female: 87.7 },
    'DE': { male: 78.9, female: 83.6 },
    'FR': { male: 79.7, female: 85.6 }
  }

  const calculateLifeExpectancy = () => {
    const age = parseFloat(currentAge)
    
    if (!isNaN(age) && age >= 0 && age <= 120) {
      const baseLifeExpectancy = lifeExpectancyData[country]?.[gender as 'male' | 'female'] || 78
      
      // Adjust for current age (simplified actuarial calculation)
      // In reality, this would use complex life tables with mortality rates qx
      const adjustedLifeExpectancy = baseLifeExpectancy + (age * 0.1) // Simplified adjustment
      const remainingYears = Math.max(0, adjustedLifeExpectancy - age)
      const estimatedDeathYear = new Date().getFullYear() + Math.round(remainingYears)
      
      setResult({
        currentAge: age,
        gender,
        country,
        lifeExpectancy: adjustedLifeExpectancy,
        remainingYears,
        estimatedDeathYear
      })
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Life Expectancy Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your current age"
            min="0"
            max="120"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="JP">Japan</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
          </select>
        </div>
        
        <button
          onClick={calculateLifeExpectancy}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Life Expectancy
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Life Expectancy Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Current Age:</span> {result.currentAge} years</p>
                <p><span className="font-medium">Estimated Life Expectancy:</span> {result.lifeExpectancy.toFixed(1)} years</p>
                <p><span className="font-medium">Remaining Years:</span> {result.remainingYears.toFixed(1)} years</p>
                <p><span className="font-medium">Estimated Year:</span> {result.estimatedDeathYear}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Actuarial Formula (Simplified)</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Life Table Method:</strong></p>
                <p>Survivors at age x: l(x+1) = l(x)(1 - qx), l₀ = 100,000</p>
                <p>Person-years lived: Lx ≈ (lx + lx+1)/2</p>
                <p>Total future years: Tx = Σ Lk from k=x to ∞</p>
                <p>Life expectancy: ex = Tx / lx</p>
                <br />
                <p><strong>Current Calculation:</strong></p>
                <p>Base life expectancy ({country}, {gender}): {lifeExpectancyData[country]?.[gender as 'male' | 'female']} years</p>
                <p>Age adjustment: +{(result.currentAge * 0.1).toFixed(1)} years</p>
                <p>Adjusted expectancy: {result.lifeExpectancy.toFixed(1)} years</p>
                <p>Remaining years: {result.lifeExpectancy.toFixed(1)} - {result.currentAge} = {result.remainingYears.toFixed(1)} years</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LifeExpectancyCalculator