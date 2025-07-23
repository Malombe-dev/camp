import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Homepage';
import About from './pages/AboutPage';
import Press from './pages/PressPage';
import Moments from './pages/Moments';
import Join from './pages/Join';
import ContactForm from './components/forms/ContactForm';

// import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/press" element={<Press />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<ContactForm />} />
          {/* <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
