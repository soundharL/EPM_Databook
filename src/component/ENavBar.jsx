import React, { useState, useRef, useEffect } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import './css/ENavBar.css'
import { FaRegClock } from "../assets/icons/icons";
const ENavBar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Map routes to readable names
  const routeNames = {
    '/StartPage/XPERIENCElogs': 'XPERIENCE Logs',
    '/StartPage/XPERIENCElogs/Databook': 'XPERIENCE Logs/Data Book'
  };

  const navigationPath = routeNames[location.pathname] || 'Evatec';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="enavbar">
      {/* Left */}
      <div className="enavbar-left">
        <img src="/evatec-logo.ico" alt="Evatec Logo" className="enavbar-logo" />
        <span className="enavbar-title">{navigationPath}</span>
      </div>

      {/* Right */}
      <div className="enavbar-right">
        <div className="timezone">
          <span className="timezone-label">
            <FaRegClock style={{ marginRight: '5px' }} />
            Tool Timezone
          </span>
          <select defaultValue="Europe/Zurich">
            <option value="Europe/Zurich">Europe/Zurich</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">New York</option>
          </select>
        </div>

        {/* Avatar */}
        <div className="avatar-wrapper" ref={dropdownRef}>
          <div className="avatar" onClick={() => setOpen(!open)}>
            E
          </div>

          {open && (
            <div className="avatar-dropdown">
              <div className="dropdown-item">Profile</div>
             <div
                className="dropdown-item logout"
                onClick={() => {
                  const confirmLogout = window.confirm("Are you sure you want to logout?");
                  if (confirmLogout) {
                    navigate("/");
                  }
                }}
              >
                Logout
              </div>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ENavBar;
