import { Home, ArrowLeftRight, BarChart, Bot, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transaksi' },
  { to: '/investments', icon: BarChart, label: 'Investasi' },
  { to: '/advisor', icon: Bot, label: 'AI' },
  { to: '/profile', icon: User, label: 'Profil' },
];

const BottomNav = () => {
  const activeLinkClass = 'text-brand-gold';
  const inactiveLinkClass = 'text-gray-400 hover:text-white';

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-brand-dark-blue/80 backdrop-blur-sm border-t border-gray-700">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
