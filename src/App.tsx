import React, { useState } from 'react';
import { Calendar, Calculator, Clock, Star, Gift, ChevronDown } from 'lucide-react';

interface AgeResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  nextBirthday: {
    daysRemaining: number;
    date: string;
  };
  zodiacSign: string;
  birthdayDay: string;
}

const calculatorTools = [
  'Basic Arithmetic Calculator',
  'Percentage Calculator', 
  'Tip Calculator',
  'Discount Calculator',
  'Sales Tax Calculator',
  'Unit Price Calculator',
  'Ratio Calculator',
  'Fraction to Decimal Converter',
  'Decimal to Fraction Converter',
  'Percentage Increase/Decrease Calculator',
  'Average Calculator',
  'GPA Calculator',
  'Grade Calculator',
  'Simple Interest Calculator',
  'Compound Interest Calculator',
  'Currency Converter',
  'Time Zone Converter'
];

const zodiacSigns = [
  { name: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
  { name: 'Capricorn', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', start: [2, 19], end: [3, 20] }
];

const TabContent = ({ activeTab }: { activeTab: string }) => {
  const content = {
    'About Tool': (
      <div className="space-y-4 text-gray-300">
        <h3 className="text-lg font-semibold text-white">Precision Age Calculator</h3>
        <p>Our advanced age calculator provides precise calculations of your age in multiple time units. Get exact measurements in years, months, weeks, days, hours, and minutes with mathematical precision.</p>
        
        <h4 className="text-md font-semibold text-white mt-6">Key Features:</h4>
        <ul className="space-y-2 list-disc list-inside">
          <li>Zodiac sign revelation based on your birth date</li>
          <li>Birthday countdown with exact days remaining</li>
          <li>Multiple time unit calculations simultaneously</li>
          <li>Clean, modern interface optimized for all devices</li>
        </ul>
      </div>
    ),
    'Basic Operations': (
      <div className="space-y-3 text-gray-300">
        <h3 className="text-lg font-semibold text-white">How to Use</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
            <p>Select your birth day from the dropdown menu</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
            <p>Choose your birth month from the available options</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
            <p>Enter your birth year using the dropdown</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
            <p>Click "Calculate Age" to get instant results</p>
          </div>
        </div>
      </div>
    ),
    'Special Functions': (
      <div className="space-y-4 text-gray-300">
        <h3 className="text-lg font-semibold text-white">Advanced Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Date Comparison</h4>
            <p className="text-sm">Toggle to compare your age to any specific date in the future or past.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Zodiac Detection</h4>
            <p className="text-sm">Automatically reveals your zodiac sign based on your birth date.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Birthday Countdown</h4>
            <p className="text-sm">Shows exactly how many days until your next birthday.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Multiple Units</h4>
            <p className="text-sm">View your age in years, months, weeks, days, hours, and minutes.</p>
          </div>
        </div>
      </div>
    ),
    'Keyboard Shortcuts': (
      <div className="space-y-4 text-gray-300">
        <h3 className="text-lg font-semibold text-white">Keyboard Navigation</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <span>Calculate Age</span>
            <kbd className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Enter</kbd>
          </div>
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <span>Navigate Tabs</span>
            <kbd className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Tab</kbd>
          </div>
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <span>Open Dropdowns</span>
            <kbd className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Space</kbd>
          </div>
        </div>
      </div>
    ),
    'Responsive Design': (
      <div className="space-y-4 text-gray-300">
        <h3 className="text-lg font-semibold text-white">Mobile-First Approach</h3>
        <p>Our calculator is designed with responsive principles to ensure optimal viewing on all devices:</p>
        <div className="space-y-3">
          <div className="bg-gray-800 p-3 rounded-lg">
            <h4 className="font-semibold text-white">📱 Mobile (320px+)</h4>
            <p className="text-sm">Single column layout with stacked components</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <h4 className="font-semibold text-white">📟 Tablet (768px+)</h4>
            <p className="text-sm">Optimized two-column layout with improved spacing</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <h4 className="font-semibold text-white">🖥️ Desktop (1024px+)</h4>
            <p className="text-sm">Full side-by-side layout with enhanced grid display</p>
          </div>
        </div>
      </div>
    )
  };

  return content[activeTab as keyof typeof content] || content['About Tool'];
};

function App() {
  const [selectedDay, setSelectedDay] = useState('15');
  const [selectedMonth, setSelectedMonth] = useState('6');
  const [selectedYear, setSelectedYear] = useState('1990');
  const [compareToAnother, setCompareToAnother] = useState(false);
  const [activeTab, setActiveTab] = useState('About Tool');
  const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);

  const tabs = ['About Tool', 'Basic Operations', 'Special Functions', 'Keyboard Shortcuts', 'Responsive Design'];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => (currentYear - i).toString());

  const getZodiacSign = (month: number, day: number): string => {
    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (month === startMonth && day >= startDay) return sign.name;
      if (month === endMonth && day <= endDay) return sign.name;
      if (startMonth > endMonth) { // Capricorn case
        if (month === startMonth && day >= startDay) return sign.name;
        if (month === endMonth && day <= endDay) return sign.name;
      }
    }
    return 'Unknown';
  };

  const calculateAge = () => {
    const birthDate = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, parseInt(selectedDay));
    const today = new Date();
    
    if (birthDate > today) {
      alert('Birth date cannot be in the future!');
      return;
    }

    // Calculate age components
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }

    // Calculate other units
    const timeDiff = today.getTime() - birthDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor(timeDiff / (1000 * 60));

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Get zodiac sign and birthday day
    const zodiacSign = getZodiacSign(parseInt(selectedMonth), parseInt(selectedDay));
    const birthdayDay = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

    setAgeResult({
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      nextBirthday: {
        daysRemaining: daysToNextBirthday,
        date: nextBirthday.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      },
      zodiacSign,
      birthdayDay
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="border-b border-purple-700/50 bg-purple-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="w-8 h-8 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Advanced Calculator Suite</h1>
            </div>
            
            {/* Calculator Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowCalculatorDropdown(true)}
                onMouseLeave={() => setShowCalculatorDropdown(false)}
                className="flex items-center space-x-2 px-4 py-2 text-purple-300 hover:text-white hover:bg-purple-800 rounded-lg transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculators</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showCalculatorDropdown && (
                <div
                  onMouseEnter={() => setShowCalculatorDropdown(true)}
                  onMouseLeave={() => setShowCalculatorDropdown(false)}
                  className="absolute right-0 top-full mt-2 w-80 bg-purple-900/95 backdrop-blur-sm border border-purple-700/50 rounded-xl shadow-2xl z-50"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Basic Math & Everyday Use</h3>
                    <div className="grid grid-cols-1 gap-1">
                      {calculatorTools.map((tool, index) => (
                        <button
                          key={index}
                          className="text-left p-3 text-purple-200 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors text-sm"
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Content */}
          <div className="space-y-6">
            {/* Main Heading */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Advanced Age Calculator
                <span className="block text-xl lg:text-2xl text-purple-300 font-normal mt-2">
                  Calculate Your Exact Age in Years, Months, Days
                </span>
              </h1>
              <p className="text-purple-200 text-lg mb-6 leading-relaxed">
                Discover your precise age with our advanced calculator that shows your exact age in years, months, weeks, days, hours, and minutes. Get additional insights including zodiac sign and birthday countdown.
              </p>
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-purple-500/25">
                Explore All Calculators
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl border border-purple-700/50">
              <div className="flex overflow-x-auto bg-purple-900/50 rounded-t-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 font-medium whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab
                        ? 'text-white border-purple-400 bg-purple-700/50'
                        : 'text-purple-300 border-transparent hover:text-white hover:bg-purple-800/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6">
                <TabContent activeTab={activeTab} />
              </div>
            </div>
          </div>

          {/* Right Content - Calculator */}
          <div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
              {/* Calculator Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Modern Age Calculator</h2>
                <p className="text-purple-100">Discover your exact age in multiple units with our sleek calculator</p>
              </div>

              {/* Calculator Body */}
              <div className="p-6 space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                    <div className="relative">
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                      >
                        {days.map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                    <div className="relative">
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                      >
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <div className="relative">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Compare Toggle */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCompareToAnother(!compareToAnother)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      compareToAnother ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform absolute top-0.5 ${
                      compareToAnother ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                  <span className="text-gray-700 font-medium">Compare to another date</span>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateAge}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Calculate Age</span>
                </button>

                {/* Results Section */}
                {ageResult && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Age Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Years', value: ageResult.years, icon: Calendar },
                        { label: 'Months', value: ageResult.months, icon: Calendar },
                        { label: 'Weeks', value: ageResult.weeks, icon: Clock },
                        { label: 'Days', value: ageResult.days, icon: Clock },
                        { label: 'Hours', value: ageResult.hours, icon: Clock },
                        { label: 'Minutes', value: ageResult.minutes, icon: Clock }
                      ].map((item, index) => (
                        <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <item.icon className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-600">{item.label}</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-800">{item.value.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Gift className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">Next Birthday</span>
                        </div>
                        <p className="text-green-700">
                          <span className="font-bold">{ageResult.nextBirthday.daysRemaining}</span> days remaining
                        </p>
                        <p className="text-sm text-green-600">{ageResult.nextBirthday.date}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="w-5 h-5 text-amber-600" />
                            <span className="font-semibold text-amber-800">Zodiac Sign</span>
                          </div>
                          <p className="text-amber-700 font-bold">{ageResult.zodiacSign}</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-800">Birthday Day</span>
                          </div>
                          <p className="text-blue-700 font-bold">{ageResult.birthdayDay}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;