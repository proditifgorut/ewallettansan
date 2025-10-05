import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-brand-dark-blue">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white tracking-widest">
          <span className="text-brand-gold">TAN</span>SAN
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-400 mt-2"
        >
          Your Digital Finance Partner
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
