
import React, { useState } from 'react';
import { Camera, MessageCircle, Target, User } from 'lucide-react';
import OnboardingScreen from './screens/OnboardingScreen';
import PostureAnalysisScreen from './screens/PostureAnalysisScreen';
import FootAnalysisScreen from './screens/FootAnalysisScreen';
import ShoeRecommendationScreen from './screens/ShoeRecommendationScreen';
import CoachChatScreen from './screens/CoachChatScreen';
import ProfileScreen from './screens/ProfileScreen';

type Screen = 'onboarding' | 'posture' | 'foot' | 'shoes' | 'chat' | 'profile';

const TemporunApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userData, setUserData] = useState({
    name: '',
    runningGoals: '',
    postureAnalysis: null,
    footAnalysis: null,
    shoeRecommendations: []
  });

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={(data) => {
          setUserData(prev => ({...prev, ...data}));
          setCurrentScreen('posture');
        }} />;
      case 'posture':
        return <PostureAnalysisScreen 
          onComplete={(analysis) => {
            setUserData(prev => ({...prev, postureAnalysis: analysis}));
            setCurrentScreen('foot');
          }}
          onBack={() => setCurrentScreen('onboarding')}
        />;
      case 'foot':
        return <FootAnalysisScreen 
          onComplete={(analysis) => {
            setUserData(prev => ({...prev, footAnalysis: analysis}));
            setCurrentScreen('shoes');
          }}
          onBack={() => setCurrentScreen('posture')}
        />;
      case 'shoes':
        return <ShoeRecommendationScreen 
          userData={userData}
          onComplete={(recommendations) => {
            setUserData(prev => ({...prev, shoeRecommendations: recommendations}));
            setCurrentScreen('chat');
          }}
          onBack={() => setCurrentScreen('foot')}
        />;
      case 'chat':
        return <CoachChatScreen 
          userData={userData}
          onNavigate={handleNavigate}
        />;
      case 'profile':
        return <ProfileScreen 
          userData={userData}
          onNavigate={handleNavigate}
        />;
      default:
        return <OnboardingScreen onComplete={() => setCurrentScreen('posture')} />;
    }
  };

  const showBottomNav = !['onboarding', 'posture', 'foot', 'shoes'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Main Content */}
      <div className="h-screen overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-white/10 safe-area-bottom">
          <div className="px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-around max-w-lg mx-auto">
              <button
                onClick={() => setCurrentScreen('chat')}
                className={`flex flex-col items-center space-y-1 p-3 min-w-0 transition-all duration-300 touch-manipulation ${
                  currentScreen === 'chat' 
                    ? 'text-cream transform scale-110' 
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <MessageCircle size={20} className="flex-shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase">COACH</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('posture')}
                className={`flex flex-col items-center space-y-1 p-3 min-w-0 transition-all duration-300 touch-manipulation ${
                  currentScreen === 'posture' 
                    ? 'text-cream transform scale-110' 
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Camera size={20} className="flex-shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase">ANALYZE</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('shoes')}
                className={`flex flex-col items-center space-y-1 p-3 min-w-0 transition-all duration-300 touch-manipulation ${
                  currentScreen === 'shoes' 
                    ? 'text-cream transform scale-110' 
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Target size={20} className="flex-shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase">SHOES</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('profile')}
                className={`flex flex-col items-center space-y-1 p-3 min-w-0 transition-all duration-300 touch-manipulation ${
                  currentScreen === 'profile' 
                    ? 'text-cream transform scale-110' 
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <User size={20} className="flex-shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase">PROFILE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporunApp;
