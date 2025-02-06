/*import * as React from 'react';
import { Link } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function foot_nav() {
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
       <Link to="/"><BottomNavigationAction
        label="home"
        value="home"
        icon={<RestoreIcon />}
      /></Link>
      <Link to="/sell"><BottomNavigationAction
        label="sell"
        value="sell"
        icon={<FavoriteIcon />}
      /></Link>
      <Link to="/profile"><BottomNavigationAction
        label="profile"
        value="profile"
        icon={<LocationOnIcon />}
      /></Link>
    
    </BottomNavigation>
  );
}*/
import { Link } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiUser } from 'react-icons/fi';
import './Foot_nav.css';

const Foot_nav = () => {
  return (
    <footer className="footer-nav">
      <nav className="nav-container">
        <Link to="/" className="nav-item">
          <FiHome className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/sell" className="nav-item">
          <FiPlusSquare className="nav-icon" />
          <span>Sell</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <FiUser className="nav-icon" />
          <span>Profile</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Foot_nav;