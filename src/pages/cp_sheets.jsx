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

  // Updated tab data with blue and purple color palette
  const tabs = [
    {
      title: "CP31 Sheet",
      icon: <Code />,
      description: "A structured problem set covering key competitive programming concepts",
      color: "#1E40AF", // Deep blue
      lightColor: "#DBEAFE", // Light blue
      problemCount: 450,
      topics: 31
    },
    {
      title: "A2OJ Ladder", 
      icon: <Layers />,
      description: "Difficulty-based problem sets organized as a ladder",
      color: "#6D28D9", // Deep purple
      lightColor: "#E9D5FF", // Light purple
      problemCount: 1350,
      topics: 42
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 p-8">
          <h2 className="text-3xl font-extrabold text-white mb-4 text-center">
            Competitive Programming Resources
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="relative p-6">
          <div className="inline-flex w-full justify-center mb-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`
                  py-3 px-6 mx-2 rounded-xl transition-all duration-300 
                  flex items-center gap-3 
                  ${activeTab === index 
                    ? 'bg-opacity-100 text-white shadow-lg scale-105' 
                    : 'bg-opacity-10 text-gray-700 hover:bg-opacity-20'}
                  transform hover:scale-105
                `}
                style={{
                  backgroundColor: activeTab === index ? tab.color : tab.lightColor,
                }}
              >
                {React.cloneElement(tab.icon, { 
                  className: `h-5 w-5 ${activeTab === index ? 'text-white' : tab.color}`
                })}
                {tab.title}
              </button>
            ))}
          </div>
          
          {/* Active Tab Preview */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
                style={{ 
                  backgroundColor: tabs[activeTab].lightColor,
                  boxShadow: `0 10px 15px -3px ${tabs[activeTab].color}40`
                }}
              >
                {React.cloneElement(tabs[activeTab].icon, { 
                  style: { color: tabs[activeTab].color },
                  className: "h-12 w-12"
                })}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{tabs[activeTab].title}</h3>
                <p className="text-gray-600 mb-4">{tabs[activeTab].description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: <Hash />, text: `${tabs[activeTab].problemCount}+ Problems` },
                    { icon: <Activity />, text: `${tabs[activeTab].topics} Topics` },
                    { icon: <ArrowRight />, text: "Currently Viewing", highlight: true }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                        transform transition-all duration-300 hover:scale-105
                        ${item.highlight 
                          ? `text-white ${tabs[activeTab].color}` 
                          : 'bg-gray-100 text-gray-700'}
                      `}
                      style={item.highlight ? { backgroundColor: tabs[activeTab].color } : {}}
                    >
                      {React.cloneElement(item.icon, { className: "h-4 w-4" })}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300">
            {page}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {[
            { number: "1800+", label: "Curated Problems", color: "from-blue-500 to-blue-700" },
            { number: "50+", label: "Algorithm Types", color: "from-blue-600 to-blue-800" },
            { number: "16+", label: "Difficulty Levels", color: "from-purple-500 to-purple-700" }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`
                bg-gradient-to-br ${stat.color} 
                text-white rounded-2xl p-6 text-center 
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl
              `}
            >
              <div className="text-4xl font-extrabold mb-2">{stat.number}</div>
              <p className="text-white text-opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Practice Tips Section */}
        <div className="bg-gray-50 p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Practice Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: "Beginner", 
                tips: [
                  "Focus on basic algorithms",
                  "Solve problems regularly",
                  "Learn time complexity",
                  "Master common patterns"
                ],
                color: "from-blue-400 to-blue-600"
              },
              { 
                title: "Intermediate", 
                tips: [
                  "Implement advanced algorithms",
                  "Analyze your solutions",
                  "Participate in contests",
                  "Review others' code"
                ],
                color: "from-blue-500 to-blue-700"
              },
              { 
                title: "Advanced", 
                tips: [
                  "Create algorithm templates",
                  "Solve diverse problems",
                  "Optimize your solutions",
                  "Teach others to solidify knowledge"
                ],
                color: "from-purple-400 to-purple-600"
              }
            ].map((section, index) => (
              <div 
                key={index}
                className={`
                  bg-gradient-to-br ${section.color} 
                  text-white rounded-2xl p-6 
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                `}
              >
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-700 font-medium">
            Enhance your problem-solving abilities through structured practice and consistent effort
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cp_Sheets;