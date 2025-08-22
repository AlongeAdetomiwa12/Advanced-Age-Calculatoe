import React, { useState } from 'react'
import { Baby, Calendar } from 'lucide-react'

interface PregnancyResult {
  lmp: Date
  edd: Date
  gestationalAge: {
    weeks: number
    days: number
    totalDays: number
  }
  conceptionDate: Date
  fetalAge: {
    weeks: number
    days: number
  }
  trimester: number
  trimesterName: string
  daysRemaining: number
}

const PregnancyCalculator = () => {
  const [lmpDate, setLmpDate] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [result, setResult] = useState<PregnancyResult | null>(null)

  const calculatePregnancy = () => {
    if (!lmpDate) return

    const lmp = new Date(lmpDate)
    const today = new Date()
    const cycle = parseInt(cycleLength) || 28

    // EDD (Naegele's rule): LMP + 280 days
    const edd = new Date(lmp)
    edd.setDate(edd.getDate() + 280)

    // Gestational Age: Today - LMP
    const timeDiff = today.getTime() - lmp.getTime()
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7

    // Conception date (adjust for cycle length)
    const conception = new Date(lmp)
    const ovulationDay = 14 + (cycle - 28) // Adjust for cycle length
    conception.setDate(conception.getDate() + ovulationDay)

    // Fetal age = GA - 2 weeks
    const fetalAgeDays = Math.max(0, totalDays - 14)
    const fetalWeeks = Math.floor(fetalAgeDays / 7)
    const fetalDaysRemainder = fetalAgeDays % 7

    // Determine trimester
    let trimester = 1
    let trimesterName = 'First Trimester'
    
    if (totalDays >= 98) { // 14 weeks
      trimester = 2
      trimesterName = 'Second Trimester'
    }
    if (totalDays >= 196) { // 28 weeks
      trimester = 3
      trimesterName = 'Third Trimester'
    }

    // Days remaining until EDD
    const daysRemaining = Math.ceil((edd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    setResult({
      lmp,
      edd,
      gestationalAge: {
        weeks,
        days,
        totalDays
      },
      conceptionDate: conception,
      fetalAge: {
        weeks: fetalWeeks,
        days: fetalDaysRemainder
      },
      trimester,
      trimesterName,
      daysRemaining
    })
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Baby className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Pregnancy Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Last Menstrual Period (LMP)</label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Cycle Length (days)</label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter cycle length"
            min="21"
            max="35"
          />
        </div>
        
        <button
          onClick={calculatePregnancy}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Pregnancy Details
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h4 className="font-semibold text-pink-800 mb-3">Pregnancy Results</h4>
              <div className="space-y-2 text-pink-700">
                <p><span className="font-medium">Gestational Age:</span> {result.gestationalAge.weeks} weeks, {result.gestationalAge.days} days</p>
                <p><span className="font-medium">Fetal Age:</span> {result.fetalAge.weeks} weeks, {result.fetalAge.days} days</p>
                <p><span className="font-medium">Trimester:</span> {result.trimesterName}</p>
                <p><span className="font-medium">Due Date (EDD):</span> {result.edd.toLocaleDateString()}</p>
                <p><span className="font-medium">Days Remaining:</span> {result.daysRemaining > 0 ? result.daysRemaining : 'Overdue'}</p>
                <p><span className="font-medium">Conception Date:</span> {result.conceptionDate.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Pregnancy Formulas</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Naegele's Rule (EDD):</strong></p>
                <p>EDD = LMP + 280 days</p>
                <p>EDD = {result.lmp.toLocaleDateString()} + 280 days = {result.edd.toLocaleDateString()}</p>
                <br />
                <p><strong>Gestational Age:</strong></p>
                <p>GA = Today - LMP</p>
                <p>GA = {result.gestationalAge.totalDays} days = {result.gestationalAge.weeks}w{result.gestationalAge.days}d</p>
                <br />
                <p><strong>Conception Date:</strong></p>
                <p>Conception ≈ LMP + {14 + (parseInt(cycleLength) - 28)} days (adjusted for {cycleLength}-day cycle)</p>
                <p>Conception ≈ {result.conceptionDate.toLocaleDateString()}</p>
                <br />
                <p><strong>Fetal Age:</strong></p>
                <p>Fetal Age = GA - 2 weeks</p>
                <p>Fetal Age = {result.gestationalAge.totalDays} - 14 = {Math.max(0, result.gestationalAge.totalDays - 14)} days</p>
                <p>Fetal Age = {result.fetalAge.weeks}w{result.fetalAge.days}d</p>
                <br />
                <p><strong>Trimesters:</strong></p>
                <p>T1: 0–13w6d, T2: 14–27w6d, T3: 28w0d–40w+</p>
                <p>Current: {result.trimesterName} ({result.gestationalAge.weeks}w{result.gestationalAge.days}d)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PregnancyCalculator