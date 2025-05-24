import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, ShoppingBag, Zap, Target, Award, Check, MessageCircle } from 'lucide-react';

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
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Simulate AI shoe matching
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          name: "Nike Air Zoom Pegasus 40",
          brand: "Nike",
          price: "₸15,600.00",
          originalPrice: "₸18,200.00",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          matchScore: 95,
          features: ["Neutral pronation support", "Moderate cushioning", "Standard width"],
          reasons: ["Perfect for your normal arch", "Matches your neutral gait", "Ideal for marathon training"],
          colors: ["Black/White", "Blue/Orange", "Grey/Pink"],
          rating: 4.8,
          reviews: 2840,
          inStock: true,
          discount: 14
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

  const toggleFavorite = (shoeId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(shoeId)) {
        newFavorites.delete(shoeId);
      } else {
        newFavorites.add(shoeId);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-black">
        <div className="text-center space-y-8 max-w-md">
          <div className="card-minimal p-12 text-center">
            <Zap size={48} className="text-cream mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-cream mb-4 uppercase tracking-wide">FINDING PERFECT SHOES</h2>
            <p className="text-white/60 mb-8 uppercase text-sm tracking-wider">Analyzing thousands of shoe models...</p>
            
            <div className="space-y-4">
              {[
                'Processing posture analysis',
                'Matching foot biomechanics',
                'Comparing shoe databases',
                'Calculating compatibility scores'
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
        <h1 className="text-xl font-bold text-cream uppercase tracking-wide">SHOE RECOMMENDATIONS</h1>
        <div className="w-10" />
      </div>

      <div className="overflow-y-auto content-with-fixed-cta">
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
          {recommendations[0] && (
            <div className="card-minimal p-4 border-cream/20">
              <div className="flex items-center space-x-2 mb-2">
                <Award size={16} className="text-cream" />
                <span className="text-cream text-sm font-bold uppercase tracking-wider">BEST MATCH</span>
                <span className="text-cream bg-cream/20 px-2 py-1 rounded text-xs font-bold">
                  {recommendations[0].matchScore}%
                </span>
              </div>
              <p className="text-white/80 text-sm">{recommendations[0].name} - Perfect compatibility with your running profile</p>
            </div>
          )}

          {/* Product Grid */}
          <div className="space-y-6">
            {recommendations.map((shoe, index) => (
              <div key={shoe.id} className="card-minimal p-6 group">
                <div className="flex flex-col space-y-4">
                  {/* Image and Quick Actions */}
                  <div className="relative aspect-square bg-white/5 rounded-lg overflow-hidden">
                    <img 
                      src={shoe.image} 
                      alt={shoe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      <div className="bg-cream text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                        {shoe.matchScore}% MATCH
                      </div>
                      {index === 0 && (
                        <div className="bg-black/80 text-cream px-3 py-1 text-xs font-bold uppercase tracking-wider rounded border border-cream/20">
                          BEST PICK
                        </div>
                      )}
                      {shoe.discount && (
                        <div className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                          -{shoe.discount}%
                        </div>
                      )}
                    </div>

                    {/* Favorite & Stock Status */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <button 
                        onClick={() => toggleFavorite(shoe.id)}
                        className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                      >
                        <Heart 
                          size={16} 
                          className={`${favorites.has(shoe.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                        />
                      </button>
                      {!shoe.inStock && (
                        <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider rounded">
                          SOLD OUT
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-white text-lg uppercase tracking-wide">{shoe.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/60 uppercase text-sm tracking-wider">{shoe.brand}</span>
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-cream fill-current" />
                          <span className="text-sm text-white">{shoe.rating}</span>
                          <span className="text-xs text-white/40">({shoe.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3">
                      <span className="text-cream font-bold text-xl">{shoe.price}</span>
                      {shoe.originalPrice && (
                        <span className="text-white/40 line-through text-sm">{shoe.originalPrice}</span>
                      )}
                    </div>
                    
                    {/* Stock Status */}
                    <div className="flex items-center space-x-2">
                      {shoe.inStock ? (
                        <>
                          <Check size={14} className="text-green-400" />
                          <span className="text-green-400 text-sm uppercase tracking-wider">In Stock</span>
                        </>
                      ) : (
                        <span className="text-red-400 text-sm uppercase tracking-wider">Sold Out</span>
                      )}
                    </div>

                    {/* Perfect Match Reasons */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-sm text-white/60 uppercase tracking-wider mb-3 flex items-center">
                        <Target size={14} className="mr-2" />
                        Why it's perfect for you:
                      </div>
                      <div className="space-y-2">
                        {shoe.reasons.slice(0, 2).map((reason: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-cream rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-white/80">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      disabled={!shoe.inStock}
                      className={`w-full py-3 px-6 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                        shoe.inStock
                          ? 'btn-primary hover:scale-[1.02] active:scale-[0.98]'
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      {shoe.inStock ? 'VIEW DETAILS' : 'NOTIFY WHEN AVAILABLE'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed-bottom-cta">
        <div className="p-6">
          <button
            onClick={() => onComplete(recommendations)}
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
