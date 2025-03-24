import React, { useState } from "react";
import { Code, Layers, BookOpen, ExternalLink, ArrowRight, Activity, Hash } from "lucide-react";
import CP31 from "./cp31_page";
import A2oJ from "./A2oj_page";

const Cp_Sheets = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(<CP31 />);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex === 0) {
      setPage(<CP31 />);
    } else {
      setPage(<A2oJ />);
    }
  };

  // Tab data with black and white theme
  const tabs = [
    {
      title: "CP31 Sheet",
      icon: <Code />,
      description: "A structured problem set covering key competitive programming concepts",
      color: "#000000", // black
      lightColor: "#F5F5F5", // light gray
      problemCount: 450,
      topics: 31
    },
    {
      title: "A2OJ Ladder", 
      icon: <Layers />,
      description: "Difficulty-based problem sets organized as a ladder",
      color: "#000000", // black
      lightColor: "#F5F5F5", // light gray
      problemCount: 1350,
      topics: 42
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-black mb-6">
        Competitive Programming Resources
      </h2>

      {/* Tab Navigation */}
      <div className="relative mb-8">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gray-50 rounded-xl -z-10"></div>
        
        <div className="p-4">
          {/* Modern tab navigation with pill style */}
          <div className="inline-flex p-1 rounded-lg bg-white shadow-md">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                style={{
                  backgroundColor: activeTab === index ? tab.color : 'transparent',
                }}
                className={`
                  py-2 px-4 rounded-lg transition-all duration-300 font-medium text-sm
                  flex items-center gap-2 relative overflow-hidden
                  ${activeTab === index 
                    ? 'text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                {/* Animated background for inactive tabs on hover */}
                {activeTab !== index && (
                  <div 
                    className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: tab.color }}
                  ></div>
                )}
                
                {React.cloneElement(tab.icon, { 
                  className: `h-4 w-4 ${activeTab === index ? 'text-white' : ''}`
                })}
                {tab.title}
              </button>
            ))}
          </div>
          
          {/* Active tab content preview */}
          <div className="mt-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100 relative">
            {/* Tab indicator pill */}
            <div 
              className="absolute -top-3 left-8 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: tabs[activeTab].color }}
            >
              {tabs[activeTab].title}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Icon display */}
              <div 
                className="flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: tabs[activeTab].lightColor }}
              >
                {React.cloneElement(tabs[activeTab].icon, { 
                  style: { color: tabs[activeTab].color },
                  className: "h-8 w-8"
                })}
              </div>
              
              {/* Content preview */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{tabs[activeTab].title}</h3>
                <p className="text-gray-600 mb-4">{tabs[activeTab].description}</p>
                
                {/* Stats badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                    <Hash className="h-3 w-3" />
                    <span>{tabs[activeTab].problemCount}+ Problems</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                    <Activity className="h-3 w-3" />
                    <span>{tabs[activeTab].topics} Topics</span>
                  </div>
                  <div 
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: tabs[activeTab].color }}
                  >
                    <ArrowRight className="h-3 w-3" />
                    <span>Currently Viewing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300"
      >
        {page}
      </div>

      {/* Stats Section */}
      <div className="mt-12">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-black mb-4">
            Resource Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-black mb-1">1800+</div>
              <p className="text-gray-600">Curated Problems</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-black mb-1">50+</div>
              <p className="text-gray-600">Algorithm Types</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-black mb-1">16+</div>
              <p className="text-gray-600">Difficulty Levels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-black mb-4">
            Practice Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Beginner
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Focus on basic algorithms</li>
                <li>• Solve problems regularly</li>
                <li>• Learn time complexity</li>
                <li>• Master common patterns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Intermediate
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Implement advanced algorithms</li>
                <li>• Analyze your solutions</li>
                <li>• Participate in contests</li>
                <li>• Review others' code</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Advanced
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Create algorithm templates</li>
                <li>• Solve diverse problems</li>
                <li>• Optimize your solutions</li>
                <li>• Teach others to solidify knowledge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Enhance your problem-solving abilities through structured practice and consistent effort
        </p>
      </div>
    </div>
  );
};

export default Cp_Sheets;