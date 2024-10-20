import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Nav from "../Nav";
const Edit = () => {
  const  {id}  = useParams(''); // Get the company ID from the URL
  const { user } = useContext(AuthContext); // Get the logged-in user from context
  const navigate = useNavigate();
  // console.log(CompanyId);
  
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [createdBy, setCreatedBy] = useState(''); // State for created_by
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  // Fetch the existing company details on component mount
  useEffect(() => {
      const fetchCompanyDetails = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/api/companies/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
              console.log(response.data);
              
              const { companyName, address, created_by } = response.data;
              setCompanyName(companyName);
              setAddress(address);
              setCreatedBy(created_by); // Assuming created_by is an object with username
          } catch (error) {
              setError('Error fetching company details. Please try again.');
          }
      };

      fetchCompanyDetails();
  }, [id]);

  // Handle form submission for editing a company
  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          await axios.patch(`http://localhost:5000/api/companies/${id}`, {
              companyName,
              address,
          },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

          setSuccessMessage('Company updated successfully!');
          setTimeout(() => {
              navigate('/admin'); // Redirect to Admin page after success
          }, 2000); // Delay for success message

      } catch (error) {
          setError('Error updating company. Please try again.');
      }
  };

  return (
    <div>
      <Nav/>
      <section className="h-[90vh] w-full flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}  className="md:w-[60%] lg:w-[50%]  w-[80%] flex flex-col gap-3 justify-center shadow-lg shadow-gray-600 px-10 py-5 rounded-lg">
          <p className="text-xl pb-7 md:text-2xl font-semibold md:font-bold ">
            Edit Company Details
          </p>
          {/* Display error or success message */}
          {error && (
                    <p className="error-message text-red-600 bg-red-100 p-2 rounded mb-4">
                        {error}
                    </p>
                )}
                {successMessage && (
                    <p className="success-message text-green-600 bg-green-100 p-2 rounded mb-4">
                        {successMessage}
                    </p>
                )}

          {/* Responsive Form Fields */}
          <div className="w-full flex flex-col gap-4">
            {/* Company Name Input */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <label className="md:w-[50%] lg:w-[25%] w-full text-lg md:text-xl font-semibold">
                Name 
              </label>
              <input
                type="text"
                value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                placeholder="Enter name"
                className="border border-gray-500 rounded-lg w-full p-2 outline-none"
              />
            </div>
            <div></div>
            {/* Company Address Input */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <label className=" md:w-[50%] lg:w-[25%] w-full text-lg md:text-xl  font-semibold">
                Address 
              </label>
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border border-gray-500 rounded-lg w-full p-2 outline-none"
                
              />
            </div>
             {/* Created by */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <label className="md:w-[50%] lg:w-[25%] w-full text-lg md:text-xl  font-semibold">
                Created by 
              </label>
              <input
                type="text"
                value={createdBy} // Display the username who created the company
                        readOnly // Make the created_by field read-only
                
                className="border border-gray-500 rounded-lg w-full p-2 outline-none"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-around mt-4">
            <button className="w-[40%] md:w-[30%] bg-blue-500 p-2 text-lg md:text-xl font-semibold rounded-lg text-white hover:bg-blue-600 transition"
            onClick={handleSubmit}
            >
            Update
            </button>
            <Link onClick={()=>{navigate(-1)}} className=" text-center w-[40%] md:w-[30%] bg-orange-500 p-2 text-lg md:text-xl font-semibold rounded-lg text-white hover:bg-orange-600 transition">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Edit
