
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Target, Camera } from 'lucide-react';

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
    { icon: Camera, text: 'Retake Analysis', action: () => onNavigate('posture') },
    { icon: Target, text: 'View Shoes', action: () => onNavigate('shoes') },
    { icon: Zap, text: 'Training Tips', action: () => sendMessage('Give me training tips') }
  ];

  const suggestedQuestions = [
    "How often should I replace my running shoes?",
    "What exercises can improve my posture?",
    "How do I prevent running injuries?",
    "What's the ideal running cadence for me?"
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="neumorphic mx-4 mt-4 p-4 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="neumorphic p-3 rounded-full">
            <Bot size={24} className="text-neon-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI Running Coach</h2>
            <p className="text-sm text-gray-400">Always here to help optimize your performance</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <div className="flex space-x-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center space-x-2 neumorphic p-3 rounded-xl hover:bg-dark-tertiary transition-all duration-300"
            >
              <action.icon size={16} className="text-neon-blue" />
              <span className="text-xs text-gray-300">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 pb-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-neon-gradient text-white'
                  : 'neumorphic text-gray-300'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot size={16} className="text-neon-blue mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-60 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.type === 'user' && (
                  <User size={16} className="text-white mt-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="neumorphic p-4 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-neon-blue" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse delay-150" />
                </div>
                <span className="text-xs text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-400">Try asking me:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="p-3 neumorphic rounded-xl text-left hover:bg-dark-tertiary transition-all duration-300"
                >
                  <span className="text-sm text-gray-300">{question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="neumorphic p-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about running..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className={`p-2 rounded-xl transition-all duration-300 ${
                inputMessage.trim() && !isTyping
                  ? 'bg-neon-gradient text-white hover:scale-110'
                  : 'bg-dark-tertiary text-gray-500 cursor-not-allowed'
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
