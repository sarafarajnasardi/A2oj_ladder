import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Layers, Calendar, BookOpen, ChevronRight } from "lucide-react";
import Cp_Sheets from "./cp_sheets";
import UpcomingContestsPage from "./upcoming_contest";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl text-sm font-semibold 
        transition-all duration-300 ease-in-out 
        flex items-center gap-2 
        transform hover:scale-105 
        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Hero Section with Animated Content */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-full shadow-2xl animate-pulse">
            <Code className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Competitive Programming Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elevate your coding skills with structured learning and challenging contests
          </p>
        </div>
      </div>

      {/* Responsive Navigation Pills */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-center space-x-4">
          <TabButton
            icon={BookOpen}
            label="Problem Sheets"
            isActive={activeTab === 0}
            onClick={() => handleTabChange(0)}
          />
          <TabButton
            icon={Calendar}
            label="Upcoming Contests"
            isActive={activeTab === 1}
            onClick={() => handleTabChange(1)}
          />
        </div>
      </div>

      {/* Content Area with Dynamic Layout and Smooth Transition */}
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
          "
        >
          <div className="p-8 md:p-12">
            <div className="animate-slide-in">
              {activeTab === 0 ? (
                <Cp_Sheets />
              ) : activeTab === 1 ? (
                <UpcomingContestsPage />
              ) : (
                <CPRoadmap />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Engaging Call to Action */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 text-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-full shadow-2xl">
              <Code className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Ready to Level Up Your Coding Skills?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join a community of passionate programmers and transform your problem-solving abilities
            </p>
            <button 
              className="
                px-12 py-4 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white 
                rounded-xl 
                text-base 
                font-bold 
                hover:from-indigo-700 
                hover:to-purple-700 
                transition-all 
                duration-300 
                transform 
                hover:scale-105 
                shadow-2xl
              "
            >
              Get Started
              <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Tailwind Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CoursePage;