import { motion } from 'framer-motion';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionChips = ({ suggestions, onSelect }: SuggestionChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 text-xs bg-gray-700/50 border border-gray-600 rounded-full hover:bg-gray-700 transition-colors"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestionChips;
