import React, { useState } from 'react'
import { Activity, Plus, Minus } from 'lucide-react'

interface Biomarker {
  name: string
  value: string
  referenceValue: number
  standardDeviation: number
  weight: number
}

interface BiologicalAgeResult {
  chronologicalAge: number
  biologicalAge: number
  ageGap: number
  compositeIndex: number
  biomarkers: Biomarker[]
}

const BiologicalAgeCalculator = () => {
  const [chronologicalAge, setChronologicalAge] = useState('')
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([
    { name: 'Systolic BP', value: '', referenceValue: 120, standardDeviation: 15, weight: 0.2 },
    { name: 'BMI', value: '', referenceValue: 25, standardDeviation: 4, weight: 0.15 },
    { name: 'Resting HR', value: '', referenceValue: 70, standardDeviation: 12, weight: 0.15 },
    { name: 'Glucose', value: '', referenceValue: 90, standardDeviation: 10, weight: 0.2 },
    { name: 'Cholesterol', value: '', referenceValue: 200, standardDeviation: 30, weight: 0.15 },
    { name: 'HbA1c', value: '', referenceValue: 5.5, standardDeviation: 0.5, weight: 0.15 }
  ])
  const [result, setResult] = useState<BiologicalAgeResult | null>(null)

  const addBiomarker = () => {
    setBiomarkers([...biomarkers, {
      name: '',
      value: '',
      referenceValue: 0,
      standardDeviation: 1,
      weight: 0.1
    }])
  }

  const removeBiomarker = (index: number) => {
    if (biomarkers.length > 1) {
      setBiomarkers(biomarkers.filter((_, i) => i !== index))
    }
  }

  const updateBiomarker = (index: number, field: keyof Biomarker, value: string | number) => {
    const newBiomarkers = [...biomarkers]
    newBiomarkers[index] = { ...newBiomarkers[index], [field]: value }
    setBiomarkers(newBiomarkers)
  }

  const calculateBiologicalAge = () => {
    const age = parseFloat(chronologicalAge)
    
    if (!isNaN(age) && age > 0) {
      const validBiomarkers = biomarkers.filter(b => 
        b.value && !isNaN(parseFloat(b.value)) && b.referenceValue > 0 && b.standardDeviation > 0
      )

      if (validBiomarkers.length > 0) {
        // Calculate standardized scores: zi = (Xi - μi) / σi
        let compositeIndex = 0
        let totalWeight = 0

        validBiomarkers.forEach(biomarker => {
          const value = parseFloat(biomarker.value)
          const standardizedScore = (value - biomarker.referenceValue) / biomarker.standardDeviation
          compositeIndex += biomarker.weight * standardizedScore
          totalWeight += biomarker.weight
        })

        // Normalize by total weight
        compositeIndex = compositeIndex / totalWeight

        // Map to biological age using linear model: BioAge = β₀ + β₁ * I
        // Using simplified coefficients (in reality, these would be derived from research)
        const beta0 = age // Base age
        const beta1 = 2.5 // Age change per standard deviation
        const biologicalAge = beta0 + beta1 * compositeIndex

        const ageGap = biologicalAge - age

        setResult({
          chronologicalAge: age,
          biologicalAge,
          ageGap,
          compositeIndex,
          biomarkers: validBiomarkers
        })
      }
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Biological Age Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Chronological Age</label>
          <input
            type="number"
            value={chronologicalAge}
            onChange={(e) => setChronologicalAge(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your chronological age"
            min="18"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Biomarkers</label>
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600">
              <div className="col-span-3">Biomarker</div>
              <div className="col-span-2">Your Value</div>
              <div className="col-span-2">Reference</div>
              <div className="col-span-2">Std Dev</div>
              <div className="col-span-2">Weight</div>
              <div className="col-span-1"></div>
            </div>
            {biomarkers.map((biomarker, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <input
                  type="text"
                  value={biomarker.name}
                  onChange={(e) => updateBiomarker(index, 'name', e.target.value)}
                  className="col-span-3 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Biomarker name"
                />
                <input
                  type="number"
                  value={biomarker.value}
                  onChange={(e) => updateBiomarker(index, 'value', e.target.value)}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Value"
                  step="0.1"
                />
                <input
                  type="number"
                  value={biomarker.referenceValue}
                  onChange={(e) => updateBiomarker(index, 'referenceValue', parseFloat(e.target.value))}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Ref"
                  step="0.1"
                />
                <input
                  type="number"
                  value={biomarker.standardDeviation}
                  onChange={(e) => updateBiomarker(index, 'standardDeviation', parseFloat(e.target.value))}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="SD"
                  step="0.1"
                />
                <input
                  type="number"
                  value={biomarker.weight}
                  onChange={(e) => updateBiomarker(index, 'weight', parseFloat(e.target.value))}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Weight"
                  step="0.01"
                  min="0"
                  max="1"
                />
                {biomarkers.length > 1 && (
                  <button
                    onClick={() => removeBiomarker(index)}
                    className="col-span-1 p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={addBiomarker}
            className="mt-2 flex items-center space-x-2 text-purple-600 hover:bg-purple-50 p-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Biomarker</span>
          </button>
        </div>
        
        <button
          onClick={calculateBiologicalAge}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Biological Age
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className={`p-4 rounded-lg border ${
              result.ageGap > 0 
                ? 'bg-red-50 border-red-200' 
                : result.ageGap < 0 
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                result.ageGap > 0 
                  ? 'text-red-800' 
                  : result.ageGap < 0 
                    ? 'text-green-800'
                    : 'text-gray-800'
              }`}>
                Biological Age Results
              </h4>
              <div className={`space-y-2 ${
                result.ageGap > 0 
                  ? 'text-red-700' 
                  : result.ageGap < 0 
                    ? 'text-green-700'
                    : 'text-gray-700'
              }`}>
                <p><span className="font-medium">Chronological Age:</span> {result.chronologicalAge} years</p>
                <p><span className="font-medium">Biological Age:</span> {result.biologicalAge.toFixed(1)} years</p>
                <p><span className="font-medium">Age Gap:</span> {result.ageGap > 0 ? '+' : ''}{result.ageGap.toFixed(1)} years</p>
                <p><span className="font-medium">Composite Index:</span> {result.compositeIndex.toFixed(3)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Calculation Formula</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Biological Age Model:</strong></p>
                <p>1. Standardize biomarkers: zi = (Xi - μi) / σi</p>
                <p>2. Composite index: I = Σ(wi × zi) / Σwi</p>
                <p>3. Map to age: BioAge = β₀ + β₁ × I</p>
                <p>4. Age gap: Gap = BioAge - Chronological Age</p>
                <br />
                <p><strong>Your Calculation:</strong></p>
                <p>Composite Index: {result.compositeIndex.toFixed(3)}</p>
                <p>BioAge = {result.chronologicalAge} + 2.5 × {result.compositeIndex.toFixed(3)}</p>
                <p>BioAge = {result.biologicalAge.toFixed(1)} years</p>
                <p>Age Gap = {result.biologicalAge.toFixed(1)} - {result.chronologicalAge} = {result.ageGap.toFixed(1)} years</p>
                <br />
                <p><strong>Biomarker Breakdown:</strong></p>
                {result.biomarkers.map((biomarker, index) => {
                  const value = parseFloat(biomarker.value)
                  const zScore = (value - biomarker.referenceValue) / biomarker.standardDeviation
                  return (
                    <p key={index}>
                      {biomarker.name}: z = ({value} - {biomarker.referenceValue}) / {biomarker.standardDeviation} = {zScore.toFixed(2)}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BiologicalAgeCalculator