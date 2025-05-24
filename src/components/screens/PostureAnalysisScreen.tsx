
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
      <div className="min-h-screen flex flex-col p-6">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 rounded-xl neumorphic mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Posture Analysis</h1>
        </div>

        <div className="flex-1 space-y-8">
          <div className="text-center space-y-4">
            <div className="neumorphic p-8 rounded-3xl">
              <Camera size={64} className="text-neon-blue mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Side Profile Photo</h2>
              <p className="text-gray-400">We'll analyze your running posture from a side view</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Photo Guidelines:</h3>
            <div className="space-y-3">
              {[
                { icon: '📱', text: 'Hold phone horizontally (landscape mode)' },
                { icon: '👤', text: 'Stand in running position from the side' },
                { icon: '💡', text: 'Ensure good lighting and clear background' },
                { icon: '📏', text: 'Full body should be visible in frame' }
              ].map((guideline, index) => (
                <div key={index} className="flex items-center space-x-3 neumorphic p-4 rounded-xl">
                  <span className="text-2xl">{guideline.icon}</span>
                  <span className="text-gray-300">{guideline.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('capture')}
          className="w-full p-4 rounded-2xl bg-neon-gradient text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Ready to Capture
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
          <h1 className="text-2xl font-bold text-white">Capture Photo</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="neumorphic rounded-3xl p-8 text-center">
            <div className="border-4 border-dashed border-neon-blue/30 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-blue/5 animate-pulse" />
              <Camera size={64} className="text-neon-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Position Yourself</h3>
              <p className="text-gray-400 mb-6">Stand sideways in running stance</p>
              
              {/* Scanning animation overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-full h-0.5 bg-neon-blue/50 animate-scan" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-2xl bg-neon-gradient text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload size={20} />
                <span>Upload Photo</span>
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
                <Scan size={32} className="text-neon-blue animate-spin" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Analyzing Posture</h2>
            <p className="text-gray-400">Our AI is examining your running stance...</p>
            
            <div className="space-y-2">
              {[
                'Detecting body landmarks',
                'Measuring joint angles',
                'Analyzing alignment',
                'Generating recommendations'
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-3 neumorphic p-3 rounded-xl">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
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
          <h1 className="text-2xl font-bold text-white">Analysis Results</h1>
        </div>

        <div className="flex-1 space-y-6">
          {/* Overall Score */}
          <div className="neumorphic p-6 rounded-2xl text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-dark-tertiary"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${analysis.overallScore * 3.51} 351.86`}
                  className="text-neon-blue"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{analysis.overallScore}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white">Posture Score</h3>
            <p className="text-gray-400">Good running form with room for improvement</p>
          </div>

          {/* Issues */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Areas of Concern</h3>
            {analysis.issues.map((issue: any, index: number) => (
              <div key={index} className="neumorphic p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <AlertCircle size={20} className="text-neon-orange" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{issue.type}</div>
                    <div className="text-sm text-gray-400">
                      {issue.severity} - {issue.angle} deviation
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Recommendations</h3>
            {analysis.recommendations.map((rec: string, index: number) => (
              <div key={index} className="neumorphic p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-neon-blue" />
                  <span className="text-gray-300">{rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onComplete(analysis)}
          className="w-full p-4 rounded-2xl bg-neon-gradient text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Continue to Foot Analysis
        </button>
      </div>
    );
  }

  return null;
};

export default PostureAnalysisScreen;
