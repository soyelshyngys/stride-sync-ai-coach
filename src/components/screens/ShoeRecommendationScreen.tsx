
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Zap, Target, Award, Check, MessageCircle } from 'lucide-react';

interface ShoeRecommendationScreenProps {
  userData: any;
  onComplete: (recommendations: any[]) => void;
  onBack: () => void;
}

const ShoeRecommendationScreen: React.FC<ShoeRecommendationScreenProps> = ({ 
  userData, 
  onComplete, 
  onBack 
}) => {
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate AI shoe matching
    setTimeout(() => {
      const mockRecommendation = {
        id: 1,
        name: "Nike Air Zoom Pegasus 40",
        brand: "Nike",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        matchScore: 95,
        features: ["Neutral pronation support", "Moderate cushioning", "Standard width"],
        reasons: ["Perfect for your normal arch", "Matches your neutral gait", "Ideal for marathon training"],
        colors: ["Black/White", "Blue/Orange", "Grey/Pink"],
        rating: 4.8,
        reviews: 2840,
        inStock: true
      };
      
      setRecommendation(mockRecommendation);
      setLoading(false);
    }, 2000);
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-black">
        <div className="text-center space-y-8 max-w-md">
          <div className="card-minimal p-12 text-center">
            <Zap size={48} className="text-cream mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-cream mb-4 uppercase tracking-wide">FINDING PERFECT SHOE</h2>
            <p className="text-white/60 mb-8 uppercase text-sm tracking-wider">Analyzing your biomechanics...</p>
            
            <div className="space-y-4">
              {[
                'Processing posture analysis',
                'Matching foot biomechanics',
                'Comparing shoe databases',
                'Calculating compatibility score'
              ].map((step, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 p-3">
                  <div className="w-2 h-2 bg-cream rounded-full animate-pulse" />
                  <span className="text-white/80 text-sm uppercase tracking-wider">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 safe-area-inset">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-cream uppercase tracking-wide">PERFECT SHOE MATCH</h1>
        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        <div className="p-6 space-y-8">
          {/* AI Analysis Summary */}
          <div className="card-minimal p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Target size={20} className="text-cream" />
              <h3 className="text-lg font-bold text-cream uppercase tracking-wider">AI ANALYSIS SUMMARY</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Foot Type</div>
                <div className="text-cream font-semibold">Normal Arch</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Pronation</div>
                <div className="text-cream font-semibold">Neutral</div>
              </div>
            </div>
          </div>

          {/* Best Match Banner */}
          {recommendation && (
            <div className="card-minimal p-4 border-cream/20">
              <div className="flex items-center space-x-2 mb-2">
                <Award size={16} className="text-cream" />
                <span className="text-cream text-sm font-bold uppercase tracking-wider">PERFECT MATCH</span>
                <span className="text-cream bg-cream/20 px-2 py-1 rounded text-xs font-bold">
                  {recommendation.matchScore}%
                </span>
              </div>
              <p className="text-white/80 text-sm">{recommendation.name} - Perfect compatibility with your running profile</p>
            </div>
          )}

          {/* Single Shoe Recommendation */}
          {recommendation && (
            <div className="card-minimal p-6">
              <div className="flex flex-col space-y-6">
                {/* Image */}
                <div className="relative w-full h-48 bg-white/5 rounded-lg overflow-hidden">
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Match Score Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-cream text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                      {recommendation.matchScore}% MATCH
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={toggleFavorite}
                      className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                    >
                      <Heart 
                        size={16} 
                        className={`${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} 
                      />
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white text-xl uppercase tracking-wide">{recommendation.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white/60 uppercase text-sm tracking-wider">{recommendation.brand}</span>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-cream fill-current" />
                        <span className="text-sm text-white">{recommendation.rating}</span>
                        <span className="text-xs text-white/40">({recommendation.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-green-400" />
                    <span className="text-green-400 text-sm uppercase tracking-wider">Available</span>
                  </div>

                  {/* Perfect Match Reasons */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-sm text-white/60 uppercase tracking-wider mb-4 flex items-center">
                      <Target size={14} className="mr-2" />
                      Why it's perfect for you:
                    </div>
                    <div className="space-y-3">
                      {recommendation.reasons.map((reason: string, idx: number) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-cream rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-white/80">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-sm text-white/60 uppercase tracking-wider mb-4">Key Features:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {recommendation.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                          <Check size={12} className="text-cream" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Colors */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-sm text-white/60 uppercase tracking-wider mb-3">Available Colors:</div>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.colors.map((color: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed-bottom-cta">
        <div className="p-6">
          <button
            onClick={() => onComplete([recommendation])}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>CHAT WITH AI COACH</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoeRecommendationScreen;
