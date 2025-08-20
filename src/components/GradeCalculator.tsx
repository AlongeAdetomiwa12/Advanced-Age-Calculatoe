import React, { useState } from 'react';
import { BookOpen, Plus, Minus } from 'lucide-react';

interface Assignment {
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

interface GradeResult {
  assignments: Assignment[];
  totalWeightedScore: number;
  totalWeight: number;
  finalGrade: number;
  letterGrade: string;
}

const GradeCalculator = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: '', score: '', maxScore: '', weight: '' }
  ]);
  const [result, setResult] = useState<GradeResult | null>(null);

  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  };

  const addAssignment = () => {
    setAssignments([...assignments, { name: '', score: '', maxScore: '', weight: '' }]);
  };

  const removeAssignment = (index: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((_, i) => i !== index));
    }
  };

  const updateAssignment = (index: number, field: keyof Assignment, value: string) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };

  const calculateGrade = () => {
    const validAssignments = assignments.filter(assignment => 
      assignment.score && assignment.maxScore && assignment.weight &&
      !isNaN(parseFloat(assignment.score)) && !isNaN(parseFloat(assignment.maxScore)) && 
      !isNaN(parseFloat(assignment.weight)) && parseFloat(assignment.maxScore) > 0
    );

    if (validAssignments.length > 0) {
      let totalWeightedScore = 0;
      let totalWeight = 0;

      validAssignments.forEach(assignment => {
        const score = parseFloat(assignment.score);
        const maxScore = parseFloat(assignment.maxScore);
        const weight = parseFloat(assignment.weight);
        
        const percentage = (score / maxScore) * 100;
        totalWeightedScore += percentage * weight;
        totalWeight += weight;
      });

      const finalGrade = totalWeightedScore / totalWeight;
      const letterGrade = getLetterGrade(finalGrade);

      setResult({
        assignments: validAssignments,
        totalWeightedScore,
        totalWeight,
        finalGrade,
        letterGrade
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Grade Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Assignments</label>
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600">
              <div className="col-span-4">Assignment Name</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-2">Max Score</div>
              <div className="col-span-2">Weight (%)</div>
              <div className="col-span-1">Grade</div>
              <div className="col-span-1"></div>
            </div>
            {assignments.map((assignment, index) => {
              const score = parseFloat(assignment.score) || 0;
              const maxScore = parseFloat(assignment.maxScore) || 1;
              const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
              
              return (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={assignment.name}
                    onChange={(e) => updateAssignment(index, 'name', e.target.value)}
                    className="col-span-4 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Assignment name"
                  />
                  <input
                    type="number"
                    value={assignment.score}
                    onChange={(e) => updateAssignment(index, 'score', e.target.value)}
                    className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Score"
                    min="0"
                    step="0.1"
                  />
                  <input
                    type="number"
                    value={assignment.maxScore}
                    onChange={(e) => updateAssignment(index, 'maxScore', e.target.value)}
                    className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Max"
                    min="0"
                    step="0.1"
                  />
                  <input
                    type="number"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
                    className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Weight"
                    min="0"
                    step="1"
                  />
                  <div className="col-span-1 text-xs text-gray-600 text-center">
                    {assignment.score && assignment.maxScore ? `${percentage.toFixed(1)}%` : '-'}
                  </div>
                  {assignments.length > 1 && (
                    <button
                      onClick={() => removeAssignment(index)}
                      className="col-span-1 p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          <button
            onClick={addAssignment}
            className="mt-2 flex items-center space-x-2 text-purple-600 hover:bg-purple-50 p-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Assignment</span>
          </button>
        </div>
        
        <button
          onClick={calculateGrade}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Final Grade
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Final Grade</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Final Grade:</span> {result.finalGrade.toFixed(2)}%</p>
                <p><span className="font-medium">Letter Grade:</span> {result.letterGrade}</p>
                <p><span className="font-medium">Total Weight:</span> {result.totalWeight}%</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Calculation Breakdown</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>Weighted Grade Formula:</strong></p>
                <p>Final Grade = Σ(Assignment Grade × Weight) ÷ Total Weight</p>
                <br />
                <p><strong>Assignment Breakdown:</strong></p>
                {result.assignments.map((assignment, index) => {
                  const score = parseFloat(assignment.score);
                  const maxScore = parseFloat(assignment.maxScore);
                  const weight = parseFloat(assignment.weight);
                  const percentage = (score / maxScore) * 100;
                  const weightedScore = percentage * weight;
                  
                  return (
                    <p key={index}>
                      {assignment.name || `Assignment ${index + 1}`}: ({score}/{maxScore}) × {weight}% = {percentage.toFixed(1)}% × {weight}% = {weightedScore.toFixed(2)}
                    </p>
                  );
                })}
                <br />
                <p>Final Grade = {result.totalWeightedScore.toFixed(2)} ÷ {result.totalWeight} = {result.finalGrade.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeCalculator;