// ProfilePage.jsx
import React, { useState } from 'react';
import './Profile.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New message from buyer', read: false, timestamp: '2h ago' },
    { id: 2, text: 'Your item got 5 new likes', read: true, timestamp: '1d ago' },
    { id: 3, text: 'Payment received for "Vintage Chair"', read: false, timestamp: '3d ago' },
  ]);

  const [products] = useState([
    { id: 1, title: 'Antique Table', price: '$250', image: 'https://via.placeholder.com/300', status: 'Available' },
    { id: 2, title: 'Vintage Lamp', price: '$120', image: 'https://via.placeholder.com/300', status: 'Sold' },
    { id: 3, title: 'Modern Sofa', price: '$450', image: 'https://via.placeholder.com/300', status: 'Available' },
  ]);

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const handleNotificationRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="profile-image"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
            id="profileUpload"
          />
          <label htmlFor="profileUpload" className="edit-icon">
            ✎
          </label>
        </div>
        <h1 className="profile-name">John Doe</h1>
        <p className="profile-bio">Antique Collector & Seller</p>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">45</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1.2k</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89%</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>

      <div className="content-tabs">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          My Products
        </button>
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications ({notifications.filter(n => !n.read).length})
        </button>
      </div>

      <div className="content-area">
        {activeTab === 'products' ? (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                  <span className={`status-badge ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <p>{notification.text}</p>
                <div className="notification-footer">
                  <span>{notification.timestamp}</span>
                  {!notification.read && (
                    <button 
                      className="mark-read"
                      onClick={() => handleNotificationRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="floating-action-btn">
        +
      </button>
    </div>
  );
};

export default ProfilePage;
