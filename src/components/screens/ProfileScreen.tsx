
import React from 'react';
import { User, Target, Camera, Award, Settings, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userData, onNavigate }) => {
  const stats = [
    { label: 'Analyses', value: '2', icon: Camera },
    { label: 'Shoes Matched', value: '3', icon: Target },
    { label: 'Coach Chats', value: '5', icon: Award },
  ];

  const menuItems = [
    { icon: Camera, label: 'New Analysis', action: () => onNavigate('posture') },
    { icon: Target, label: 'Shoe Recommendations', action: () => onNavigate('shoes') },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Profile Header */}
        <div className="text-center card-minimal p-8 rounded-lg">
          <div className="w-20 h-20 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{userData.name || 'Runner'}</h2>
          <p className="text-gray-500">{userData.runningGoals?.replace('_', ' ') || 'Running enthusiast'}</p>
          
          {/* Achievement Badge */}
          <div className="mt-6 inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg">
            <Award size={16} />
            <span className="text-sm font-medium">Analysis Complete</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="card-minimal p-4 rounded-lg text-center">
              <stat.icon size={24} className="text-gray-900 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="card-minimal p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Analysis Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Posture Score</span>
              <span className="text-gray-900 font-medium">78/100</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Foot Type</span>
              <span className="text-gray-900 font-medium">Normal Arch</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Pronation</span>
              <span className="text-gray-900 font-medium">Neutral</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-sm">Top Shoe Match</span>
              <span className="text-gray-900 font-medium">Nike Pegasus 40</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full card-minimal p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className="text-gray-900" />
                  <span className="text-gray-900 font-medium">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center pt-8 border-t border-gray-100">
          <div className="text-2xl font-semibold text-gray-900">TEMPORUN</div>
          <p className="text-xs text-gray-500 mt-2">AI-Powered Running Coach v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
