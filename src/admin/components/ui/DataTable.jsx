import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, Inbox } from 'lucide-react';

export const DataTable = ({
  columns = [],
  data = [],
  keyField = 'id',
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchFilter,
  searchableKeys = [],
  pageSize = 10,
  emptyMessage = 'No records found',
  emptySubtext,
  onRowClick,
  actions,
  className = '',
}) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Universal Filter
  const filteredData = data.filter((item) => {
    if (!search) return true;
    if (searchFilter) return searchFilter(item, search);
    if (searchableKeys.length > 0) {
      return searchableKeys.some((k) =>
        String(item[k] || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    return Object.values(item).some((val) => {
      if (val == null) return false;
      if (typeof val === 'object') {
        return Object.values(val).some(v => String(v || '').toLowerCase().includes(search.toLowerCase()));
      }
      return String(val || '').toLowerCase().includes(search.toLowerCase());
    });
  });

  // Universal Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal === bVal) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    const res = aVal > bVal ? 1 : -1;
    return sortDirection === 'asc' ? res : -res;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (fieldKey) => {
    if (sortField === fieldKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(fieldKey);
      setSortDirection('asc');
    }
  };

  return (
    <div className={`bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col ${className}`}>
      
      {/* Top Search & Actions Bar */}
      {(searchable || actions) && (
        <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50/50">
          {searchable && (
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          )}

          {actions && <div className="flex items-center gap-2 w-full sm:w-auto justify-end">{actions}</div>}
        </div>
      )}

      {/* Table Surface */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {columns.map((col, idx) => {
                const sortKey = col.field || col.accessor;
                return (
                  <th
                    key={idx}
                    onClick={() => col.sortable && sortKey && handleSort(sortKey)}
                    className={`py-3.5 px-4 ${col.sortable ? 'cursor-pointer hover:text-slate-800 select-none' : ''} ${col.headerClassName || ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && sortField === sortKey && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-500">
                  <Inbox className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <div className="font-semibold text-slate-700 text-sm">{emptyMessage}</div>
                  {emptySubtext && <div className="text-xs text-slate-400 mt-0.5">{emptySubtext}</div>}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row[keyField] || rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50/80' : 'hover:bg-slate-50/50'}`}
                >
                  {columns.map((col, colIdx) => {
                    const cellKey = col.field || col.accessor;
                    return (
                      <td key={colIdx} className={`py-3.5 px-4 ${col.className || ''}`}>
                        {col.cell
                          ? col.cell(row)
                          : col.render
                          ? col.render(row[cellKey], row)
                          : row[cellKey]}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-3.5 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-40 disabled:pointer-events-none text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium px-2 text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-40 disabled:pointer-events-none text-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
