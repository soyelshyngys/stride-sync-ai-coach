
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
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="flex items-center p-8 border-b border-white/10">
          <button onClick={onBack} className="p-3 hover:bg-white/5 rounded-xl transition-colors mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">POSTURE ANALYSIS</h1>
        </div>

        <div className="p-8 space-y-12">
          {/* Main Guide Section */}
          <div className="text-center">
            <div className="card-minimal p-12 rounded-3xl">
              <Camera size={72} className="text-cream mx-auto mb-8" />
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight uppercase">
                SIDE PROFILE PHOTO
              </h2>
              <p className="text-white/60 text-lg font-medium tracking-wider uppercase">
                AI analysis of your running posture
              </p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-widest uppercase text-center">
              PHOTO GUIDELINES
            </h3>
            <div className="space-y-4">
              {[
                { icon: '📱', text: 'Hold phone horizontally (landscape mode)' },
                { icon: '👤', text: 'Stand in running position from the side' },
                { icon: '💡', text: 'Ensure good lighting and clear background' },
                { icon: '📏', text: 'Full body should be visible in frame' }
              ].map((guideline, index) => (
                <div key={index} className="card-minimal p-6 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{guideline.icon}</span>
                    <span className="text-white font-medium tracking-wider uppercase text-lg">
                      {guideline.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => setStep('capture')}
            className="w-full btn-primary text-xl py-6"
          >
            READY TO CAPTURE
          </button>
        </div>
      </div>
    );
  }

  if (step === 'capture') {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="flex items-center p-8 border-b border-white/10">
          <button onClick={() => setStep('guide')} className="p-3 hover:bg-white/5 rounded-xl transition-colors mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">CAPTURE PHOTO</h1>
        </div>

        <div className="p-8 flex flex-col justify-center min-h-[calc(100vh-100px)]">
          <div className="space-y-12">
            {/* Capture Area */}
            <div className="card-minimal rounded-3xl p-12">
              <div className="border-4 border-dashed border-cream/30 rounded-3xl p-16 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-cream/5 animate-pulse" />
                <Camera size={96} className="text-cream mx-auto mb-8" />
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase">
                  POSITION YOURSELF
                </h3>
                <p className="text-white/60 text-lg font-medium tracking-wider uppercase">
                  Stand sideways in running stance
                </p>
                
                {/* Scanning animation overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute w-full h-0.5 bg-cream/50 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full btn-primary text-xl py-6"
            >
              <div className="flex items-center justify-center space-x-3">
                <Upload size={24} />
                <span>UPLOAD PHOTO</span>
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
      <div className="min-h-screen bg-black flex flex-col justify-center items-center p-8">
        <div className="text-center space-y-12 max-w-md">
          {/* Image Preview */}
          <div className="relative">
            {imagePreview && (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Analyzing" 
                  className="w-80 h-80 object-cover rounded-3xl border border-white/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="card-minimal p-6 rounded-full">
                    <Scan size={40} className="text-cream animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Analysis Status */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">
                ANALYZING POSTURE
              </h2>
              <p className="text-white/60 text-lg font-medium tracking-wider uppercase">
                AI examining your running stance
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                'Detecting body landmarks',
                'Measuring joint angles',
                'Analyzing alignment',
                'Generating recommendations'
              ].map((step, index) => (
                <div key={index} className="card-minimal p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-cream rounded-full animate-pulse" />
                    <span className="text-white font-medium tracking-wider uppercase">
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
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="flex items-center p-8 border-b border-white/10">
          <button onClick={() => setStep('capture')} className="p-3 hover:bg-white/5 rounded-xl transition-colors mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">ANALYSIS RESULTS</h1>
        </div>

        <div className="p-8 space-y-12">
          {/* Overall Score */}
          <div className="card-minimal p-12 rounded-3xl text-center">
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${analysis.overallScore * 4.4} 440`}
                  className="text-cream"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black text-white">{analysis.overallScore}</span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase">
              POSTURE SCORE
            </h3>
            <p className="text-white/60 text-lg font-medium tracking-wider uppercase">
              Good form with room for improvement
            </p>
          </div>

          {/* Issues */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
              AREAS OF CONCERN
            </h3>
            {analysis.issues.map((issue: any, index: number) => (
              <div key={index} className="card-minimal p-6 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <AlertCircle size={24} className="text-cream" />
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg tracking-wider uppercase">
                      {issue.type}
                    </div>
                    <div className="text-white/60 font-medium tracking-wider uppercase">
                      {issue.severity} - {issue.angle} deviation
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
              RECOMMENDATIONS
            </h3>
            {analysis.recommendations.map((rec: string, index: number) => (
              <div key={index} className="card-minimal p-6 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <CheckCircle size={24} className="text-cream" />
                  <span className="text-white font-medium tracking-wider uppercase text-lg">
                    {rec}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={() => onComplete(analysis)}
            className="w-full btn-primary text-xl py-6"
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
