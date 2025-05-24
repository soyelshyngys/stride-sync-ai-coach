
import React, { useState } from 'react';
import { ChevronRight, Zap, Target, Camera, MessageCircle } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (data: { name: string; runningGoals: string }) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [runningGoals, setRunningGoals] = useState('');

  const steps = [
    {
      title: "Welcome to",
      subtitle: "TEMPORUN",
      description: "Your AI-powered running coach and shoe stylist",
      component: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="text-6xl font-black bg-neon-gradient bg-clip-text text-transparent animate-gradient-shift" style={{backgroundSize: '400% 400%'}}>
              TEMPORUN
            </div>
            <div className="absolute -top-2 -right-2 text-neon-blue animate-pulse">
              <Zap size={32} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-6">
              <div className="neumorphic p-4 rounded-xl">
                <Camera size={32} className="text-neon-blue" />
              </div>
              <div className="neumorphic p-4 rounded-xl">
                <Target size={32} className="text-neon-purple" />
              </div>
              <div className="neumorphic p-4 rounded-xl">
                <MessageCircle size={32} className="text-neon-orange" />
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Analyze your running posture, discover your foot type, and get personalized shoe recommendations
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What's your name?",
      subtitle: "Let's get personal",
      description: "We'll use this to customize your experience",
      component: (
        <div className="space-y-6">
          <div className="neumorphic-inset rounded-2xl p-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-transparent text-xl text-white placeholder-gray-400 border-none outline-none"
              autoFocus
            />
          </div>
        </div>
      )
    },
    {
      title: "Running Goals",
      subtitle: "What drives you?",
      description: "Help us understand your running aspirations",
      component: (
        <div className="space-y-4">
          {[
            { id: 'casual', label: 'Casual Fitness', icon: '🚶', desc: 'Stay healthy and active' },
            { id: 'marathon', label: 'Marathon Training', icon: '🏃', desc: 'Long distance goals' },
            { id: 'speed', label: 'Speed & Performance', icon: '⚡', desc: 'Personal records' },
            { id: 'recovery', label: 'Injury Recovery', icon: '🩹', desc: 'Getting back on track' }
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => setRunningGoals(goal.id)}
              className={`w-full p-6 rounded-2xl transition-all duration-300 ${
                runningGoals === goal.id
                  ? 'neumorphic neon-border bg-gradient-to-r from-neon-blue/10 to-neon-purple/10'
                  : 'neumorphic hover:bg-dark-tertiary'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{goal.icon}</div>
                <div className="flex-1 text-left">
                  <div className="text-lg font-semibold text-white">{goal.label}</div>
                  <div className="text-sm text-gray-400">{goal.desc}</div>
                </div>
                {runningGoals === goal.id && (
                  <div className="text-neon-blue animate-pulse-neon">
                    <Zap size={20} />
                  </div>
                )}
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
        <div className="flex space-x-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                index <= currentStep ? 'bg-neon-gradient' : 'bg-dark-tertiary'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">{steps[currentStep].title}</h1>
          <h2 className="text-xl text-neon-blue font-semibold">{steps[currentStep].subtitle}</h2>
          <p className="text-gray-400">{steps[currentStep].description}</p>
        </div>

        <div className="animate-fade-in">
          {steps[currentStep].component}
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-8">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            canProceed()
              ? 'bg-neon-gradient text-white hover:scale-[1.02] active:scale-[0.98] animate-pulse-neon'
              : 'bg-dark-tertiary text-gray-500 cursor-not-allowed'
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
