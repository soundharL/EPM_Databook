import { useState } from "react";


const ETable = ({ 
  data = [], 
  columns = [], 
  filters = [], 
  actionButton = null, // { text: "Add Tool", icon: <FaPlus />, onClick: () => {} } 
}) => {
  const [search, setSearch] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  /* Filtering */
  const filteredData = data.filter((item) => {
    let match = true;
    if (search) {
      match = Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    }
    if (createdBy && item.createdBy) {
      match = match && item.createdBy === createdBy;
    }
    return match;
  });

  /* Pagination */
  const startIndex = (currentPage - 1) * pageSize;
  const visibleRows = filteredData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="etable-container">
      {/* ===== FILTERS ===== */}
      {filters.length > 0 && (
        <div className="etable-filters">
          {filters.map((f) => {
            if (f.type === "search") {
              return (
                <div key={f.key} className="filter-group">
                  <label>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder || "Search..."}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              );
            }
            if (f.type === "select") {
              return (
                <div key={f.key} className="filter-group">
                  <label>{f.label}</label>
                  <select className="dropdown-select"
                    value={createdBy}
                    onChange={(e) => {
                      setCreatedBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All</option>
                    {f.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* ===== TABLE ===== */}
      <div className="etable-table-wrapper">
        <table className="etable-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length > 0 ? visibleRows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, i) => (
                  <td key={i}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="etable-footer">
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p -1)}>‹</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p +1)}>›</button>
        </div>

        <div className="footer-right">
          <select className="dropdown-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          {actionButton && (
            <button className="app-btn" onClick={actionButton.onClick}>
              {actionButton.icon} {actionButton.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ETable;
