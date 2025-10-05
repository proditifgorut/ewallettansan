import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, TrendingUp } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const previewAssets = [
    { id: 'GOLD', value: '1.05M', change: 0.12, positive: true },
    { id: 'BBCA', value: '9,250', change: 0.54, positive: true },
    { id: 'BTC', value: '$62.4k', change: -1.8, positive: false },
    { id: 'USD', value: '16,250', change: 0.05, positive: true },
];


const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login
    onLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-dark-blue text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm text-center mb-10"
      >
        <h1 className="text-5xl font-bold tracking-widest mb-2">
          <span className="text-brand-gold">TAN</span>SAN
        </h1>
        <p className="text-gray-400">Selamat datang kembali</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6"
      >
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            defaultValue="umkm.hebat@email.com"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            defaultValue="password"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="text-right">
          <a href="#" className="text-sm text-brand-gold hover:underline">
            Lupa Password?
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-brand-gold text-brand-dark-blue font-bold py-3 rounded-lg shadow-lg shadow-brand-gold/20 transition-all"
        >
          Masuk
        </motion.button>
      </motion.form>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-sm mt-10"
      >
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-3">
            <TrendingUp size={16} />
            <span className="text-sm font-semibold">Live Market Preview</span>
        </div>
        <div className="flex justify-around p-3 bg-gray-800/30 rounded-lg">
            {previewAssets.map(asset => (
                <div key={asset.id} className="text-center">
                    <p className="text-sm font-bold text-gray-300">{asset.id}</p>
                    <p className="text-xs font-mono text-white">{asset.value}</p>
                    <p className={`text-xs font-mono ${asset.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.positive ? '+' : ''}{asset.change}%
                    </p>
                </div>
            ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center text-gray-400 text-sm mt-8"
      >
        Belum punya akun?{' '}
        <a href="#" className="font-semibold text-brand-gold hover:underline">
          Daftar Sekarang
        </a>
      </motion.div>
    </div>
  );
};

export default LoginPage;
