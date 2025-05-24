
import React from 'react';
import { User, Target, Camera, Award, Settings, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userData, onNavigate }) => {
  const stats = [
    { label: 'Analyses Done', value: '2', icon: Camera, color: 'text-neon-blue' },
    { label: 'Shoes Matched', value: '3', icon: Target, color: 'text-neon-purple' },
    { label: 'Coach Chats', value: '5', icon: Award, color: 'text-neon-orange' },
  ];

  const menuItems = [
    { icon: Camera, label: 'New Analysis', action: () => onNavigate('posture'), color: 'text-neon-blue' },
    { icon: Target, label: 'Shoe Recommendations', action: () => onNavigate('shoes'), color: 'text-neon-purple' },
    { icon: Settings, label: 'Settings', action: () => {}, color: 'text-gray-400' },
    { icon: LogOut, label: 'Sign Out', action: () => {}, color: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Profile Header */}
      <div className="neumorphic p-6 rounded-2xl text-center">
        <div className="neumorphic w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User size={40} className="text-neon-blue" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{userData.name || 'Runner'}</h2>
        <p className="text-gray-400 capitalize">{userData.runningGoals?.replace('_', ' ') || 'Running Enthusiast'}</p>
        
        {/* Achievement Badge */}
        <div className="mt-4 inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
          <Award size={16} className="text-neon-orange" />
          <span className="text-sm text-white font-medium">Analysis Complete</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="neumorphic p-4 rounded-xl text-center">
            <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="neumorphic p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Analysis Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Posture Score</span>
            <span className="text-neon-blue font-semibold">78/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Foot Type</span>
            <span className="text-white">Normal Arch</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Pronation</span>
            <span className="text-white">Neutral</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Top Shoe Match</span>
            <span className="text-neon-orange">Nike Pegasus 40</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full neumorphic p-4 rounded-xl hover:bg-dark-tertiary transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon size={20} className={item.color} />
                <span className="text-white font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="text-center pt-6">
        <div className="text-lg font-bold bg-neon-gradient bg-clip-text text-transparent">
          TEMPORUN
        </div>
        <p className="text-xs text-gray-500 mt-1">AI-Powered Running Coach v1.0</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
