
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
      <div className="h-screen flex flex-col bg-black">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 safe-area-inset">
          <button 
            onClick={onBack} 
            className="p-2 sm:p-3 hover:bg-white/5 rounded-xl transition-colors mr-3 sm:mr-4 touch-manipulation"
          >
            <ArrowLeft size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-widest uppercase">
            FOOT ANALYSIS
          </h1>
        </div>

        {/* Scrollable Content with bottom padding for CTA */}
        <div className="flex-1 overflow-y-auto pb-24 sm:pb-28">
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
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
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 sm:p-6 safe-area-bottom">
          <button
            onClick={() => setStep('capture')}
            className="w-full btn-primary text-lg sm:text-xl py-4 sm:py-6 touch-manipulation"
          >
            START FOOT SCAN
          </button>
        </div>
      </div>
    );
  }

  if (step === 'capture') {
    return (
      <div className="h-screen flex flex-col bg-black">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 safe-area-inset">
          <button 
            onClick={() => setStep('guide')} 
            className="p-2 sm:p-3 hover:bg-white/5 rounded-xl transition-colors mr-3 sm:mr-4 touch-manipulation"
          >
            <ArrowLeft size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-widest uppercase">
            CAPTURE FEET
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 pb-24 sm:pb-28">
          <div className="space-y-8 sm:space-y-12 max-w-2xl mx-auto w-full">
            <div className="card-minimal rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
              <div className="border-4 border-dashed border-cream/30 rounded-xl sm:rounded-2xl p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-cream/5 animate-pulse" />
                <div className="text-4xl sm:text-6xl mb-4">👣</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-wide uppercase">POSITION YOUR FEET</h3>
                <p className="text-white/60 mb-6 font-medium tracking-wider uppercase text-sm">STAND NATURALLY, PHOTO FROM ABOVE</p>
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 sm:p-6 safe-area-bottom">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full btn-primary text-lg sm:text-xl py-4 sm:py-6 touch-manipulation"
          >
            <div className="flex items-center justify-center space-x-3">
              <Upload size={20} />
              <span>UPLOAD FOOT PHOTO</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black p-4 sm:p-6 safe-area-inset">
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
      <div className="h-screen flex flex-col bg-black">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 safe-area-inset">
          <button 
            onClick={() => setStep('capture')} 
            className="p-2 sm:p-3 hover:bg-white/5 rounded-xl transition-colors mr-3 sm:mr-4 touch-manipulation"
          >
            <ArrowLeft size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-widest uppercase">
            FOOT ANALYSIS RESULTS
          </h1>
        </div>

        {/* Scrollable Content with bottom padding for CTA */}
        <div className="flex-1 overflow-y-auto pb-24 sm:pb-28">
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6 max-w-2xl mx-auto">
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
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 sm:p-6 safe-area-bottom">
          <button
            onClick={() => onComplete(analysis)}
            className="w-full btn-primary text-lg sm:text-xl py-4 sm:py-6 touch-manipulation"
          >
            GET SHOE RECOMMENDATIONS
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default FootAnalysisScreen;
