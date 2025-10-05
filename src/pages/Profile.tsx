import { motion } from 'framer-motion';
import { User, Shield, Settings, HelpCircle, LogOut } from 'lucide-react';
import ProfileMenuItem from '../components/profile/ProfileMenuItem';

interface ProfileProps {
    onLogout: () => void;
}

const Profile = ({ onLogout }: ProfileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Profil & Keamanan</h1>

      {/* User Info */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-brand-gold"
          />
        </div>
        <h2 className="text-xl font-semibold">Pemilik UMKM</h2>
        <p className="text-gray-400">umkm.hebat@email.com</p>
      </div>

      {/* Menu */}
      <div className="space-y-4">
        <div className="p-4 bg-gray-800/50 rounded-lg space-y-2">
            <ProfileMenuItem icon={User} label="Detail Akun" />
            <ProfileMenuItem icon={Shield} label="Keamanan & Privasi" />
            <ProfileMenuItem icon={Settings} label="Pengaturan Aplikasi" />
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg space-y-2">
            <ProfileMenuItem icon={HelpCircle} label="Pusat Bantuan" />
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg">
            <ProfileMenuItem icon={LogOut} label="Keluar" hasArrow={false} color="text-red-400" onClick={onLogout} />
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
