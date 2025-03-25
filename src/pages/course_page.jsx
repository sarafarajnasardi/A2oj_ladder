import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Layers, Calendar, BookOpen } from "lucide-react";
import Cp_Sheets from "./cp_sheets";
import UpcomingContestsPage from "./upcoming_contest";
const CoursePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const ArrowRight = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with Centered Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block bg-black p-4 rounded-full shadow-lg mb-6">
          <Code className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Responsive Navigation Pills */}
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center space-x-3 space-y-2">
          <button
            onClick={() => handleTabChange(0)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
              activeTab === 0 
                ? "bg-black text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Sheets
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
              activeTab === 1 
                ? "bg-black text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Contests
          </button>
        </div>
      </div>

      {/* Content Area with Dynamic Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-10">
            {activeTab === 0 ? (
          <Cp_Sheets />
        ) : activeTab === 1 ? (
          <UpcomingContestsPage />
        ) : (
          <CPRoadmap/>
        )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Feature Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-6 w-6 text-white" />,
              title: "Problem Sheets",
              description: "Curated collections of problems organized by difficulty and algorithm type",
              action: "Explore sheets"
            },
            {
              icon: <Calendar className="h-6 w-6 text-white" />,
              title: "Upcoming Contests",
              description: "Stay updated with the latest competitive programming contests and events",
              action: "View contests"
            },
            {
              icon: <Layers className="h-6 w-6 text-white" />,
              title: "Learning Paths",
              description: "Structured guides to master algorithms and data structures step by step",
              action: "Start learning"
            }
          ].map((card, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-black p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <button className="flex items-center text-sm font-semibold text-black hover:text-gray-700 group">
                {card.action}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Call to Action */}
      <div className="bg-gray-50 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-black p-4 rounded-full shadow-lg mb-6">
            <Code className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
            Enhance your problem-solving abilities through structured practice
          </p>
          <button className="px-10 py-4 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;