import { FaEye, FaPlus } from "../assets/icons/icons";
import ETable from "./ETable";

const mockData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  equipment: `EQ-${1200 + i}`,
  caseNo: `CASE-${100 + i}`,
  title: "Pressure Alert",
  timestamp: "10:45 AM",
  createdAt: "12-Jan-2025",
  createdBy: i % 2 === 0 ? "Admin" : "User1",
  tool: i % 2 === 0 ? "ControlWorks" : "XPERIENCE",
}));

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Equipment No", accessor: "equipment" },
  { header: "Case No", accessor: "caseNo" },
  { header: "Title", accessor: "title" },
  { header: "Timestamp", accessor: "timestamp" },
  { header: "Created At", accessor: "createdAt" },
  { header: "Created By", accessor: "createdBy" },
  { 
    header: "", 
    accessor: "eye", 
    render: (row) => <FaEye style={{ color: "#0052cc", cursor: "pointer" }} /> 
  },
];

const filters = [
  { key: "search", type: "search", label: "Search" },
  { 
    key: "tool", 
    type: "select", 
    label: "Tool", 
    options: ["ControlWorks", "XPERIENCE"] 
  },
  { 
    key: "createdBy", 
    type: "select", 
    label: "Created By", 
    options: ["Admin", "User1"] 
  },
];

export default function EAnalyticsCases() {
  return (
    <ETable 
      data={mockData} 
      columns={columns} 
      filters={filters} 
      actionButton={{
        text: "Add Case",
        icon: <FaPlus />,
        onClick: () => alert("Add Case Clicked!"),
      }}
    />
  );
}
