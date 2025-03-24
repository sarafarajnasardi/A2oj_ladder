import React, { useState } from 'react';
import { 
  Layers, 
  BookOpen, 
  Zap, 
  Star, 
  Check, 
  TrendingUp, 
  Award 
} from 'lucide-react';

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const paths = [
    {
      id: 'beginner',
      title: 'Beginner Path',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Master the fundamentals of competitive programming',
      difficulty: 'Easy',
      color: 'bg-green-100',
      steps: [
        'Learn basic syntax and input/output',
        'Understand time and space complexity',
        'Study basic data structures',
        'Solve simple problem sets'
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate Path',
      icon: <Zap className="h-6 w-6" />,
      description: 'Dive deeper into algorithms and problem-solving techniques',
      difficulty: 'Medium',
      color: 'bg-blue-100',
      steps: [
        'Advanced data structures',
        'Dynamic programming basics',
        'Graph algorithms',
        'Solve medium-level contest problems'
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Path',
      icon: <Award className="h-6 w-6" />,
      description: 'Become an expert in complex algorithmic challenges',
      difficulty: 'Hard',
      color: 'bg-purple-100',
      steps: [
        'Advanced graph theory',
        'Advanced dynamic programming',
        'Computational geometry',
        'Competitive programming advanced techniques'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Paths Introduction */}
        <div className="text-center mb-16">
          <div className="inline-block bg-black p-4 rounded-full shadow-lg mb-6">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">
            Competitive Programming Learning Paths
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Structured roadmaps to guide you from beginner to advanced competitive programmer
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path) => (
            <div 
              key={path.id}
              onClick={() => setSelectedPath(path)}
              className={`
                bg-white rounded-2xl shadow-lg border border-gray-100 
                p-8 cursor-pointer transform transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                ${selectedPath?.id === path.id ? 'ring-4 ring-black' : ''}
              `}
            >
              <div className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 ${path.color}`}>
                {path.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{path.title}</h3>
              <p className="text-gray-600 mb-4">{path.description}</p>
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                <span className="font-medium text-gray-700">Difficulty: {path.difficulty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Path Details */}
        {selectedPath && (
          <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
            <div className="flex items-center mb-8">
              {selectedPath.icon}
              <h2 className="text-2xl font-bold ml-4">{selectedPath.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Path Overview</h3>
                <p className="text-gray-600">{selectedPath.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Learning Steps</h3>
                <ul className="space-y-3">
                  {selectedPath.steps.map((step, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-gray-700"
                    >
                      <Check className="h-5 w-5 mr-3 text-green-500" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="px-10 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors">
                Start This Path
              </button>
            </div>
          </div>
        )}

        {/* Additional Guidance */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-12">
          <TrendingUp className="h-12 w-12 mx-auto mb-6 text-black" />
          <h3 className="text-2xl font-bold mb-4">Your Learning Journey</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Each path is designed to progressively build your skills. Start where you're comfortable, 
            and don't hesitate to challenge yourself by exploring more advanced paths.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900">
              Assess Your Level
            </button>
            <button className="px-8 py-3 bg-white text-black rounded-lg font-bold border hover:bg-gray-100">
              View All Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;