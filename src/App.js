import React, { useState } from 'react';
import Navbar from './components/common/Navbar';//
// import Footer from './components/common/Footer';
import Home from './pages/Homepage';//
import About from './pages/AboutPage';//
import Press from './pages/PressPage';//
// import Moments from './pages/Moments';
// import Join from './pages/Join';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home />;
      case 'about': return <About />;
      case 'press': return <Press />;
      // case 'moments': return <Moments />;
      // case 'join': return <Join />;
      // case 'contact': return <Contact />;
      // default: return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;