
import React, { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Scan, CheckCircle, AlertCircle } from 'lucide-react';

interface PostureAnalysisScreenProps {
  onComplete: (analysis: any) => void;
  onBack: () => void;
}

const PostureAnalysisScreen: React.FC<PostureAnalysisScreenProps> = ({ onComplete, onBack }) => {
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
        
        // Simulate AI analysis
        setTimeout(() => {
          setAnalysis({
            overallScore: 78,
            issues: [
              { type: 'Forward Head Posture', severity: 'moderate', angle: '15°' },
              { type: 'Pelvic Tilt', severity: 'mild', angle: '8°' }
            ],
            recommendations: [
              'Focus on core strengthening exercises',
              'Consider heel-to-toe ratio in shoe selection',
              'Work on head position during runs'
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
            POSTURE ANALYSIS
          </h1>
        </div>

        {/* Scrollable Content with bottom padding for CTA */}
        <div className="flex-1 overflow-y-auto pb-24 sm:pb-28">
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12 max-w-2xl mx-auto">
            {/* Main Guide Section */}
            <div className="text-center">
              <div className="card-minimal p-8 sm:p-12 rounded-2xl sm:rounded-3xl">
                <Camera size={48} className="text-cream mx-auto mb-6 sm:w-18 sm:h-18" />
                <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 sm:mb-6 tracking-tight uppercase">
                  SIDE PROFILE PHOTO
                </h2>
                <p className="text-white/60 text-sm sm:text-lg font-medium tracking-wider uppercase">
                  AI analysis of your running posture
                </p>
              </div>
            </div>

            {/* Guidelines */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase text-center">
                PHOTO GUIDELINES
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: '📱', text: 'Hold phone horizontally (landscape mode)' },
                  { icon: '👤', text: 'Stand in running position from the side' },
                  { icon: '💡', text: 'Ensure good lighting and clear background' },
                  { icon: '📏', text: 'Full body should be visible in frame' }
                ].map((guideline, index) => (
                  <div key={index} className="card-minimal p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{guideline.icon}</span>
                      <span className="text-white font-medium tracking-wider uppercase text-sm sm:text-lg">
                        {guideline.text}
                      </span>
                    </div>
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
            READY TO CAPTURE
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
            CAPTURE PHOTO
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 pb-24 sm:pb-28">
          <div className="space-y-8 sm:space-y-12 max-w-2xl mx-auto w-full">
            {/* Capture Area */}
            <div className="card-minimal rounded-2xl sm:rounded-3xl p-6 sm:p-12">
              <div className="border-4 border-dashed border-cream/30 rounded-2xl sm:rounded-3xl p-8 sm:p-16 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-cream/5 animate-pulse" />
                <Camera size={64} className="text-cream mx-auto mb-6 sm:w-24 sm:h-24 sm:mb-8" />
                <h3 className="text-xl sm:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight uppercase">
                  POSITION YOURSELF
                </h3>
                <p className="text-white/60 text-sm sm:text-lg font-medium tracking-wider uppercase">
                  Stand sideways in running stance
                </p>
                
                {/* Scanning animation overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute w-full h-0.5 bg-cream/50 animate-pulse" />
                </div>
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
              <Upload size={20} className="sm:w-6 sm:h-6" />
              <span>UPLOAD PHOTO</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black p-4 sm:p-8 safe-area-inset">
        <div className="text-center space-y-8 sm:space-y-12 max-w-md mx-auto">
          {/* Image Preview */}
          <div className="relative">
            {imagePreview && (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Analyzing" 
                  className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl sm:rounded-3xl border border-white/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl sm:rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="card-minimal p-4 sm:p-6 rounded-full">
                    <Scan size={32} className="text-cream animate-spin sm:w-10 sm:h-10" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Analysis Status */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight uppercase">
                ANALYZING POSTURE
              </h2>
              <p className="text-white/60 text-sm sm:text-lg font-medium tracking-wider uppercase">
                AI examining your running stance
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {[
                'Detecting body landmarks',
                'Measuring joint angles',
                'Analyzing alignment',
                'Generating recommendations'
              ].map((step, index) => (
                <div key={index} className="card-minimal p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cream rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-white font-medium tracking-wider uppercase text-sm sm:text-base">
                      {step}
                    </span>
                  </div>
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
            ANALYSIS RESULTS
          </h1>
        </div>

        {/* Scrollable Content with bottom padding for CTA */}
        <div className="flex-1 overflow-y-auto pb-24 sm:pb-28">
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12 max-w-2xl mx-auto">
            {/* Overall Score */}
            <div className="card-minimal p-8 sm:p-12 rounded-2xl sm:rounded-3xl text-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8">
                <svg className="w-32 h-32 sm:w-40 sm:h-40 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-white/10 sm:r-[70] sm:cx-20 sm:cy-20 sm:stroke-[8]"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${analysis.overallScore * 3.5} 352`}
                    className="text-cream sm:r-[70] sm:cx-20 sm:cy-20 sm:stroke-[8]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-5xl font-black text-white">{analysis.overallScore}</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight uppercase">
                POSTURE SCORE
              </h3>
              <p className="text-white/60 text-sm sm:text-lg font-medium tracking-wider uppercase">
                Good form with room for improvement
              </p>
            </div>

            {/* Issues */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase">
                AREAS OF CONCERN
              </h3>
              {analysis.issues.map((issue: any, index: number) => (
                <div key={index} className="card-minimal p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <AlertCircle size={20} className="text-cream flex-shrink-0 sm:w-6 sm:h-6" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm sm:text-lg tracking-wider uppercase">
                        {issue.type}
                      </div>
                      <div className="text-white/60 font-medium tracking-wider uppercase text-xs sm:text-base">
                        {issue.severity} - {issue.angle} deviation
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase">
                RECOMMENDATIONS
              </h3>
              {analysis.recommendations.map((rec: string, index: number) => (
                <div key={index} className="card-minimal p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <CheckCircle size={20} className="text-cream flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-white font-medium tracking-wider uppercase text-sm sm:text-lg">
                      {rec}
                    </span>
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
            CONTINUE TO FOOT ANALYSIS
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PostureAnalysisScreen;
