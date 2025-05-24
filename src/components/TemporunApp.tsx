
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
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className={`${showBottomNav ? 'pb-20' : ''}`}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <div className="px-6 py-4">
            <div className="flex items-center justify-around">
              <button
                onClick={() => setCurrentScreen('chat')}
                className={`flex flex-col items-center space-y-1 p-3 transition-colors ${
                  currentScreen === 'chat' 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                }`}
              >
                <MessageCircle size={20} />
                <span className="text-xs font-medium">Coach</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('posture')}
                className={`flex flex-col items-center space-y-1 p-3 transition-colors ${
                  currentScreen === 'posture' 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                }`}
              >
                <Camera size={20} />
                <span className="text-xs font-medium">Analyze</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('shoes')}
                className={`flex flex-col items-center space-y-1 p-3 transition-colors ${
                  currentScreen === 'shoes' 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                }`}
              >
                <Target size={20} />
                <span className="text-xs font-medium">Shoes</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('profile')}
                className={`flex flex-col items-center space-y-1 p-3 transition-colors ${
                  currentScreen === 'profile' 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                }`}
              >
                <User size={20} />
                <span className="text-xs font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporunApp;
