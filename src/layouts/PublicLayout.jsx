// ==========================================
// layouts/PublicLayout.jsx
// ==========================================
import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;