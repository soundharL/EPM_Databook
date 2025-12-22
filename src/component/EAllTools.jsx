import { FaEye, FaPlus } from "../assets/icons/icons";
import ETable from "./ETable";

const mockData = Array.from({ length: 55 }, (_, i) => ({
  equipment: `EQ-${1000 + i}`,
  short: "n/a",
  description: "BAK EVO Dalsa CA 99",
  createdAt: "26.7.2023, 16:58",
  createdBy: i % 2 === 0 ? "Simon Laube" : "Samuel Rufer",
}));

const columns = [
  { header: "Equipment Number", accessor: "equipment" },
  { header: "Short Description", accessor: "short" },
  { header: "Description", accessor: "description" },
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
  { key: "createdBy", type: "select", label: "Created By", options: ["Simon Laube", "Samuel Rufer"] },
];

export default function EAllTools() {
  return (
    <ETable 
      data={mockData} 
      columns={columns} 
      filters={filters} 
      actionButton={{
        text: "Add Tool",
        icon: <FaPlus />,
        onClick: () => alert("Add Tool Clicked!"),
      }}
    />
  );
}
