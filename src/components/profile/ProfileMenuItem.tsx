import { LucideIcon, ChevronRight } from 'lucide-react';

interface ProfileMenuItemProps {
  icon: LucideIcon;
  label: string;
  hasArrow?: boolean;
  color?: string;
  onClick?: () => void;
}

const ProfileMenuItem = ({ icon: Icon, label, hasArrow = true, color = 'text-white', onClick }: ProfileMenuItemProps) => {
  return (
    <button onClick={onClick} className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-700/70 transition-colors ${color}`}>
      <Icon size={22} className="mr-4 text-brand-gold" />
      <span className="flex-1 text-left font-medium">{label}</span>
      {hasArrow && <ChevronRight size={20} className="text-gray-500" />}
    </button>
  );
};

export default ProfileMenuItem;
