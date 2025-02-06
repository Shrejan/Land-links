import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import './navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  return (
    <nav className={`navbar ${scroll ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="logo">
          <span className="logo-icon">🌳</span>
          Land Link's
        </a>

        {isMobile ? (
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        ) : (
          <div className="nav-links">
            <a href="/properties" className="nav-link">Properties</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>
        )}

        <div className="right-section">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search land..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FiSearch />
            </button>
          </form>

          <a href="/account" className="icon-link">
            <FiUser />
          </a>
          <a href="/cart" className="icon-link">
            <FiShoppingCart />
          </a>
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="mobile-menu">
          <a href="/properties" className="nav-link">Properties</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;