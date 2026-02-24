import React, { useState, useMemo } from "react";
import { companies } from "./exhibitors.js";

const ITEMS_PER_PAGE = 100;

const Exhibitors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const companyTypes = useMemo(
    () => ["All", ...new Set(companies.map((c) => c.type))],
    [],
  );

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      return (
        (filterType === "All" || company.type === filterType) &&
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, filterType]);

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">AI Summit 2026 Exhibitors</h1>
        <p className="text-gray-600 mt-2">Discover the innovative companies showcasing at this year's summit.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
        >
          {companyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/2 text-left py-3 px-5 uppercase font-semibold text-sm text-gray-600">Company Name</th>
              <th className="w-1/4 text-left py-3 px-5 uppercase font-semibold text-sm text-gray-600">Type</th>
              <th className="text-left py-3 px-5 uppercase font-semibold text-sm text-gray-600 text-center">Link</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedCompanies.map((company, index) => (
              <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition`}>
                <td className="w-1/2 text-left py-4 px-5">{company.name}</td>
                <td className="w-1/4 text-left py-4 px-5">{company.type}</td>
                <td className="flex py-4 px-5 item-center justify-center">
                  <a href={company.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-l-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span className="py-2 px-4 bg-white border-t border-b border-gray-300 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-r-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        Developed by{" "}
        <a href="https://heheboi.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          heheboi.in
        </a>{" "}
        with curiosity
      </footer>
    </div>
  );
};

export default Exhibitors;
