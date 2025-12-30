import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './assets/styles/EButton.css';
import './assets/styles/Einput.css';
import './assets/styles/ETable.css';
import ENavBar from './component/ENavBar.jsx';
import ELoginPage from './component/ELoginPage.jsx';
import EFooter from './component/EFooter.jsx';
import EStartPage from './component/EStartPage.jsx';
import XPERIENCElogs from './component/XPERIENCElogs.jsx';
import DataBook from './component/EDataBook.jsx';
import AllTools from './component/EAllTools.jsx';


const AppLayout = () => {
  const location = useLocation();

  const hideFooter = location.pathname.startsWith(
    '/StartPage/XPERIENCElogs/Databook'
  );

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <ENavBar />

      {/* Middle content (THIS controls height) */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<ELoginPage />} />
          <Route path="/StartPage" element={<EStartPage />} />
          <Route path="/StartPage/XPERIENCElogs" element={<XPERIENCElogs />} />
          <Route path="/StartPage/XPERIENCElogs/Databook" element={<DataBook />} />
        </Routes>
      </div>

      {/* Footer */}
      {!hideFooter && <EFooter />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
