import "./css/XPERIENCElogs.css";
import { useNavigate } from "react-router-dom";
import {
  FaFolderOpen,
  IoMdAnalytics,
  FaCog,
  FaChartBar,
  TbMessageReportFilled,
} from "../assets/icons/icons";
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="cards-wrapper">
        <div className="row">
          <Card
            icon={<FaFolderOpen />}
            label="Databook"
            onClick={() =>
              navigate("/StartPage/XPERIENCElogs/Databook")
            }
          />
          <Card icon={<IoMdAnalytics />} label="Alarm History Analysis" />
          <Card icon={<FaCog />} label="Process Summary Tool" />
        </div>

        <div className="row center">
          <Card icon={<FaChartBar />} label="Recipe Viewer" />
          <Card icon={<TbMessageReportFilled />} label="System Report" />
        </div>
      </div>
    </div>
  );
}

const Card = ({ icon, label, onClick }) => (
  <div className="card" onClick={onClick}>
    <div className="icon">{icon}</div>
    <span>{label}</span>
  </div>
);
