
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Target, Camera } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CoachChatScreenProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

const CoachChatScreen: React.FC<CoachChatScreenProps> = ({ userData, onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hey ${userData.name || 'there'}! 👋 I'm your AI running coach. I've analyzed your posture and foot structure. Ready to optimize your running performance?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: Camera, text: 'RETAKE ANALYSIS', action: () => onNavigate('posture') },
    { icon: Target, text: 'VIEW SHOES', action: () => onNavigate('shoes') },
    { icon: Zap, text: 'TRAINING TIPS', action: () => sendMessage('Give me training tips') }
  ];

  const suggestedQuestions = [
    "HOW OFTEN SHOULD I REPLACE MY RUNNING SHOES?",
    "WHAT EXERCISES CAN IMPROVE MY POSTURE?",
    "HOW DO I PREVENT RUNNING INJURIES?",
    "WHAT'S THE IDEAL RUNNING CADENCE FOR ME?"
  ];

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your posture analysis, I recommend focusing on core strengthening exercises. Your forward head posture can be improved with neck stretches and upper back strengthening.",
        "For your foot type and running goals, those Nike Pegasus shoes are perfect! They provide the right balance of cushioning and responsiveness for marathon training.",
        "Great question! Generally, running shoes should be replaced every 300-500 miles. With your gait pattern, I'd recommend tracking your mileage and watching for wear on the outer heel area.",
        "Your neutral pronation is actually ideal for most running surfaces. Focus on maintaining that good form, and consider the stability features in the recommended shoes."
      ];

      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 card-minimal mx-6 mt-6 p-6 rounded-3xl">
        <div className="flex items-center space-x-4">
          <div className="card-minimal p-4 rounded-2xl">
            <Bot size={28} className="text-cream" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider uppercase">AI RUNNING COACH</h2>
            <p className="text-sm text-white/50 font-medium tracking-wide uppercase">OPTIMIZING YOUR PERFORMANCE</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-cream rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex-shrink-0 p-6">
        <div className="flex space-x-4 overflow-x-auto">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center space-x-2 card-minimal px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-300 whitespace-nowrap"
            >
              <action.icon size={16} className="text-cream" />
              <span className="text-xs text-white/70 font-medium tracking-wider uppercase">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages - Now using ScrollArea for better scrolling */}
      <div className="flex-1 px-6 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 pb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-6 rounded-3xl ${
                    message.type === 'user'
                      ? 'bg-cream text-black'
                      : 'card-minimal text-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.type === 'bot' && (
                      <Bot size={18} className="text-cream mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                      <span className="text-xs opacity-50 mt-3 block font-medium">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {message.type === 'user' && (
                      <User size={18} className="text-black mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="card-minimal p-6 rounded-3xl">
                  <div className="flex items-center space-x-3">
                    <Bot size={18} className="text-cream" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cream rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-cream rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-cream rounded-full animate-pulse delay-150" />
                    </div>
                    <span className="text-xs text-white/40 font-medium tracking-wider uppercase">AI IS THINKING...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="space-y-4">
                <p className="text-center text-sm text-white/50 font-medium tracking-widest uppercase">TRY ASKING ME:</p>
                <div className="grid grid-cols-1 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="p-4 card-minimal rounded-2xl text-left hover:bg-white/5 transition-all duration-300"
                    >
                      <span className="text-sm text-white/80 font-medium">{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-6">
        <div className="card-minimal p-6 rounded-3xl">
          <div className="flex items-center space-x-4">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="ASK ME ANYTHING ABOUT RUNNING..."
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none font-medium tracking-wide uppercase text-sm"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                inputMessage.trim() && !isTyping
                  ? 'bg-cream text-black hover:scale-110'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachChatScreen;
