import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Code, Award, User, Zap, BookOpen } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {
  rating_800,
  rating_900,
  rating_1000,
  rating_1100,
  rating_1200,
  rating_1300,
  rating_1400,
  rating_1500,
  rating_1600
} from '../assets/cp31';

const CP31 = () => {
  const [username, setUsername] = useState('');
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isLadderTypeOpen, setIsLadderTypeOpen] = useState(false);
  const [selectedLadderType, setSelectedLadderType] = useState('Rating');
  const [selectedRating, setSelectedRating] = useState('Codeforces Rating: 800');
  
  const ratingDropdownRef = useRef(null);
  const ladderTypeDropdownRef = useRef(null);
  const navigate = useNavigate();

  const ladderTypes = ['Rating'];
 
  const ratingOptions = [
    'Codeforces Rating: 800',
    'Codeforces Rating: 900',
    'Codeforces Rating: 1000',
    'Codeforces Rating: 1100',
    'Codeforces Rating: 1200',
    'Codeforces Rating: 1300',
    'Codeforces Rating: 1400',
    'Codeforces Rating: 1500',
    'Codeforces Rating: 1600',
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setIsRatingDropdownOpen(false);
      }
      if (ladderTypeDropdownRef.current && !ladderTypeDropdownRef.current.contains(event.target)) {
        setIsLadderTypeOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedRating(option);
    setIsRatingDropdownOpen(false);
  };

  // Handle view ladder button click
  const handleViewLadder = () => {
    if (!username.trim()) {
      alert("Please enter a valid Codeforces username");
      return;
    }
    
    // Map rating selection to problem set
    const ratingMap = {
      'Codeforces Rating: 800': rating_800,
      'Codeforces Rating: 900': rating_900,
      'Codeforces Rating: 1000': rating_1000,
      'Codeforces Rating: 1100': rating_1100,
      'Codeforces Rating: 1200': rating_1200,
      'Codeforces Rating: 1300': rating_1300,
      'Codeforces Rating: 1400': rating_1400,
      'Codeforces Rating: 1500': rating_1500,
      'Codeforces Rating: 1600': rating_1600
    };
    
    const problems = ratingMap[selectedRating] || rating_800;
    navigate('/CP31_ladder', { 
      state: { 
        data: problems,
        username: username,
        rating: selectedRating 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">CP31 Problem Sheet</h2>
        <p className="text-gray-700 mb-6">
          Access a comprehensive collection of problems organized by Codeforces rating.
          Enter your Codeforces handle to track your solving progress.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-black mb-1 flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Rating-Based
            </div>
            <p className="text-sm text-gray-700">Problems organized by specific Codeforces rating</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-black mb-1 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Structured Learning
            </div>
            <p className="text-sm text-gray-700">Carefully arranged progression for optimal skill development</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-black mb-1 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Complete Coverage
            </div>
            <p className="text-sm text-gray-700">Covers essential algorithms and data structures</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-800">
                <User className="h-4 w-4 mr-2" />
                Codeforces Username
                <span className="ml-1 text-gray-800">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
    
            {/* Ladder Type Dropdown */}
            <div className="space-y-2" ref={ladderTypeDropdownRef}>
              <label className="flex items-center text-sm font-medium text-gray-800">
                <Award className="h-4 w-4 mr-2" />
                Ladder Type
              </label>
              <div className="relative">
                <div 
                  className="w-full bg-gray-50 text-black px-4 py-3 rounded-lg cursor-pointer flex items-center justify-between border border-gray-300 hover:border-gray-500 transition-all duration-200"
                  onClick={() => setIsLadderTypeOpen(!isLadderTypeOpen)}
                >
                  <span>{selectedLadderType}</span>
                  {isLadderTypeOpen ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
                
                {isLadderTypeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    {ladderTypes.map((type, index) => (
                      <div 
                        key={index}
                        className="px-4 py-3 text-black hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                        onClick={() => {
                          setSelectedLadderType(type);
                          setIsLadderTypeOpen(false);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Rating Selection */}
            <div className="space-y-2" ref={ratingDropdownRef}>
              <label className="flex items-center text-sm font-medium text-gray-800">
                <Award className="h-4 w-4 mr-2" />
                By Rating
              </label>
              <div className="relative">
                <div 
                  className="w-full bg-gray-50 text-black px-4 py-3 rounded-lg cursor-pointer flex items-center justify-between border border-gray-300 hover:border-gray-500 transition-all duration-200"
                  onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                >
                  <span>{selectedRating}</span>
                  {isRatingDropdownOpen ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
                
                {isRatingDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {ratingOptions.map((option, index) => (
                      <div 
                        key={index}
                        className="px-4 py-3 text-black hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
    
            {/* View Ladder Button */}
            <div className="pt-4">
              <button 
                onClick={handleViewLadder} 
                className="w-full bg-black text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:bg-gray-800 flex items-center justify-center"
              >
                <Code className="h-5 w-5 mr-2" />
                View Ladder
              </button>
            </div>
            
            <div className="mt-2 text-center text-sm text-gray-600">
              Problems tailored for your specific Codeforces rating
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-medium text-black mb-3">About CP31 Sheet</h3>
        <p className="text-gray-700 text-sm mb-4">
          CP31 is a meticulously curated collection of problems designed to boost your competitive programming skills. 
          Following this structured approach will help you master essential algorithms and improve your contest performance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Track your solved problems</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Build strong algorithmic foundations</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Progress at your own pace</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Focus on specific rating targets</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CP31;