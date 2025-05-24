
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

  useEffect(() => {
    // Simulate AI shoe matching
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          name: "Nike Air Zoom Pegasus 40",
          brand: "Nike",
          price: "₸15,600.00",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          matchScore: 95,
          features: ["Neutral pronation support", "Moderate cushioning", "Standard width"],
          reasons: ["Perfect for your normal arch", "Matches your neutral gait", "Ideal for marathon training"],
          colors: ["Black/White", "Blue/Orange", "Grey/Pink"],
          rating: 4.8,
          reviews: 2840,
          inStock: true
        },
        {
          id: 2,
          name: "ASICS Gel-Nimbus 25",
          brand: "ASICS",
          price: "₸21,200.00",
          image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400",
          matchScore: 89,
          features: ["Maximum cushioning", "Superior shock absorption", "Comfortable fit"],
          reasons: ["Excellent for long distance", "Supports your foot type", "Great for injury prevention"],
          colors: ["White/Blue", "Black/Red", "Grey/Yellow"],
          rating: 4.6,
          reviews: 1920,
          inStock: false
        },
        {
          id: 3,
          name: "Brooks Ghost 15",
          brand: "Brooks",
          price: "₸18,900.00",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
          matchScore: 87,
          features: ["Balanced cushioning", "Smooth transitions", "Reliable durability"],
          reasons: ["Complements your running style", "Great for daily training", "Proven track record"],
          colors: ["Navy/White", "Purple/Pink", "Black/Grey"],
          rating: 4.7,
          reviews: 3210,
          inStock: true
        }
      ];
      
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-white">
        <div className="text-center space-y-8 max-w-md">
          <div className="border border-gray-200 p-12 rounded-lg bg-gray-50">
            <Zap size={48} className="text-black mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">FINDING PERFECT SHOES</h2>
            <p className="text-gray-600 mb-8 uppercase text-sm tracking-wider">Analyzing thousands of shoe models...</p>
            
            <div className="space-y-4">
              {[
                'Processing posture analysis',
                'Matching foot biomechanics',
                'Comparing shoe databases',
                'Calculating compatibility scores'
              ].map((step, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 p-3">
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                  <span className="text-gray-800 text-sm uppercase tracking-wider">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black uppercase tracking-wide">SHOP</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-8">
        {/* AI Analysis Summary */}
        <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-3 mb-6">
            <Target size={20} className="text-black" />
            <h3 className="text-lg font-bold text-black uppercase tracking-wider">AI ANALYSIS SUMMARY</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white border border-gray-200 rounded">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Foot Type</div>
              <div className="text-black font-semibold">Normal Arch</div>
            </div>
            <div className="text-center p-4 bg-white border border-gray-200 rounded">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pronation</div>
              <div className="text-black font-semibold">Neutral</div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6">
          {recommendations.map((shoe) => (
            <div key={shoe.id} className="group">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={shoe.image} 
                  alt={shoe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!shoe.inStock && (
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-bold text-black uppercase tracking-wider">
                    SOLD OUT
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {shoe.matchScore}% MATCH
                </div>
                <button className="absolute bottom-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors">
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-black uppercase tracking-wide">{shoe.name}</h4>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 uppercase text-sm tracking-wider">{shoe.brand}</span>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-black fill-current" />
                    <span className="text-sm text-gray-600">{shoe.rating}</span>
                    <span className="text-xs text-gray-400">({shoe.reviews})</span>
                  </div>
                </div>

                <div className="text-black font-bold text-lg">{shoe.price}</div>
                
                {shoe.inStock ? (
                  <span className="text-green-600 text-sm uppercase tracking-wider">In Stock</span>
                ) : (
                  <span className="text-red-600 text-sm uppercase tracking-wider">Sold Out</span>
                )}

                {/* Why it's perfect section */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Why it's perfect for you:</div>
                  <div className="space-y-1">
                    {shoe.reasons.slice(0, 2).map((reason: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-8">
          <button
            onClick={() => onComplete(recommendations)}
            className="w-full bg-black text-white py-4 px-8 rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            CHAT WITH AI COACH
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoeRecommendationScreen;
