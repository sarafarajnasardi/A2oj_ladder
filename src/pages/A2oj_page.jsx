import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Code, Award, User, Zap } from 'lucide-react';
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

  // Get dropdown options based on selected ladder type
  const getDropdownOptions = () => {
    if (selectedLadderType === 'Rating') {
      return ratingOptions;
    } else if (selectedLadderType === 'Division') {
      return divisionOptions;
    } else {
      return ['Option 1', 'Option 2', 'Option 3']; // Placeholder for other types
    }
  };

  // Get the current selection based on ladder type
  const getCurrentSelection = () => {
    if (selectedLadderType === 'Rating') {
      return selectedRating;
    } else if (selectedLadderType === 'Division') {
      return selectedDivision || divisionOptions[0];
    } else {
      return 'Select an option';
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (selectedLadderType === 'Rating') {
      setSelectedRating(option);
    } else if (selectedLadderType === 'Division') {
      setSelectedDivision(option);
    }
    setIsRatingDropdownOpen(false);
  };

  // Update selection when ladder type changes
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
    if (selectedLadderType === 'Rating') {
        let problems = rating_1;
        if(selectedRating === "Codeforces Rating < 1300"){
           problems = rating_1;
        } else if(selectedRating === "Codeforces Rating: 1300-1399"){
           problems = rating_2;
        } else if(selectedRating === "Codeforces Rating: 1400-1499"){
           problems = rating_3;
        } else if(selectedRating === "Codeforces Rating: 1500-1599"){
           problems = rating_4;
        } else if(selectedRating === "Codeforces Rating: 1600-1699"){
           problems = rating_5;
        } else if(selectedRating === "Codeforces Rating: 1700-1799"){
           problems = rating_6;
        } else if(selectedRating === "Codeforces Rating: 1800-1899"){
           problems = rating_7;
        } else if(selectedRating === "Codeforces Rating: 1900-1999"){
           problems = rating_8;
        } else if(selectedRating === "Codeforces Rating: 2000-2099"){
           problems = rating_9;
        } else if(selectedRating === "Codeforces Rating: 2100-2199"){
           problems = rating_10;
        } else{
           problems = rating_11;
        }
        navigate('/Rating_ladder', { 
          state: { 
            receivedData: problems,
            handle: username,
          } 
        });
    } else {
      let problems = div_a;
      if(selectedDivision === "Division A"){
        problems = div_a;
      } else if(selectedDivision === "Division B"){
        problems = div_b;
      } else if(selectedDivision === "Division C"){
        problems = div_c;
      } else if(selectedDivision === "Division D"){
        problems = div_d;
      } else if(selectedDivision === "Division E"){
        problems = div_e;
      }
      navigate('/Division_ladder', { 
        state: { 
          receivedData: problems,
          handle: username,
        } 
      });
    }
  };

  return (
    <div className=" min-h-screen bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">A2OJ Ladder</h2>
        <p className="text-gray-700 mb-6">
          Access structured problem sets organized by Codeforces rating or division. 
          Enter your Codeforces handle to track your progress.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-black mb-1 flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Rating-Based
            </div>
            <p className="text-sm text-gray-700">Problems organized by Codeforces rating range</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-black mb-1 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Skill Progression
            </div>
            <p className="text-sm text-gray-700">Problems increase in difficulty as you advance</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-black mb-1 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Topic Coverage
            </div>
            <p className="text-sm text-gray-700">Diverse problem types to build comprehensive skills</p>
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
            {/* Rating/Division Selection */}
            <div className="space-y-2" ref={ratingDropdownRef}>
              <label className="flex items-center text-sm font-medium text-gray-800">
                <Award className="h-4 w-4 mr-2" />
                {selectedLadderType === 'Rating' ? 'By Rating' : 
                selectedLadderType === 'Division' ? 'By Division' : 
                `By ${selectedLadderType.toLowerCase()}`}
              </label>
              <div className="relative">
                <div 
                  className="w-full bg-gray-50 text-black px-4 py-3 rounded-lg cursor-pointer flex items-center justify-between border border-gray-300 hover:border-gray-500 transition-all duration-200"
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
                className="w-full bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <Code className="h-5 w-5 mr-2" />
                View Ladder
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
      
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-medium text-black mb-3">About A2OJ Ladders</h3>
        <p className="text-gray-700 text-sm mb-4">
          A2OJ Ladders is a collection of problems from Codeforces organized by difficulty. 
          It helps competitive programmers improve their skills by practicing problems appropriate for their level.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Track your solved problems</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Gradually increase difficulty</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Improve problem-solving skills</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-gray-800">Prepare for contests efficiently</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A2oJ;