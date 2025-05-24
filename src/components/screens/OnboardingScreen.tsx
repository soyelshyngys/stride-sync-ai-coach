
import React, { useState } from 'react';
import { ChevronRight, Target, Camera, MessageCircle } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (data: { name: string; runningGoals: string }) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [runningGoals, setRunningGoals] = useState('');

  const steps = [
    {
      title: "Welcome to Temporun",
      subtitle: "AI-powered running coach",
      description: "Analyze your posture, discover your foot type, and get personalized shoe recommendations",
      component: (
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-8">
              <div className="card-minimal p-6 rounded-xl">
                <Camera size={32} className="text-gray-900 mx-auto" />
              </div>
              <div className="card-minimal p-6 rounded-xl">
                <Target size={32} className="text-gray-900 mx-auto" />
              </div>
              <div className="card-minimal p-6 rounded-xl">
                <MessageCircle size={32} className="text-gray-900 mx-auto" />
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Get personalized running insights powered by AI analysis
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What's your name?",
      subtitle: "Let's personalize your experience",
      description: "We'll use this to customize your recommendations",
      component: (
        <div className="space-y-6">
          <div className="card-minimal p-6 rounded-lg">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-transparent text-xl text-gray-900 placeholder-gray-400 border-none outline-none"
              autoFocus
            />
          </div>
        </div>
      )
    },
    {
      title: "What are your running goals?",
      subtitle: "Help us understand your needs",
      description: "This helps us provide better recommendations",
      component: (
        <div className="space-y-4">
          {[
            { id: 'casual', label: 'Casual Fitness', desc: 'Stay healthy and active' },
            { id: 'marathon', label: 'Marathon Training', desc: 'Long distance goals' },
            { id: 'speed', label: 'Speed & Performance', desc: 'Personal records' },
            { id: 'recovery', label: 'Injury Recovery', desc: 'Getting back on track' }
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => setRunningGoals(goal.id)}
              className={`w-full p-6 rounded-lg transition-all ${
                runningGoals === goal.id
                  ? 'bg-gray-900 text-white'
                  : 'card-minimal hover:bg-gray-50'
              }`}
            >
              <div className="text-left">
                <div className="text-lg font-medium mb-1">{goal.label}</div>
                <div className={`text-sm ${runningGoals === goal.id ? 'text-gray-300' : 'text-gray-500'}`}>
                  {goal.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      )
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return name.trim().length > 0;
      case 2: return runningGoals.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ name, runningGoals });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all ${
                index <= currentStep ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">{steps[currentStep].title}</h1>
          <h2 className="text-xl text-gray-600">{steps[currentStep].subtitle}</h2>
          <p className="text-gray-500">{steps[currentStep].description}</p>
        </div>

        <div>
          {steps[currentStep].component}
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-8">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full p-4 rounded-lg font-medium text-lg transition-all ${
            canProceed()
              ? 'btn-primary'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>{currentStep === steps.length - 1 ? 'Start Analysis' : 'Continue'}</span>
            <ChevronRight size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
