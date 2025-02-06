import React, { useState, useEffect } from 'react';
import { FiHeart, FiMapPin, FiDollarSign, FiLayout, FiFilter, FiX } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(1000000);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const properties = Array(8).fill({
    title: "Lakeside Retreat Land",
    price: 150000,
    location: "Lake Tahoe, CA",
    size: "5 acres",
    image: "land1.jpg",
    featured: true
  });

  return (
    <section className="home-container">
      <button 
        className={`filter-toggle ${filtersOpen ? 'open' : ''}`}
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? <FiX /> : <FiFilter />}
        {!isMobile && "Filters"}
      </button>

      <div className={`filter-container ${filtersOpen ? 'open' : ''}`}>
        <div className="filter-group">
          <div className="filter-item">
            <div className="filter-label">
              <FiDollarSign />
              <span>Price Range</span>
              <span className="price-display">₹{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              className="range-input"
              min="0"
              max="1000000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>

          <div className='wrap'>
          <div className="filter-item fit">
            <div className="filter-label">
              <FiMapPin />
              <span>Location</span>
            </div>
            <div className="location-grid">
              {['All', 'California', 'Texas', 'Colorado'].map(location => (
                <button
                  key={location}
                  className={`location-btn ${activeFilter === location.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setActiveFilter(location.toLowerCase())}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-item fit">
            <div className="filter-label">
              <FiLayout />
              <span>Land Size</span>
            </div>
            <div className="size-grid">
              {['0-5 acres', '5-20 acres', '20+ acres'].map(size => (
                <button key={size} className="size-btn">
                  {size}
                </button>
              ))}
            </div>
          </div></div>
        </div>
      </div>

      <div className="product-grid">
        {properties.map((property, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={property.image} alt={property.title} />
              {property.featured && <span className="featured-badge">Featured</span>}
              <button className="favorite-btn">
                <FiHeart />
              </button>
            </div>

            <div className="product-info">
              <h3>{property.title}</h3>
              <div className="location">
                <FiMapPin />
                {property.location}
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <FiDollarSign />
                  <span>${property.price.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <FiLayout />
                  <span>{property.size}</span>
                </div>
              </div>

              <button className="view-btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {[1, 2, 3, 4, 5].map(page => (
          <button
            key={page}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Home;