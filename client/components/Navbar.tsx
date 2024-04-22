import React from 'react';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="absolute top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 z-10">
      <div className="flex justify-between items-center">{children}</div>
    </nav>
  );
};

export default Navbar;
