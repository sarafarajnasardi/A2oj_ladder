import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Code, Award, User, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { div_a, div_b, div_c, div_d, div_e, rating_1, rating_2, rating_3, rating_4, rating_5, rating_6, rating_7, rating_8, rating_9, rating_10, rating_11 } from '../assets/a2oj_ladders';

const A2oJ = () => {
  const [username, setUsername] = useState('');
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isLadderTypeOpen, setIsLadderTypeOpen] = useState(false);
  const [selectedLadderType, setSelectedLadderType] = useState('Rating');
  const [selectedRating, setSelectedRating] = useState('Codeforces Rating < 1300');
  const [selectedDivision, setSelectedDivision] = useState('');
  
  const ratingDropdownRef = useRef(null);
  const ladderTypeDropdownRef = useRef(null);
  const navigate = useNavigate();

  const ladderTypes = ['Rating', 'Division'];
 
  const ratingOptions = [
    'Codeforces Rating < 1300',
    'Codeforces Rating: 1300-1399',
    'Codeforces Rating: 1400-1499',
    'Codeforces Rating: 1500-1599',
    'Codeforces Rating: 1600-1699',
    'Codeforces Rating: 1700-1799',
    'Codeforces Rating: 1800-1899',
    'Codeforces Rating: 1900-1999',
    'Codeforces Rating: 2000-2099',
    'Codeforces Rating: 2100-2199',
    'Codeforces Rating: 2200+'
  ];
  
  const divisionOptions = [
    'Division A',
    'Division B',
    'Division C',
    'Division D',
    'Division E'
  ];
  
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

  const getDropdownOptions = () => {
    if (selectedLadderType === 'Rating') {
      return ratingOptions;
    } else if (selectedLadderType === 'Division') {
      return divisionOptions;
    } else {
      return ['Option 1', 'Option 2', 'Option 3'];
    }
  };

  const getCurrentSelection = () => {
    if (selectedLadderType === 'Rating') {
      return selectedRating;
    } else if (selectedLadderType === 'Division') {
      return selectedDivision || divisionOptions[0];
    } else {
      return 'Select an option';
    }
  };

  const handleOptionSelect = (option) => {
    if (selectedLadderType === 'Rating') {
      setSelectedRating(option);
    } else if (selectedLadderType === 'Division') {
      setSelectedDivision(option);
    }
    setIsRatingDropdownOpen(false);
  };

  useEffect(() => {
    if (selectedLadderType === 'Rating' && !selectedRating) {
      setSelectedRating(ratingOptions[0]);
    } else if (selectedLadderType === 'Division' && !selectedDivision) {
      setSelectedDivision(divisionOptions[0]);
    }
  }, [selectedLadderType]);

  const handleViewLadder = () => {
    if (!username.trim()) {
      alert("Please enter a valid Codeforces username");
      return;
    }
    
    let problems;
    if (selectedLadderType === 'Rating') {
      problems = rating_1;
      const ratingMap = {
        "Codeforces Rating < 1300": rating_1,
        "Codeforces Rating: 1300-1399": rating_2,
        "Codeforces Rating: 1400-1499": rating_3,
        "Codeforces Rating: 1500-1599": rating_4,
        "Codeforces Rating: 1600-1699": rating_5,
        "Codeforces Rating: 1700-1799": rating_6,
        "Codeforces Rating: 1800-1899": rating_7,
        "Codeforces Rating: 1900-1999": rating_8,
        "Codeforces Rating: 2000-2099": rating_9,
        "Codeforces Rating: 2100-2199": rating_10,
        "Codeforces Rating: 2200+": rating_11
      };
      problems = ratingMap[selectedRating] || rating_1;
      
      navigate('/Rating_ladder', { 
        state: { 
          receivedData: problems,
          handle: username,
        } 
      });
    } else {
      const divisionMap = {
        "Division A": div_a,
        "Division B": div_b,
        "Division C": div_c,
        "Division D": div_d,
        "Division E": div_e
      };
      problems = divisionMap[selectedDivision] || div_a;
      
      navigate('/Division_ladder', { 
        state: { 
          receivedData: problems,
          handle: username,
        } 
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Hero Section with Animated Content */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-full shadow-2xl animate-pulse">
            <Code className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            A2OJ Ladder Challenge
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elevate your competitive programming skills with structured problem sets
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: Award, 
              title: "Rating-Based", 
              description: "Problems organized by Codeforces rating range" 
            },
            { 
              icon: Zap, 
              title: "Skill Progression", 
              description: "Problems increase in difficulty as you advance" 
            },
            { 
              icon: Code, 
              title: "Topic Coverage", 
              description: "Diverse problem types to build comprehensive skills" 
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="
                bg-white 
                rounded-2xl 
                shadow-xl 
                border-2 border-gray-100 
                p-6 
                transform 
                transition-all 
                duration-300 
                hover:scale-105
              "
            >
              <div className="flex items-center mb-4">
                <feature.icon className="h-8 w-8 text-indigo-600 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ladder Configuration Section */}
      <div className="container mx-auto px-4 py-8">
        <div 
          className="
            bg-white 
            rounded-3xl 
            shadow-2xl 
            border-2 border-gray-100 
            overflow-hidden 
            transition-all 
            duration-500 
            transform 
            hover:scale-[1.01]
            p-8
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-800">
                  <User className="h-4 w-4 mr-2 text-indigo-600" />
                  Codeforces Username
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="
                    w-full 
                    bg-gray-50 
                    text-black 
                    px-4 
                    py-3 
                    rounded-lg 
                    border 
                    border-gray-300 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-indigo-500 
                    focus:border-transparent 
                    transition-all 
                    duration-200
                  "
                  placeholder="Enter your username"
                />
              </div>

              {/* Ladder Type Dropdown */}
              <div className="space-y-2" ref={ladderTypeDropdownRef}>
                <label className="flex items-center text-sm font-medium text-gray-800">
                  <Award className="h-4 w-4 mr-2 text-indigo-600" />
                  Ladder Type
                </label>
                <div 
                  className="
                    w-full 
                    bg-gray-50 
                    text-black 
                    px-4 
                    py-3 
                    rounded-lg 
                    cursor-pointer 
                    flex 
                    items-center 
                    justify-between 
                    border 
                    border-gray-300 
                    hover:border-indigo-500 
                    transition-all 
                    duration-200
                  "
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
                        className="
                          px-4 
                          py-3 
                          text-black 
                          hover:bg-indigo-50 
                          cursor-pointer 
                          transition-colors 
                          duration-150
                        "
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
              {/* Rating/Division Selection */}
              <div className="space-y-2" ref={ratingDropdownRef}>
                <label className="flex items-center text-sm font-medium text-gray-800">
                  <Award className="h-4 w-4 mr-2 text-indigo-600" />
                  {selectedLadderType === 'Rating' ? 'By Rating' : 
                  selectedLadderType === 'Division' ? 'By Division' : 
                  `By ${selectedLadderType.toLowerCase()}`}
                </label>
                <div 
                  className="
                    w-full 
                    bg-gray-50 
                    text-black 
                    px-4 
                    py-3 
                    rounded-lg 
                    cursor-pointer 
                    flex 
                    items-center 
                    justify-between 
                    border 
                    border-gray-300 
                    hover:border-indigo-500 
                    transition-all 
                    duration-200
                  "
                  onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                >
                  <span>{getCurrentSelection()}</span>
                  {isRatingDropdownOpen ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
                
                {isRatingDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {getDropdownOptions().map((option, index) => (
                      <div 
                        key={index}
                        className="
                          px-4 
                          py-3 
                          text-black 
                          hover:bg-indigo-50 
                          cursor-pointer 
                          transition-colors 
                          duration-150
                        "
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
                  className="
                    w-full 
                    bg-gradient-to-r 
                    from-indigo-600 
                    to-purple-600 
                    text-white 
                    font-medium 
                    px-6 
                    py-3 
                    rounded-lg 
                    transition-all 
                    duration-300 
                    transform 
                    hover:scale-105 
                    shadow-xl 
                    hover:shadow-2xl 
                    flex 
                    items-center 
                    justify-center
                  "
                >
                  <Code className="h-5 w-5 mr-2" />
                  View Ladder
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              </div>
              
              <div className="mt-2 text-center text-sm text-gray-600">
                {selectedLadderType === 'Rating' ? 
                  <span>Problems suitable for your current Codeforces rating</span> :
                  <span>Problems grouped by Codeforces division level</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            About A2OJ Ladders
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            A2OJ Ladders is a comprehensive platform designed to help competitive programmers improve their skills through structured problem sets.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Track your solved problems",
              "Gradually increase difficulty",
              "Improve problem-solving skills",
              "Prepare for contests efficiently"
            ].map((feature, index) => (
              <div 
                key={index} 
                className="
                  bg-white 
                  rounded-xl 
                  p-6 
                  shadow-md 
                  flex 
                  items-center 
                  transform 
                  transition-all 
                  duration-300 
                  hover:scale-105
                "
              >
                <div className="w-3 h-3 bg-indigo-600 rounded-full mr-4"></div>
                <span className="text-gray-800 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Tailwind Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default A2oJ;