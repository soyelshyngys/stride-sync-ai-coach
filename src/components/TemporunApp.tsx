
import React, { useState } from 'react';
import { Camera, MessageCircle, Target, User, Zap } from 'lucide-react';
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
          onNavigate={setCurrentScreen}
        />;
      case 'profile':
        return <ProfileScreen 
          userData={userData}
          onNavigate={setCurrentScreen}
        />;
      default:
        return <OnboardingScreen onComplete={() => setCurrentScreen('posture')} />;
    }
  };

  const showBottomNav = !['onboarding', 'posture', 'foot', 'shoes'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-dark-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient animate-gradient-shift" style={{backgroundSize: '400% 400%'}} />
      
      {/* Main Content */}
      <div className={`relative z-10 ${showBottomNav ? 'pb-20' : ''}`}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="neumorphic mx-4 mb-4 rounded-2xl p-4">
            <div className="flex items-center justify-around">
              <button
                onClick={() => setCurrentScreen('chat')}
                className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                  currentScreen === 'chat' 
                    ? 'bg-neon-blue/20 text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageCircle size={24} />
                <span className="text-xs font-medium">Coach</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('posture')}
                className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                  currentScreen === 'posture' 
                    ? 'bg-neon-purple/20 text-neon-purple' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Camera size={24} />
                <span className="text-xs font-medium">Analyze</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('shoes')}
                className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                  currentScreen === 'shoes' 
                    ? 'bg-neon-orange/20 text-neon-orange' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Target size={24} />
                <span className="text-xs font-medium">Shoes</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('profile')}
                className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                  currentScreen === 'profile' 
                    ? 'bg-neon-pink/20 text-neon-pink' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User size={24} />
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
