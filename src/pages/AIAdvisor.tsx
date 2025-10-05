import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CornerDownLeft } from 'lucide-react';
import ChatMessage from '../components/ai/ChatMessage';
import SuggestionChips from '../components/ai/SuggestionChips';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const AIAdvisor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Financial Advisor. How can I help you manage your business finances today?",
      sender: 'ai',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const getAIResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('laba') || lowerCaseMessage.includes('profit')) {
      return "To increase profit, focus on two key areas: 1) Boost your revenue by exploring new sales channels or running targeted promotions. 2) Reduce costs by negotiating with suppliers or optimizing operational expenses. Your transaction data shows your biggest expense is 'Operational', let's analyze that.";
    }
    if (lowerCaseMessage.includes('investasi') || lowerCaseMessage.includes('investment')) {
      return "A great starting point for investment is diversifying your portfolio. Based on your current balance, allocating a small portion to Digital Gold offers a stable option. For higher growth potential, consider blue-chip stocks like BBRI or TLKM. Always remember to invest what you're willing to risk.";
    }
    if (lowerCaseMessage.includes('risiko') || lowerCaseMessage.includes('risk')) {
      return "Managing risk is crucial. For your business profile, I recommend a conservative approach. Keep 60% of your assets in low-risk instruments like savings or digital gold, 30% in medium-risk like Indonesian blue-chip stocks, and no more than 10% in high-risk assets like cryptocurrency.";
    }
    if (lowerCaseMessage.includes('pajak') || lowerCaseMessage.includes('tax')) {
        return "For MSMEs in Indonesia, the final PPh rate is 0.5% of your gross turnover, as long as your annual turnover is below Rp 4.8 billion. Make sure to keep your transaction records clean for easy reporting. Our 'Reports' feature can help you generate a summary."
    }
    return "I'm sorry, I'm not sure how to answer that yet. Try asking me about how to increase profit, manage investment risk, or about taxes for MSMEs.";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponseText = getAIResponse(text);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const suggestions = [
    "Bagaimana saya bisa meningkatkan laba?",
    "Saran investasi untuk pemula?",
    "Jelaskan tentang risiko investasi.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-[calc(100vh-5rem)] text-white"
    >
      <header className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-center">AI Financial Advisor</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} sender={msg.sender} />
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
            <div className="flex items-center gap-1 p-3 bg-gray-700 rounded-lg">
                <span className="h-2 w-2 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-brand-gold rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <SuggestionChips suggestions={suggestions} onSelect={handleSendMessage} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2 mt-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tanya apa saja..."
            className="flex-1 w-full px-4 py-2 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button type="submit" className="p-2.5 bg-brand-gold rounded-full text-brand-dark-blue">
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AIAdvisor;
