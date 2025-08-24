import React, { useState } from 'react';
import { Calendar, Calculator, Clock, Star, Gift, ChevronDown, ArrowLeft, Plus, Minus, X, Divide, Percent, DollarSign, Shield } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignInPage from './components/Auth/SignInPage';
import AccountDropdown from './components/Header/AccountDropdown';
import SettingsPage from './components/Settings/SettingsPage';
import ProfilePage from './components/Profile/ProfilePage';
import AdminPage from './components/Admin/AdminPage';
import DiscountCalculator from './components/DiscountCalculator';
import SalesTaxCalculator from './components/SalesTaxCalculator';
import UnitPriceCalculator from './components/UnitPriceCalculator';
import RatioCalculator from './components/RatioCalculator';
import FractionToDecimalConverter from './components/FractionToDecimalConverter';
import DecimalToFractionConverter from './components/DecimalToFractionConverter';
import PercentageChangeCalculator from './components/PercentageChangeCalculator';
import AverageCalculator from './components/AverageCalculator';
import GPACalculator from './components/GPACalculator';
import GradeCalculator from './components/GradeCalculator';
import SimpleInterestCalculator from './components/SimpleInterestCalculator';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import LifeExpectancyCalculator from './components/Calculators/LifeExpectancyCalculator';
import BiologicalAgeCalculator from './components/Calculators/BiologicalAgeCalculator';
import PregnancyCalculator from './components/Calculators/PregnancyCalculator';
import DogAgeCalculator from './components/Calculators/DogAgeCalculator';
import CatAgeCalculator from './components/Calculators/CatAgeCalculator';

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

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

const calculatorTools = [
  { name: 'Basic Arithmetic Calculator', id: 'arithmetic' },
  { name: 'Percentage Calculator', id: 'percentage' },
  { name: 'Tip Calculator', id: 'tip' },
  { name: 'Discount Calculator', id: 'discount' },
  { name: 'Sales Tax Calculator', id: 'sales-tax' },
  { name: 'Unit Price Calculator', id: 'unit-price' },
  { name: 'Ratio Calculator', id: 'ratio' },
  { name: 'Fraction to Decimal Converter', id: 'fraction-decimal' },
  { name: 'Decimal to Fraction Converter', id: 'decimal-fraction' },
  { name: 'Percentage Increase/Decrease Calculator', id: 'percentage-change' },
  { name: 'Average Calculator', id: 'average' },
  { name: 'GPA Calculator', id: 'gpa' },
  { name: 'Grade Calculator', id: 'grade' },
  { name: 'Simple Interest Calculator', id: 'simple-interest' },
  { name: 'Compound Interest Calculator', id: 'compound-interest' },
  { name: 'Life Expectancy Calculator', id: 'life-expectancy' },
  { name: 'Biological Age Calculator', id: 'biological-age' },
  { name: 'Pregnancy Calculator', id: 'pregnancy' },
  { name: 'Dog Age Calculator', id: 'dog-age' },
  { name: 'Cat Age Calculator', id: 'cat-age' }
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

// Calculator Components
const ArithmeticCalculator = () => {
  const [calc, setCalc] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false
  });

  const inputNumber = (num: string) => {
    if (calc.waitingForOperand) {
      setCalc({
        ...calc,
        display: num,
        waitingForOperand: false
      });
    } else {
      setCalc({
        ...calc,
        display: calc.display === '0' ? num : calc.display + num
      });
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(calc.display);

    if (calc.previousValue === null) {
      setCalc({
        ...calc,
        previousValue: inputValue,
        waitingForOperand: true,
        operation: nextOperation
      });
    } else if (calc.operation) {
      const currentValue = calc.previousValue || 0;
      const newValue = calculate(currentValue, inputValue, calc.operation);

      setCalc({
        ...calc,
        display: String(newValue),
        previousValue: newValue,
        waitingForOperand: true,
        operation: nextOperation
      });
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(calc.display);

    if (calc.previousValue !== null && calc.operation) {
      const newValue = calculate(calc.previousValue, inputValue, calc.operation);

      setCalc({
        ...calc,
        display: String(newValue),
        previousValue: null,
        operation: null,
        waitingForOperand: true
      });
    }
  };

  const clear = () => {
    setCalc({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded-lg text-right text-2xl font-mono">
          {calc.display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold">Clear</button>
        <button onClick={() => inputOperation('÷')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold">÷</button>
        <button onClick={() => inputOperation('×')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold">×</button>
        
        {[7, 8, 9].map(num => (
          <button key={num} onClick={() => inputNumber(String(num))} className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold">{num}</button>
        ))}
        <button onClick={() => inputOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold">-</button>
        
        {[4, 5, 6].map(num => (
          <button key={num} onClick={() => inputNumber(String(num))} className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold">{num}</button>
        ))}
        <button onClick={() => inputOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold">+</button>
        
        {[1, 2, 3].map(num => (
          <button key={num} onClick={() => inputNumber(String(num))} className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold">{num}</button>
        ))}
        <button onClick={performCalculation} className="row-span-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold">=</button>
        
        <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold">0</button>
        <button onClick={() => inputNumber('.')} className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold">.</button>
      </div>
    </div>
  );
};

const PercentageCalculator = () => {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(perc)) {
      setResult((val * perc) / 100);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Percentage Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter value"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Percentage</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter percentage"
          />
        </div>
        <button
          onClick={calculatePercentage}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate
        </button>
        {result !== null && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-semibold">Result: {result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [people, setPeople] = useState('1');
  const [results, setResults] = useState<{tip: number, total: number, perPerson: number} | null>(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const numPeople = parseInt(people);
    
    if (!isNaN(bill) && !isNaN(tip) && !isNaN(numPeople) && numPeople > 0) {
      const tipAmount = (bill * tip) / 100;
      const total = bill + tipAmount;
      const perPerson = total / numPeople;
      
      setResults({
        tip: tipAmount,
        total: total,
        perPerson: perPerson
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Tip Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Bill Amount ($)</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter bill amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tip Percentage (%)</label>
          <input
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Number of People</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            min="1"
          />
        </div>
        <button
          onClick={calculateTip}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
        >
          Calculate Tip
        </button>
        {results && (
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <p className="text-green-800"><span className="font-semibold">Tip Amount:</span> ${results.tip.toFixed(2)}</p>
            <p className="text-green-800"><span className="font-semibold">Total Amount:</span> ${results.total.toFixed(2)}</p>
            <p className="text-green-800"><span className="font-semibold">Per Person:</span> ${results.perPerson.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'calculators'>('home');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState('15');
  const [selectedMonth, setSelectedMonth] = useState('6');
  const [selectedYear, setSelectedYear] = useState('1990');
  const [compareToAnother, setCompareToAnother] = useState(false);
  const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);

  const { user, userProfile } = useAuth();

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

  const handleDropdownEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    if (!showCalculatorDropdown) {
      const timeout = setTimeout(() => {
        setShowCalculatorDropdown(true);
      }, 200);
      setShowTimeout(timeout);
    }
  };

  const handleDropdownLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    const timeout = setTimeout(() => {
      setShowCalculatorDropdown(false);
    }, 1000);
    setHideTimeout(timeout);
  };

  const handleDropdownContentEnter = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShowCalculatorDropdown(true);
  };

  const handleDropdownContentLeave = () => {
    const timeout = setTimeout(() => {
      setShowCalculatorDropdown(false);
    }, 1000);
    setHideTimeout(timeout);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    if (!selectedDay || !selectedMonth || !selectedYear) {
      alert('Please enter a valid birth date!');
      return;
    }
    
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

  const renderCalculator = (calculatorId: string) => {
    switch (calculatorId) {
      case 'arithmetic':
        return <ArithmeticCalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'tip':
        return <TipCalculator />;
      case 'discount':
        return <DiscountCalculator />;
      case 'sales-tax':
        return <SalesTaxCalculator />;
      case 'unit-price':
        return <UnitPriceCalculator />;
      case 'ratio':
        return <RatioCalculator />;
      case 'fraction-decimal':
        return <FractionToDecimalConverter />;
      case 'decimal-fraction':
        return <DecimalToFractionConverter />;
      case 'percentage-change':
        return <PercentageChangeCalculator />;
      case 'average':
        return <AverageCalculator />;
      case 'gpa':
        return <GPACalculator />;
      case 'grade':
        return <GradeCalculator />;
      case 'simple-interest':
        return <SimpleInterestCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'life-expectancy':
        return <LifeExpectancyCalculator />;
      case 'biological-age':
        return <BiologicalAgeCalculator />;
      case 'pregnancy':
        return <PregnancyCalculator />;
      case 'dog-age':
        return <DogAgeCalculator />;
      case 'cat-age':
        return <CatAgeCalculator />;
      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Calculator Coming Soon</h3>
            <p className="text-gray-600">This calculator is under development and will be available soon.</p>
          </div>
        );
    }
  };

  if (currentPage === 'calculators') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {/* Header */}
        <header className="border-b border-purple-700/50 bg-purple-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setSelectedCalculator(null);
                  }}
                  className="flex items-center space-x-2 text-purple-300 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Calculator className="w-8 h-8 text-purple-400" />
                <h1 className="text-xl font-bold text-white">All Calculators</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!selectedCalculator ? (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Calculator Suite
                </h1>
                <p className="text-purple-200 text-lg">
                  Choose from our comprehensive collection of calculators
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculatorTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedCalculator(tool.id)}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold text-gray-800">{tool.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Click to use this calculator
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setSelectedCalculator(null)}
                  className="flex items-center space-x-2 text-purple-300 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to All Calculators</span>
                </button>
                <h2 className="text-2xl font-bold text-white">
                  {calculatorTools.find(tool => tool.id === selectedCalculator)?.name}
                </h2>
              </div>
              
              <div className="max-w-2xl mx-auto">
                {renderCalculator(selectedCalculator)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

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
            
            <div className="flex items-center space-x-4">
              {/* Calculator Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  className="flex items-center space-x-2 px-4 py-2 text-purple-300 hover:text-white hover:bg-purple-800 rounded-lg transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Calculators</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showCalculatorDropdown && (
                  <div
                    onMouseEnter={handleDropdownContentEnter}
                    onMouseLeave={handleDropdownContentLeave}
                    className="absolute right-0 top-full mt-2 w-80 bg-purple-900/95 backdrop-blur-sm border border-purple-700/50 rounded-xl shadow-2xl z-50 animate-fadeIn"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">All Calculators</h3>
                      <div className="grid grid-cols-1 gap-1">
                        {calculatorTools.map((tool, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentPage('calculators');
                              setSelectedCalculator(tool.id);
                              setShowCalculatorDropdown(false);
                            }}
                            className="text-left p-3 text-purple-200 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors text-sm"
                          >
                            {tool.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Button */}
              {userProfile?.role === 'admin' && (
                <a
                  href="/admin"
                  className="flex items-center space-x-2 px-4 py-2 text-purple-300 hover:text-white hover:bg-purple-800 rounded-lg transition-colors"
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin</span>
                </a>
              )}

              {/* Account Dropdown or Sign In */}
              {user ? (
                <AccountDropdown isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              ) : (
                <a
                  href="/signin"
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Content */}
          <div>
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
              <button onClick={() => setCurrentPage('calculators')} className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-purple-500/25">
                Explore All Calculators
              </button>
            </div>
          </div>

          {/* Right Content - Calculator */}
          <div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
              {/* Calculator Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Modern Age Calculator</h2>
                <p className="text-purple-100">Calculate your exact age in years, months, weeks, days, hours, and minutes</p>
              </div>

              {/* Calculator Body */}
              <div className="p-6 space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={selectedDay}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
                          setSelectedDay(value);
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      placeholder="Day"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={selectedMonth}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                          setSelectedMonth(value);
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      placeholder="Month"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="number"
                      min="1900"
                      max={currentYear}
                      value={selectedYear}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseInt(value) >= 1900 && parseInt(value) <= currentYear)) {
                          setSelectedYear(value);
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      placeholder="Year"
                    />
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
                  <Calendar className="w-5 h-5" />
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

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-3">Age Calculation Formula</h4>
                        <div className="space-y-2 text-blue-700 text-sm">
                          <p><strong>Years:</strong> Current Year - Birth Year = {new Date().getFullYear()} - {selectedYear} = {ageResult.years}</p>
                          <p><strong>Total Months:</strong> (Years × 12) + Month Difference = ({ageResult.years} × 12) + {ageResult.months} = {(ageResult.years * 12) + ageResult.months}</p>
                          <p><strong>Total Days:</strong> Calculated from exact date difference = {ageResult.days.toLocaleString()}</p>
                          <p><strong>Hours:</strong> Days × 24 = {ageResult.days.toLocaleString()} × 24 = {ageResult.hours.toLocaleString()}</p>
                          <p><strong>Minutes:</strong> Hours × 60 = {ageResult.hours.toLocaleString()} × 60 = {ageResult.minutes.toLocaleString()}</p>
                        </div>
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
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<MainApp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;