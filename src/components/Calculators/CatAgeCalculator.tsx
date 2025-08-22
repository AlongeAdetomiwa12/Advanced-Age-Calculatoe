import React, { useState } from 'react'
import { Heart } from 'lucide-react'

interface CatAgeResult {
  catYears: number
  humanAge: number
  calculation: string
  lifeStage: string
}

const CatAgeCalculator = () => {
  const [catYears, setCatYears] = useState('')
  const [result, setResult] = useState<CatAgeResult | null>(null)

  const getLifeStage = (years: number): string => {
    if (years < 1) return 'Kitten'
    if (years < 2) return 'Young Adult'
    if (years < 7) return 'Adult'
    if (years < 11) return 'Mature'
    if (years < 15) return 'Senior'
    return 'Geriatric'
  }

  const calculateCatAge = () => {
    const years = parseFloat(catYears)
    
    if (!isNaN(years) && years > 0) {
      let humanAge = 0
      let calculation = ''

      if (years < 1) {
        // Kitten formula (approximate)
        humanAge = years * 15
        calculation = `${years} × 15 = ${humanAge.toFixed(1)} (kitten formula)`
      } else if (years === 1) {
        humanAge = 15
        calculation = 'Year 1 = 15 human years'
      } else if (years === 2) {
        humanAge = 24
        calculation = 'Year 1 (15) + Year 2 (9) = 24 human years'
      } else {
        // Formula: HumanAge = 24 + 4(y - 2) for cats aged y ≥ 2
        humanAge = 24 + 4 * (years - 2)
        calculation = `24 + 4 × (${years} - 2) = 24 + 4 × ${years - 2} = ${humanAge}`
      }

      const lifeStage = getLifeStage(years)

      setResult({
        catYears: years,
        humanAge,
        calculation,
        lifeStage
      })
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Cat Age Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Cat's Age (years)</label>
          <input
            type="number"
            value={catYears}
            onChange={(e) => setCatYears(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter cat's age in years"
            min="0"
            max="30"
            step="0.1"
          />
        </div>
        
        <button
          onClick={calculateCatAge}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Human Age
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Cat Age Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Cat's Age:</span> {result.catYears} years</p>
                <p><span className="font-medium">Human Equivalent:</span> {result.humanAge.toFixed(1)} years</p>
                <p><span className="font-medium">Life Stage:</span> {result.lifeStage}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Cat Age Formula</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Cat Age Conversion:</strong></p>
                <p>• Year 1 = 15 human years</p>
                <p>• Year 2 = +9 human years (total 24)</p>
                <p>• Each additional year = +4 human years</p>
                <br />
                <p><strong>Formula for cats ≥ 2 years:</strong></p>
                <p>Human Age = 24 + 4 × (Cat Years - 2)</p>
                <br />
                <p><strong>Your Calculation:</strong></p>
                <p>{result.calculation}</p>
                <br />
                <p><strong>Life Stages:</strong></p>
                <p>• Kitten: 0-1 years</p>
                <p>• Young Adult: 1-2 years</p>
                <p>• Adult: 2-7 years</p>
                <p>• Mature: 7-11 years</p>
                <p>• Senior: 11-15 years</p>
                <p>• Geriatric: 15+ years</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CatAgeCalculator