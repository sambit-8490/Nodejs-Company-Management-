import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import { Link } from "react-router-dom";

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(1);
  let [flag,setFalg]=useState(false)
  // Fetch companies based on search query and current page
  const fetchCompanies = async (search = '', page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/companies/companies?search=${search}&page=${page}&limit=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Send the token if necessary
        }
      });

      setCompanies(response.data.companies); // Set companies from the response data
      setTotalPages(response.data.totalPages); // Set total pages from the response data
      setCurrentPage(response.data.currentPage); // Set current page from the response data
    } catch (error) {
      setError('Error fetching companies');
    }
  };

  // Fetch companies when page or searchQuery change
  useEffect(() => {
    fetchCompanies(search, currentPage); // Fetch companies with the current page and search query
  }, [search,currentPage]);

  // Handle search on "Enter" key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchCompanies(search, 1); // Fetch with search query and reset page to 1
    }
  };

  // Delete company
  const handleDelete = async (companyId) => {
    try {
        await axios.delete(`http://localhost:5000/api/companies/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setFalg(true)
        fetchCompanies(search, currentPage); // Refresh the company list with the search query and current page
    } catch (error) {
        console.error("Error deleting company:", error); // Log the error for debugging
        setError('Error deleting company');
    }
};


  // Approve company
  const handleApprove = async (companyId) => {
    try {
        await axios.patch(`http://localhost:5000/api/companies/${companyId}/approve`, {}, { // Use PATCH or PUT
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Send the token if necessary
            }
        });
        fetchCompanies(search, currentPage); // Refresh the company list with the search query and current page
    } catch (error) {
        console.error("Error approving company:", error); // Log the error for better debugging
        setError('Error approving company'); // Update the error state
    }
};


  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Nav />
      <section className="min-h-[90vh] w-full">
        <h1 className="flex justify-center text-2xl md:text-3xl font-bold p-4">
          Welcome To Admin Panel
        </h1>
        <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center py-2 space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="w-full md:w-[35%]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search query state
              onKeyDown={handleKeyDown} // Trigger search on "Enter" key press
              placeholder="Search by ID, Name, or Created By..."
              className="w-full md:w-[60%] p-2 rounded-md outline-none border border-gray-400"
            />
          </div>
          {error && <tr><p className="text-red-500 ">{error}</p></tr>}
          {/* Create Button */}
          <div className="w-full md:w-[30%] flex justify-end text-center">
            <Link
              to={'/create'}
              className="bg-blue-600 text-white p-2 w-full md:w-auto rounded-lg font-semibold text-sm md:text-base"
            >
              Create
            </Link>
          </div>
        </div>
        {/* Table Section */}
        <div className="w-[90%] mx-auto overflow-auto">
          <table className="min-w-full text-center">
            <thead className="bg-blue-100">
              <tr>
                <th className=" border border-gray-400 p-2">ID</th>
                <th className="border border-gray-400 p-2">Company Name</th>
                <th className="border border-gray-400 p-2">Created by</th>
                <th className="w-[25%] border border-gray-400 p-2">Address</th>
                <th className="w-[30%] border border-gray-400 p-2"></th>
              </tr>
            </thead>
            <tbody>
  {companies.map((company) => (
    <tr key={company._id}>
      <td className="border border-gray-400 p-3">{company.companyID}</td>
      <td className="border border-gray-400 p-3">{company.companyName}</td>
      <td className="border border-gray-400 p-3">{company.created_by}</td>
      <td className="border border-gray-400 p-3">{company.address}</td>
      <td className="border border-gray-400 p-3">
        <div className="flex md:justify-evenly items-center gap-2">
          <div className="w-[30%]">
            <Link
              to={`/edit/${company._id}`}
              className="bg-yellow-400  hover:bg-yellow-500 text-black rounded-lg px-4 py-2 font-semibold text-sm md:text-base text-center w-full"
            >
              Edit
            </Link>
          </div>
          <div className="w-[20%]">
            <button
              onClick={() => handleDelete(company._id)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg  py-2 font-semibold text-sm md:text-base text-center w-full"
            >
              Delete
            </button>
          </div>
          <div className="w-[25%]">
            {company.status === 'unapproved' && (
              <button
                onClick={() => handleApprove(company._id)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 font-semibold text-sm md:text-base text-center w-full"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
          
          {/* Pagination Controls */}
          <div className="pagination-controls flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-gray-500 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-gray-500 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
