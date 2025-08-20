import React, { useState } from 'react';
import { GraduationCap, Plus, Minus } from 'lucide-react';

interface Course {
  name: string;
  credits: string;
  grade: string;
}

interface GPAResult {
  courses: Course[];
  totalCredits: number;
  totalGradePoints: number;
  gpa: number;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { name: '', credits: '', grade: 'A' }
  ]);
  const [result, setResult] = useState<GPAResult | null>(null);

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', credits: '', grade: 'A' }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(course => 
      course.credits && !isNaN(parseFloat(course.credits)) && parseFloat(course.credits) > 0
    );

    if (validCourses.length > 0) {
      let totalCredits = 0;
      let totalGradePoints = 0;

      validCourses.forEach(course => {
        const credits = parseFloat(course.credits);
        const points = gradePoints[course.grade];
        totalCredits += credits;
        totalGradePoints += credits * points;
      });

      const gpa = totalGradePoints / totalCredits;

      setResult({
        courses: validCourses,
        totalCredits,
        totalGradePoints,
        gpa
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <GraduationCap className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold">GPA Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Courses</label>
          <div className="space-y-3">
            {courses.map((course, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(index, 'name', e.target.value)}
                  className="col-span-5 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Course name"
                />
                <input
                  type="number"
                  value={course.credits}
                  onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Credits"
                  min="0"
                  step="0.5"
                />
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  {Object.keys(gradePoints).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                <div className="col-span-2 text-sm text-gray-600 text-center">
                  {gradePoints[course.grade]} pts
                </div>
                {courses.length > 1 && (
                  <button
                    onClick={() => removeCourse(index)}
                    className="col-span-1 p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={addCourse}
            className="mt-2 flex items-center space-x-2 text-purple-600 hover:bg-purple-50 p-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>
        
        <button
          onClick={calculateGPA}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate GPA
        </button>
        
        {result && (
          <div className="space-y-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">GPA Results</h4>
              <div className="space-y-2 text-green-700">
                <p><span className="font-medium">Total Credits:</span> {result.totalCredits}</p>
                <p><span className="font-medium">Total Grade Points:</span> {result.totalGradePoints.toFixed(2)}</p>
                <p><span className="font-medium">GPA:</span> {result.gpa.toFixed(3)}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Formula & Calculation</h4>
              <div className="space-y-2 text-blue-700 text-sm">
                <p><strong>GPA Formula:</strong></p>
                <p>GPA = Σ(Grade Points × Credit Hours) ÷ Σ(Credit Hours)</p>
                <p>GPA = {result.totalGradePoints.toFixed(2)} ÷ {result.totalCredits}</p>
                <p>GPA = {result.gpa.toFixed(3)}</p>
                <br />
                <p><strong>Grade Point Breakdown:</strong></p>
                {result.courses.map((course, index) => (
                  <p key={index}>
                    {course.name || `Course ${index + 1}`}: {course.grade} ({gradePoints[course.grade]} pts) × {course.credits} credits = {(gradePoints[course.grade] * parseFloat(course.credits)).toFixed(2)} grade points
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPACalculator;