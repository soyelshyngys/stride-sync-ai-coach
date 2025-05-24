
import React, { useState } from 'react';
import { ChevronRight, Target, Camera, MessageCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OnboardingScreenProps {
  onComplete: (data: { name: string; runningGoals: string }) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [runningGoals, setRunningGoals] = useState('');

  const steps = [
    {
      title: "TEMPORUN",
      subtitle: "AI-POWERED RUNNING INTELLIGENCE",
      description: "ANALYZE YOUR POSTURE, DISCOVER YOUR FOOT TYPE, AND GET PERSONALIZED SHOE RECOMMENDATIONS",
      component: (
        <div className="text-center space-y-8 sm:space-y-12">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-center space-x-6 sm:space-x-12">
              <div className="card-minimal p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 transition-all duration-500">
                <Camera size={32} className="text-cream mx-auto sm:w-10 sm:h-10" />
              </div>
              <div className="card-minimal p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 transition-all duration-500">
                <Target size={32} className="text-cream mx-auto sm:w-10 sm:h-10" />
              </div>
              <div className="card-minimal p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 transition-all duration-500">
                <MessageCircle size={32} className="text-cream mx-auto sm:w-10 sm:h-10" />
              </div>
            </div>
            <p className="text-white/60 text-base sm:text-lg font-medium tracking-wide max-w-sm sm:max-w-lg mx-auto uppercase px-4">
              PERSONALIZED RUNNING INSIGHTS POWERED BY AI ANALYSIS
            </p>
          </div>
        </div>
      )
    },
    {
      title: "WHAT'S YOUR NAME?",
      subtitle: "LET'S PERSONALIZE YOUR EXPERIENCE",
      description: "WE'LL USE THIS TO CUSTOMIZE YOUR RECOMMENDATIONS",
      component: (
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
          <div className="card-minimal p-6 sm:p-8 rounded-xl sm:rounded-2xl">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER YOUR NAME"
              className="w-full bg-transparent text-xl sm:text-2xl font-semibold text-white placeholder-white/30 border-none outline-none uppercase tracking-wider text-center sm:text-left"
              autoFocus
            />
          </div>
        </div>
      )
    },
    {
      title: "WHAT ARE YOUR RUNNING GOALS?",
      subtitle: "HELP US UNDERSTAND YOUR NEEDS",
      description: "THIS HELPS US PROVIDE BETTER RECOMMENDATIONS",
      component: (
        <div className="h-full flex flex-col px-4 sm:px-0">
          <ScrollArea className="flex-1 w-full">
            <div className="space-y-4 pb-8 pr-4">
              {[
                { id: 'casual', label: 'CASUAL FITNESS', desc: 'STAY HEALTHY AND ACTIVE' },
                { id: 'marathon', label: 'MARATHON TRAINING', desc: 'LONG DISTANCE GOALS' },
                { id: 'speed', label: 'SPEED & PERFORMANCE', desc: 'PERSONAL RECORDS' },
                { id: 'recovery', label: 'INJURY RECOVERY', desc: 'GETTING BACK ON TRACK' }
              ].map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setRunningGoals(goal.id)}
                  className={`w-full p-6 sm:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform active:scale-[0.98] touch-manipulation ${
                    runningGoals === goal.id
                      ? 'bg-cream text-black'
                      : 'card-minimal hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  <div className="text-left">
                    <div className={`text-lg sm:text-xl font-bold mb-2 tracking-wide ${
                      runningGoals === goal.id ? 'text-black' : 'text-white'
                    }`}>
                      {goal.label}
                    </div>
                    <div className={`text-sm font-medium tracking-wider ${
                      runningGoals === goal.id ? 'text-black/60' : 'text-white/40'
                    }`}>
                      {goal.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
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
    <div className="min-h-screen bg-black flex flex-col safe-area-inset overflow-hidden">
      {/* Progress Bar */}
      <div className="flex-shrink-0 p-4 sm:p-8 pb-0">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                index <= currentStep ? 'bg-cream' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-4 sm:p-8 pt-8 sm:pt-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {steps[currentStep].title}
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-white/70 tracking-widest uppercase">
              {steps[currentStep].subtitle}
            </h2>
            <p className="text-white/50 font-medium tracking-wide uppercase text-xs sm:text-sm">
              {steps[currentStep].description}
            </p>
          </div>
        </div>

        {/* Step Content - Flexible container for scrolling */}
        <div className="flex-1 px-4 sm:px-8 pb-4 overflow-hidden min-h-0">
          {steps[currentStep].component}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed-bottom-cta">
        <div className="p-4 sm:p-6 safe-area-bottom">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full transition-all duration-300 transform active:scale-[0.98] touch-manipulation ${
              canProceed()
                ? 'btn-primary hover:scale-[1.02]'
                : 'bg-white/10 text-white/30 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="font-bold tracking-widest">
                {currentStep === steps.length - 1 ? 'START ANALYSIS' : 'CONTINUE'}
              </span>
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
