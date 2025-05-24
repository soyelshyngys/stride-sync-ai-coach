
import React from 'react';
import { User, Target, Camera, Award, Settings, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userData, onNavigate }) => {
  const stats = [
    { label: 'Analyses Done', value: '2', icon: Camera, color: 'text-black' },
    { label: 'Shoes Matched', value: '3', icon: Target, color: 'text-black' },
    { label: 'Coach Chats', value: '5', icon: Award, color: 'text-black' },
  ];

  const menuItems = [
    { icon: Camera, label: 'New Analysis', action: () => onNavigate('posture'), color: 'text-black' },
    { icon: Target, label: 'Shoe Recommendations', action: () => onNavigate('shoes'), color: 'text-black' },
    { icon: Settings, label: 'Settings', action: () => {}, color: 'text-gray-600' },
    { icon: LogOut, label: 'Sign Out', action: () => {}, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-black uppercase tracking-wide">ACCOUNT</h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Profile Header */}
        <div className="text-center border border-gray-200 p-8 rounded-lg bg-gray-50">
          <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2 uppercase tracking-wide">{userData.name || 'RUNNER'}</h2>
          <p className="text-gray-600 uppercase tracking-wider text-sm">{userData.runningGoals?.replace('_', ' ') || 'RUNNING ENTHUSIAST'}</p>
          
          {/* Achievement Badge */}
          <div className="mt-6 inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg">
            <Award size={16} />
            <span className="text-sm font-medium uppercase tracking-wider">ANALYSIS COMPLETE</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg text-center bg-gray-50">
              <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-black">{stat.value}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-wider">ANALYSIS SUMMARY</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600 uppercase tracking-wider text-sm">Posture Score</span>
              <span className="text-black font-bold">78/100</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600 uppercase tracking-wider text-sm">Foot Type</span>
              <span className="text-black font-bold">Normal Arch</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600 uppercase tracking-wider text-sm">Pronation</span>
              <span className="text-black font-bold">Neutral</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 uppercase tracking-wider text-sm">Top Shoe Match</span>
              <span className="text-black font-bold">Nike Pegasus 40</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className={item.color} />
                  <span className="text-black font-medium uppercase tracking-wider">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center pt-8 border-t border-gray-100">
          <div className="text-2xl font-bold text-black uppercase tracking-wider">
            TEMPORUN
          </div>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">AI-Powered Running Coach v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
