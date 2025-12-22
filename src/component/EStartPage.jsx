import './css/EStartPage.css';
import elogo from '../assets/images/evatec-logo.png';
import { FaSave } from '../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EStartPage = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [error, setError] = useState(false);

  const handleToggle = (app) => {
    if (selectedApp === app) {
      setSelectedApp(null);
    } else {
      setSelectedApp(app);
    }
    setError(false); // clear error when user interacts
  };

  const handleSave = () => {
    if (!selectedApp) {
      setError(true);
      return;
    }

    if (selectedApp === 'XPERIENCE') {
      navigate('/StartPage/XPERIENCElogs');
    } else if (selectedApp === 'CONTROL') {
      navigate('/StartPage/ControlWorks');
    }
  };

  return (
    <div className="start-page">
      <div className="start-container">

        <img src={elogo} alt="Evatec Logo" className="start-logo" />

       {/* Error message */}
{error && !selectedApp && (
  <div className="toggle-error-text">
    Please select a tool
  </div>
)}

{/* Toggle switches */}
<div className="start-actions">
  <div className="toggle-switch" onClick={() => handleToggle('CONTROL')}>
    <div
      className={`toggle-switch-background
        ${selectedApp === 'CONTROL' ? 'checked' : ''}
        ${error && !selectedApp ? 'toggle-error' : ''}
      `}
    >
      <div className="toggle-switch-handle"></div>
    </div>
    <span className="toggle-label">ControlWorks eLAT</span>
  </div>

  <div className="toggle-switch" onClick={() => handleToggle('XPERIENCE')}>
    <div
      className={`toggle-switch-background
        ${selectedApp === 'XPERIENCE' ? 'checked' : ''}
        ${error && !selectedApp ? 'toggle-error' : ''}
      `}
    >
      <div className="toggle-switch-handle"></div>
    </div>
    <span className="toggle-label">XPERIENCE eLAT</span>
  </div>
</div>


        {/* Inputs */}
        <div className="app-field">
          <input type="text" className="app-input" placeholder=" " />
          <label>
            {'Case ID'.split('').map((char, i) => (
              <span key={i} style={{ '--i': i }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </label>
        </div>

        <div className="app-field">
          <input type="text" className="app-input" placeholder=" " />
          <label>
            {'Remarks'.split('').map((char, i) => (
              <span key={i} style={{ '--i': i }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </label>
        </div>

        <button type="button" className="app-btn start-save" onClick={handleSave}>
          <FaSave /> Save
        </button>

      </div>
    </div>
  );
};

export default EStartPage;
