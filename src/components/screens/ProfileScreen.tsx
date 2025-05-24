
import React from 'react';
import { User, Target, Camera, Award, Settings, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userData, onNavigate }) => {
  const stats = [
    { label: 'ANALYSES', value: '2', icon: Camera },
    { label: 'SHOES MATCHED', value: '3', icon: Target },
    { label: 'COACH CHATS', value: '5', icon: Award },
  ];

  const menuItems = [
    { icon: Camera, label: 'NEW ANALYSIS', action: () => onNavigate('posture') },
    { icon: Target, label: 'SHOE RECOMMENDATIONS', action: () => onNavigate('shoes') },
    { icon: Settings, label: 'SETTINGS', action: () => {} },
    { icon: LogOut, label: 'SIGN OUT', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="text-center p-8 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-widest uppercase">PROFILE</h1>
      </div>

      <div className="p-8 space-y-12">
        {/* Profile Header */}
        <div className="text-center card-minimal p-12 rounded-3xl">
          <div className="w-24 h-24 bg-cream rounded-full mx-auto mb-6 flex items-center justify-center">
            <User size={36} className="text-black" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight uppercase">
            {userData.name || 'RUNNER'}
          </h2>
          <p className="text-white/60 font-medium tracking-widest uppercase text-sm">
            {userData.runningGoals?.replace('_', ' ') || 'RUNNING ENTHUSIAST'}
          </p>
          
          {/* Achievement Badge */}
          <div className="mt-8 inline-flex items-center space-x-3 bg-cream text-black px-6 py-3 rounded-full">
            <Award size={18} />
            <span className="text-sm font-bold tracking-wider uppercase">ANALYSIS COMPLETE</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card-minimal p-6 rounded-2xl text-center hover:bg-white/5 transition-all duration-300">
              <stat.icon size={28} className="text-cream mx-auto mb-4" />
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/50 font-semibold tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="card-minimal p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-8 tracking-widest uppercase">ANALYSIS SUMMARY</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">POSTURE SCORE</span>
              <span className="text-white font-bold text-lg">78/100</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">FOOT TYPE</span>
              <span className="text-white font-bold text-lg">NORMAL ARCH</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">PRONATION</span>
              <span className="text-white font-bold text-lg">NEUTRAL</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">TOP SHOE MATCH</span>
              <span className="text-cream font-bold text-lg">NIKE PEGASUS 40</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full card-minimal p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <item.icon size={24} className="text-cream" />
                  <span className="text-white font-semibold tracking-wider uppercase">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-white/40" />
              </div>
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center pt-12 border-t border-white/10">
          <div className="text-3xl font-black text-white tracking-tight">TEMPORUN</div>
          <p className="text-xs text-white/40 mt-3 font-medium tracking-widest uppercase">AI-POWERED RUNNING COACH V1.0</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
