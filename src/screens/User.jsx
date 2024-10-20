import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
import Nav from "../Nav";

const User = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
       
    
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);  // State to manage loading
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [companiesPerPage] = useState(5); // Companies per page
    let [flag,setFlag]=useState(false);
 
    
    // Fetch user-created companies on component mount
    useEffect(() => {
        const fetchUserCompanies = async () => {
            if (!user || !user.username) {
                // Wait until user object is available
                return;
            }

            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await axios.get(`http://localhost:5000/api/companies/user/${user.username}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("Response data: ", response.data);
                setCompanies(response.data.companies);
                setLoading(false);  // Stop loading once data is fetched
            } catch (error) {
                setLoading(false);  // Stop loading on error
                setCompanies([]);  // Reset companies on error
                setError('Error fetching your companies. Please try again.');
            }
        };

        fetchUserCompanies();
    }, [user]);
    
    // Pagination logic
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

    const totalPages = Math.ceil(companies.length / companiesPerPage); // Total pages

    // Function to change pages
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <Nav />
            <section className='min-h-[90vh] w-full'>
                <h1 className='flex justify-center text-2xl md:text-3xl font-bold p-4'>
                    Welcome To User Panel
                </h1>
                <div className='w-[90%] mx-auto flex flex-col md:flex-row justify-end items-center py-2 space-y-4 md:space-y-0'>
                    {/* Create Button */}
                    <div className='w-full md:w-[50%] flex justify-end'>
                        <Link to={"/create"} className='text-center bg-blue-600 text-white p-2 w-full md:w-auto rounded-lg font-semibold text-sm md:text-base'>
                            Create
                        </Link>
                    </div>
                </div>

                {/* Loading state */}
                {loading && (
                    
                    <div className="text-center">
                        <p>Loading your companies...</p>
                    </div>
                )}

                {/* Table Section */}
                {!loading && (
                    <div className='w-[90%] mx-auto overflow-auto'>
                        <table className='min-w-full text-center'>
                            <thead className='bg-blue-100'>
                                <tr>
                                    <th className='border border-gray-400 p-2'>SNo.</th>
                                    <th className='border border-gray-400 p-2'>Company Name</th>
                                    <th className='w-[30%] border border-gray-400 p-2'>Address</th>
                                    <th className='w-[30%] border border-gray-400 p-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCompanies.map((company, index) => {
                                    return (
                                        <tr key={company._id}>
                                            <td className='border border-gray-400 p-3'>{indexOfFirstCompany + index + 1}</td>
                                            <td className='border border-gray-400 p-3'>{company.companyName}</td>
                                            <td className='border border-gray-400 p-3'>{company.address}</td>
                                            <td className='border border-gray-400 p-3'>{company.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center space-x-4 mt-4">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-400"
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>

                        {/* Display error message */}
                        {error && (
                            <p className="error-message text-red-600 bg-red-100 md:p-2 md:text-[15px] rounded mt-4 p-1 text-xs mx-auto">
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default User;
