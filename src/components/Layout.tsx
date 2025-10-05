import React from 'react';
import BottomNav from './BottomNav';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen text-brand-text">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <main className="flex-grow pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
