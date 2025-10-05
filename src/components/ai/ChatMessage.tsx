import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  sender: 'user' | 'ai';
  message: string;
}

const ChatMessage = ({ sender, message }: ChatMessageProps) => {
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
          <Bot size={24} className="text-brand-gold" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md p-3 rounded-lg ${
          isUser
            ? 'bg-brand-gold text-brand-dark-blue rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
          <User size={24} className="text-gray-300" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
