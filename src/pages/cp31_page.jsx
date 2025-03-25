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
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <h2 className="text-3xl font-extrabold text-white text-center">CP31 Problem Sheet</h2>
            <p className="text-white text-opacity-80 text-center mt-2">
              A structured approach to improving your competitive programming skills
            </p>
          </div>

          {/* Key Features */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  icon: <Award className="h-8 w-8" />, 
                  title: "Rating-Based", 
                  description: "Problems organized by specific Codeforces rating",
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  icon: <Zap className="h-8 w-8" />, 
                  title: "Structured Learning", 
                  description: "Carefully arranged progression for optimal skill development",
                  color: "from-purple-500 to-purple-600"
                },
                { 
                  icon: <BookOpen className="h-8 w-8" />, 
                  title: "Complete Coverage", 
                  description: "Covers essential algorithms and data structures",
                  color: "from-blue-600 to-purple-600"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-gradient-to-br ${feature.color} 
                    text-white rounded-2xl p-6 
                    transform transition-all duration-300 hover:scale-105
                  `}
                >
                  <div className="flex items-center mb-3">
                    {React.cloneElement(feature.icon, { className: "mr-3" })}
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-white text-opacity-80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Username Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-800">
                    <User className="h-4 w-4 mr-2" />
                    Codeforces Username
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter your username"
                    required
                  />
                </div>
    
                {/* Ladder Type Dropdown */}
                <div className="space-y-2" ref={ladderTypeDropdownRef}>
                  <label className="flex items-center text-sm font-medium text-gray-800">
                    <Award className="h-4 w-4 mr-2" />
                    Ladder Type
                  </label>
                  <div 
                    className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg cursor-pointer flex items-center justify-between border border-gray-300 hover:border-blue-500 transition-all duration-200"
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
                          className="px-4 py-3 text-black hover:bg-blue-100 cursor-pointer transition-colors duration-150"
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
              
              <div className="space-y-6">
                {/* Rating Selection */}
                <div className="space-y-2" ref={ratingDropdownRef}>
                  <label className="flex items-center text-sm font-medium text-gray-800">
                    <Award className="h-4 w-4 mr-2" />
                    By Rating
                  </label>
                  <div 
                    className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg cursor-pointer flex items-center justify-between border border-gray-300 hover:border-blue-500 transition-all duration-200"
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
                          className="px-4 py-3 text-black hover:bg-blue-100 cursor-pointer transition-colors duration-150"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
    
                {/* View Ladder Button */}
                <div className="pt-4">
                  <button 
                    onClick={handleViewLadder} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
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

          {/* About Section */}
          <div className="bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About CP31 Sheet</h3>
              <p className="text-gray-700 mb-6">
                CP31 is a meticulously curated collection of problems designed to boost your competitive programming skills. 
                Following this structured approach will help you master essential algorithms and improve your contest performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Track your solved problems",
                  "Build strong algorithmic foundations",
                  "Progress at your own pace",
                  "Focus on specific rating targets"
                ].map((point, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-800">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CP31;