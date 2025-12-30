import { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaTools,
  MdOutlineSettings,
  MdAnalytics,
  TbMessageReportFilled, 
  FaFolderOpen,
  FaEye,
  FaSearch,
  BiArrowFromLeft , BiArrowFromRight
} from '../assets/icons/icons';
import EAllTools from './EAllTools';
import EAnalyticsCases from './EAnalyticsCases';
import EDataBooks from './EDataBooks';
import './css/EDataBook.css';

const DataBook = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedView, setSelectedView] = useState('allTools');

  return (
    <div className="databook-container">

      {/* LEFT SLIDE BAR */}
      <div className={`databook-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <h4 className="sidebar-item">
          <MdOutlineSettings className="sidebar-icon" />
          <span className="side-text">Tools</span>
        </h4>

        <ul>
          <li
            className={`sidebar-item ${selectedView === 'allTools' ? 'active' : ''}`}
            onClick={() => setSelectedView('allTools')}
          >
            <FaTools className="sidebar-icon" /> <span className="side-text">All Tools</span>
          </li>

          <li
            className={`sidebar-item ${selectedView === 'analytics' ? 'active' : ''}`}
            onClick={() => setSelectedView('analytics')}
          >
            <MdAnalytics className="sidebar-icon" /> <span className="side-text">Analytics Case</span>
          </li>

          <li
            className={`sidebar-item ${selectedView === 'databook' ? 'active' : ''}`}
            onClick={() => setSelectedView('databook')}
          >
            <FaFolderOpen className="sidebar-icon" /> <span className="side-text">Databook</span>
          </li>

          <li
            className={`sidebar-item ${selectedView === 'reports' ? 'active' : ''}`}
            onClick={() => setSelectedView('reports')}
          >
            <TbMessageReportFilled className="sidebar-icon" /> <span className="side-text">Reports</span>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="databook-page">

       {/* Header */}
        <div className="databook-header">
          <span
            className="collapse-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <BiArrowFromRight /> : <BiArrowFromLeft />}
          </span>

          <span className="header-title">
            {selectedView === 'allTools' && 'All Tools'}
            {selectedView === 'analytics' && 'Analytics Cases'}
            {selectedView === 'databook' && 'Databook'}
            {selectedView === 'reports' && 'Reports'}
          </span>
        </div>


        {/* ================= CONTENT SWITCH ================= */}
        {selectedView === 'allTools' && <EAllTools />}
        {selectedView === 'analytics' && <EAnalyticsCases />}
        {selectedView === 'databook' && <EDataBooks />}
       
      </div>
    </div>
  );
};

export default DataBook;
