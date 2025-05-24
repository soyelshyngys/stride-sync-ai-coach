
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
      <div className="min-h-screen flex flex-col p-6">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 rounded-xl neumorphic mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Foot Analysis</h1>
        </div>

        <div className="flex-1 space-y-8">
          <div className="text-center space-y-4">
            <div className="neumorphic p-8 rounded-3xl">
              <div className="text-6xl mb-4">👣</div>
              <h2 className="text-xl font-semibold text-white mb-2">Foot Structure Analysis</h2>
              <p className="text-gray-400">We'll identify your foot type and arch pattern</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Photo Guidelines:</h3>
            <div className="space-y-3">
              {[
                { icon: '📱', text: 'Take photo from above (top-down view)' },
                { icon: '🦶', text: 'Both feet visible, standing naturally' },
                { icon: '📏', text: 'Feet should fill most of the frame' },
                { icon: '🔍', text: 'Clear view of arch and toe alignment' }
              ].map((guideline, index) => (
                <div key={index} className="flex items-center space-x-3 neumorphic p-4 rounded-xl">
                  <span className="text-2xl">{guideline.icon}</span>
                  <span className="text-gray-300">{guideline.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="neumorphic p-6 rounded-2xl">
            <h4 className="text-white font-semibold mb-3">What we'll analyze:</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Arch Height',
                'Foot Width',
                'Toe Alignment',
                'Pronation Type'
              ].map((feature, index) => (
                <div key={index} className="glass-effect p-3 rounded-xl text-center">
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('capture')}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Start Foot Scan
        </button>
      </div>
    );
  }

  if (step === 'capture') {
    return (
      <div className="min-h-screen flex flex-col p-6">
        <div className="flex items-center mb-8">
          <button onClick={() => setStep('guide')} className="p-2 rounded-xl neumorphic mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Capture Feet</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="neumorphic rounded-3xl p-8 text-center">
            <div className="border-4 border-dashed border-neon-purple/30 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-purple/5 animate-pulse" />
              <div className="text-6xl mb-4">👣</div>
              <h3 className="text-xl font-semibold text-white mb-2">Position Your Feet</h3>
              <p className="text-gray-400 mb-6">Stand naturally, photo from above</p>
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-full h-0.5 bg-neon-purple/50 animate-scan" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload size={20} />
                <span>Upload Foot Photo</span>
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
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="text-center space-y-8">
          <div className="relative">
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Analyzing" 
                className="w-64 h-64 object-cover rounded-2xl neumorphic"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 to-transparent rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="neumorphic p-4 rounded-full animate-pulse-neon">
                <Scan size={32} className="text-neon-purple animate-spin" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Analyzing Foot Structure</h2>
            <p className="text-gray-400">Examining your foot anatomy and biomechanics...</p>
            
            <div className="space-y-2">
              {[
                'Measuring arch height',
                'Analyzing toe alignment',
                'Detecting pronation pattern',
                'Calculating optimal sizing'
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-3 neumorphic p-3 rounded-xl">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
                  <span className="text-gray-300">{step}</span>
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
      <div className="min-h-screen flex flex-col p-6">
        <div className="flex items-center mb-8">
          <button onClick={() => setStep('capture')} className="p-2 rounded-xl neumorphic mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Foot Analysis Results</h1>
        </div>

        <div className="flex-1 space-y-6">
          {/* Foot Type Overview */}
          <div className="neumorphic p-6 rounded-2xl text-center">
            <div className="text-4xl mb-4">👣</div>
            <h3 className="text-2xl font-bold text-white mb-2">{analysis.footType}</h3>
            <p className="text-neon-purple font-semibold">{analysis.pronationType} Pronation</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-effect p-3 rounded-xl">
                <div className="text-sm text-gray-400">Length</div>
                <div className="text-white font-semibold">{analysis.footLength}</div>
              </div>
              <div className="glass-effect p-3 rounded-xl">
                <div className="text-sm text-gray-400">Width</div>
                <div className="text-white font-semibold">{analysis.footWidth}</div>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Foot Characteristics</h3>
            {analysis.characteristics.map((char: string, index: number) => (
              <div key={index} className="neumorphic p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-neon-purple" />
                  <span className="text-gray-300">{char}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Shoe Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Recommended Shoe Features</h3>
            {analysis.shoeFeatures.map((feature: string, index: number) => (
              <div key={index} className="neumorphic p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neon-pink rounded-full" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onComplete(analysis)}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Get Shoe Recommendations
        </button>
      </div>
    );
  }

  return null;
};

export default FootAnalysisScreen;
