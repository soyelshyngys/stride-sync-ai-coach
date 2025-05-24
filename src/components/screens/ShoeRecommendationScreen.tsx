
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, ShoppingBag, Zap, Target, Award } from 'lucide-react';

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
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedShoe, setSelectedShoe] = useState<any>(null);

  useEffect(() => {
    // Simulate AI shoe matching
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          name: "Nike Air Zoom Pegasus 40",
          brand: "Nike",
          price: "$130",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
          matchScore: 95,
          features: ["Neutral pronation support", "Moderate cushioning", "Standard width"],
          reasons: ["Perfect for your normal arch", "Matches your neutral gait", "Ideal for marathon training"],
          colors: ["Black/White", "Blue/Orange", "Grey/Pink"],
          rating: 4.8,
          reviews: 2840
        },
        {
          id: 2,
          name: "ASICS Gel-Nimbus 25",
          brand: "ASICS",
          price: "$160",
          image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300",
          matchScore: 89,
          features: ["Maximum cushioning", "Superior shock absorption", "Comfortable fit"],
          reasons: ["Excellent for long distance", "Supports your foot type", "Great for injury prevention"],
          colors: ["White/Blue", "Black/Red", "Grey/Yellow"],
          rating: 4.6,
          reviews: 1920
        },
        {
          id: 3,
          name: "Brooks Ghost 15",
          brand: "Brooks",
          price: "$140",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
          matchScore: 87,
          features: ["Balanced cushioning", "Smooth transitions", "Reliable durability"],
          reasons: ["Complements your running style", "Great for daily training", "Proven track record"],
          colors: ["Navy/White", "Purple/Pink", "Black/Grey"],
          rating: 4.7,
          reviews: 3210
        }
      ];
      
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="text-center space-y-8">
          <div className="neumorphic p-8 rounded-3xl">
            <Zap size={64} className="text-neon-orange mx-auto mb-4 animate-pulse-neon" />
            <h2 className="text-2xl font-bold text-white mb-4">Finding Perfect Shoes</h2>
            <p className="text-gray-400 mb-6">Analyzing thousands of shoe models...</p>
            
            <div className="space-y-3">
              {[
                'Processing posture analysis',
                'Matching foot biomechanics',
                'Comparing shoe databases',
                'Calculating compatibility scores'
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-3 glass-effect p-3 rounded-xl">
                  <div className="w-2 h-2 bg-neon-orange rounded-full animate-pulse" />
                  <span className="text-gray-300 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-xl neumorphic mr-4">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Shoe Recommendations</h1>
      </div>

      <div className="flex-1 space-y-6">
        {/* AI Insights */}
        <div className="neumorphic p-6 rounded-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <Target size={24} className="text-neon-orange" />
            <h3 className="text-lg font-semibold text-white">AI Analysis Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-3 rounded-xl text-center">
              <div className="text-sm text-gray-400">Foot Type</div>
              <div className="text-white font-semibold">Normal Arch</div>
            </div>
            <div className="glass-effect p-3 rounded-xl text-center">
              <div className="text-sm text-gray-400">Pronation</div>
              <div className="text-white font-semibold">Neutral</div>
            </div>
          </div>
        </div>

        {/* Shoe Recommendations */}
        <div className="space-y-4">
          {recommendations.map((shoe, index) => (
            <div key={shoe.id} className="neumorphic p-6 rounded-2xl">
              <div className="flex items-start space-x-4">
                <img 
                  src={shoe.image} 
                  alt={shoe.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{shoe.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Award size={16} className="text-neon-orange" />
                      <span className="text-neon-orange font-bold">{shoe.matchScore}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-gray-400">{shoe.brand}</span>
                    <span className="text-neon-blue font-semibold">{shoe.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{shoe.rating}</span>
                      <span className="text-xs text-gray-500">({shoe.reviews})</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-400">Why it's perfect for you:</div>
                    {shoe.reasons.slice(0, 2).map((reason: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-neon-blue rounded-full" />
                        <span className="text-sm text-gray-300">{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-neon-gradient p-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-center justify-center space-x-2">
                        <ShoppingBag size={16} />
                        <span>View Details</span>
                      </div>
                    </button>
                    <button className="p-3 neumorphic rounded-xl">
                      <Heart size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            onClick={() => onComplete(recommendations)}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-neon-orange to-neon-pink text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Chat with AI Coach
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoeRecommendationScreen;
