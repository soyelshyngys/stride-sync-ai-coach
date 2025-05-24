
import React, { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Scan, CheckCircle } from 'lucide-react';

interface FootAnalysisScreenProps {
  onComplete: (analysis: any) => void;
  onBack: () => void;
}

const FootAnalysisScreen: React.FC<FootAnalysisScreenProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<'guide' | 'capture' | 'analyzing' | 'results'>('guide');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setStep('analyzing');
        
        setTimeout(() => {
          setAnalysis({
            footType: 'Normal Arch',
            pronationType: 'Neutral',
            footLength: '26.5 cm',
            footWidth: 'Medium',
            characteristics: [
              'Normal arch height provides good shock absorption',
              'Neutral pronation pattern - ideal for most shoes',
              'Medium width fits standard shoe sizing'
            ],
            shoeFeatures: [
              'Moderate cushioning',
              'Standard stability features',
              'Regular width fitting'
            ]
          });
          setStep('results');
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  if (step === 'guide') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-4 sm:p-6 safe-area-inset overflow-hidden">
        <div className="flex items-center mb-6 sm:mb-8 flex-shrink-0">
          <button 
            onClick={onBack} 
            className="p-3 rounded-xl card-minimal mr-4 touch-manipulation active:scale-95 transition-transform"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider uppercase">FOOT ANALYSIS</h1>
        </div>

        <div className="flex-1 space-y-6 sm:space-y-8 overflow-y-auto">
          <div className="text-center space-y-4 flex-shrink-0">
            <div className="card-minimal p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <div className="text-4xl sm:text-6xl mb-4">👣</div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-wide uppercase">FOOT STRUCTURE ANALYSIS</h2>
              <p className="text-white/60 font-medium tracking-wider uppercase text-sm">IDENTIFY YOUR FOOT TYPE AND ARCH PATTERN</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wider uppercase px-2">PHOTO GUIDELINES:</h3>
            <div className="space-y-3">
              {[
                { icon: '📱', text: 'Take photo from above (top-down view)' },
                { icon: '🦶', text: 'Both feet visible, standing naturally' },
                { icon: '📏', text: 'Feet should fill most of the frame' },
                { icon: '🔍', text: 'Clear view of arch and toe alignment' }
              ].map((guideline, index) => (
                <div key={index} className="flex items-center space-x-3 card-minimal p-4 rounded-xl">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{guideline.icon}</span>
                  <span className="text-white/80 font-medium text-sm sm:text-base">{guideline.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-minimal p-4 sm:p-6 rounded-xl sm:rounded-2xl">
            <h4 className="text-white font-bold mb-3 tracking-wider uppercase text-sm sm:text-base">WHAT WE'LL ANALYZE:</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                'ARCH HEIGHT',
                'FOOT WIDTH',
                'TOE ALIGNMENT',
                'PRONATION TYPE'
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 p-3 rounded-xl text-center">
                  <span className="text-xs sm:text-sm text-white/80 font-semibold tracking-wider uppercase">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex-shrink-0">
          <button
            onClick={() => setStep('capture')}
            className="btn-primary w-full touch-manipulation active:scale-[0.98] transition-transform"
          >
            <span className="font-bold tracking-widest uppercase">START FOOT SCAN</span>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'capture') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-4 sm:p-6 safe-area-inset overflow-hidden">
        <div className="flex items-center mb-6 sm:mb-8 flex-shrink-0">
          <button 
            onClick={() => setStep('guide')} 
            className="p-3 rounded-xl card-minimal mr-4 touch-manipulation active:scale-95 transition-transform"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider uppercase">CAPTURE FEET</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-6 sm:space-y-8">
          <div className="card-minimal rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
            <div className="border-4 border-dashed border-cream/30 rounded-xl sm:rounded-2xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-cream/5 animate-pulse" />
              <div className="text-4xl sm:text-6xl mb-4">👣</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-wide uppercase">POSITION YOUR FEET</h3>
              <p className="text-white/60 mb-6 font-medium tracking-wider uppercase text-sm">STAND NATURALLY, PHOTO FROM ABOVE</p>
            </div>
          </div>

          <div className="space-y-4 px-4 sm:px-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary w-full touch-manipulation active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center justify-center space-x-3">
                <Upload size={20} />
                <span className="font-bold tracking-widest uppercase">UPLOAD FOOT PHOTO</span>
              </div>
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4 sm:p-6 safe-area-inset">
        <div className="text-center space-y-6 sm:space-y-8 max-w-sm mx-auto">
          <div className="relative">
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Analyzing" 
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-xl sm:rounded-2xl card-minimal mx-auto"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl sm:rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="card-minimal p-4 rounded-full animate-pulse">
                <Scan size={28} className="text-cream animate-spin" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">ANALYZING FOOT STRUCTURE</h2>
            <p className="text-white/60 font-medium tracking-wider uppercase text-sm">EXAMINING YOUR FOOT ANATOMY AND BIOMECHANICS...</p>
            
            <div className="space-y-2">
              {[
                'MEASURING ARCH HEIGHT',
                'ANALYZING TOE ALIGNMENT',
                'DETECTING PRONATION PATTERN',
                'CALCULATING OPTIMAL SIZING'
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-3 card-minimal p-3 rounded-xl">
                  <div className="w-2 h-2 bg-cream rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-white/80 font-medium text-sm tracking-wider uppercase">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && analysis) {
    return (
      <div className="min-h-screen bg-black flex flex-col p-4 sm:p-6 safe-area-inset overflow-hidden">
        <div className="flex items-center mb-6 sm:mb-8 flex-shrink-0">
          <button 
            onClick={() => setStep('capture')} 
            className="p-3 rounded-xl card-minimal mr-4 touch-manipulation active:scale-95 transition-transform"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wider uppercase">FOOT ANALYSIS RESULTS</h1>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          {/* Foot Type Overview */}
          <div className="card-minimal p-6 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl mb-4">👣</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide uppercase">{analysis.footType}</h3>
            <p className="text-cream font-bold tracking-wider uppercase">{analysis.pronationType} PRONATION</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-xs text-white/60 font-semibold tracking-wider uppercase">LENGTH</div>
                <div className="text-white font-bold">{analysis.footLength}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-xs text-white/60 font-semibold tracking-wider uppercase">WIDTH</div>
                <div className="text-white font-bold">{analysis.footWidth}</div>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wider uppercase">FOOT CHARACTERISTICS</h3>
            {analysis.characteristics.map((char: string, index: number) => (
              <div key={index} className="card-minimal p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-cream flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 font-medium text-sm">{char}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Shoe Features */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wider uppercase">RECOMMENDED SHOE FEATURES</h3>
            {analysis.shoeFeatures.map((feature: string, index: number) => (
              <div key={index} className="card-minimal p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cream rounded-full flex-shrink-0 mt-2" />
                  <span className="text-white/80 font-medium text-sm">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 flex-shrink-0">
          <button
            onClick={() => onComplete(analysis)}
            className="btn-primary w-full touch-manipulation active:scale-[0.98] transition-transform"
          >
            <span className="font-bold tracking-widest uppercase">GET SHOE RECOMMENDATIONS</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default FootAnalysisScreen;
