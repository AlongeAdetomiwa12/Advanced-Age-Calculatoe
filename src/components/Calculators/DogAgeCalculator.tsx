import React, { useState } from 'react'
import { Heart } from 'lucide-react'

interface DogAgeResult {
  dogYears: number
  breed: string
  humanAge: number
  method: string
  calculation: string
}

const DogAgeCalculator = () => {
  const [dogYears, setDogYears] = useState('')
  const [breed, setBreed] = useState('medium')
  const [method, setMethod] = useState('logarithmic')
  const [result, setResult] = useState<DogAgeResult | null>(null)

  const calculateDogAge = () => {
    const years = parseFloat(dogYears)
    
    if (!isNaN(years) && years > 0) {
      let humanAge = 0
      let calculation = ''

      if (method === 'logarithmic') {
        // Modern logarithmic formula: HumanAge ≈ 16 ln(DogYears) + 31
        if (years >= 1) {
          humanAge = 16 * Math.log(years) + 31
          calculation = `16 × ln(${years}) + 31 = 16 × ${Math.log(years).toFixed(3)} + 31 = ${humanAge.toFixed(1)}`
        } else {
          humanAge = years * 15 // For puppies under 1 year
          calculation = `${years} × 15 = ${humanAge.toFixed(1)} (puppy formula)`
        }
      } else {
        // Traditional rule of thumb
        if (years === 1) {
          humanAge = 15
          calculation = 'Year 1 = 15 human years'
        } else if (years === 2) {
          humanAge = 24
          calculation = 'Year 1 (15) + Year 2 (9) = 24 human years'
        } else if (years > 2) {
          const baseAge = 24 // First 2 years
          const additionalYears = years - 2
          let yearlyRate = 5 // Default for small/medium breeds
          
          if (breed === 'large') {
            yearlyRate = 6
          }
          
          humanAge = baseAge + (additionalYears * yearlyRate)
          calculation = `24 (first 2 years) + ${additionalYears} × ${yearlyRate} = ${humanAge}`
        }
      }

      setResult({
        dogYears: years,
        breed,
        humanAge,
        method,
        calculation
      })
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Dog Age Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Dog's Age (years)</label>
          <input
            type="number"
            value={dogYears}
            onChange={(e) => setDogYears(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter dog's age in years"
            min="0"
            max="30"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Breed Size</label>
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="small">Small Breed (under 25 lbs)</option>
            <option value="medium">Medium Breed (25-60 lbs)</option>
            <option value="large">Large/Giant Breed (over 60 lbs)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Calculation Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="logarithmic">Modern Logarithmic (Epigenetic-based)</option>
            <option value="traditional">Traditional Rule of Thumb</option>
          </select>
        </div>
        
        <button
          onClick={calculateDogAge}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Human Age
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Dog Age Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Dog's Age:</span> {result.dogYears} years</p>
                <p><span className="font-medium">Breed Size:</span> {result.breed.charAt(0).toUpperCase() + result.breed.slice(1)}</p>
                <p><span className="font-medium">Human Equivalent:</span> {result.humanAge.toFixed(1)} years</p>
                <p><span className="font-medium">Method:</span> {result.method === 'logarithmic' ? 'Modern Logarithmic' : 'Traditional Rule'}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Calculation Formula</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                {result.method === 'logarithmic' ? (
                  <>
                    <p><strong>Modern Logarithmic Formula:</strong></p>
                    <p>Human Age ≈ 16 × ln(Dog Years) + 31 (for dogs ≥ 1 year)</p>
                    <p>This formula is based on epigenetic research comparing DNA methylation patterns.</p>
                    <br />
                    <p><strong>Your Calculation:</strong></p>
                    <p>{result.calculation}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Traditional Rule of Thumb:</strong></p>
                    <p>• Year 1 = 15 human years</p>
                    <p>• Year 2 = +9 human years (total 24)</p>
                    <p>• Each additional year = +{breed === 'large' ? '6' : '5'} human years ({breed} breed)</p>
                    <br />
                    <p><strong>Your Calculation:</strong></p>
                    <p>{result.calculation}</p>
                  </>
                )}
                <br />
                <p><strong>Note:</strong> These are estimates. Individual dogs may age differently based on genetics, health, and lifestyle factors.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DogAgeCalculator