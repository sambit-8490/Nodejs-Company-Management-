import React, { useState, useContext } from 'react';
import axios from 'axios';
import  {AuthContext}  from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import Nav from "../Nav";
const Create = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from context
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission for creating a company
  const handleSubmit = async (e) => {
      e.preventDefault();
         console.log(companyName);
         console.log(address);
         console.log(user);
         let {username,role}=user;
         // created by and based on role status
         let created_by=username;
         let status=(role === 'admin') ? 'approved' : 'unapproved';
      try{
          const response = await axios.post('http://localhost:5000/api/companies', {
              companyName,
              address,
              created_by, // Use logged-in user's username as the created_by field
              status // Automatically approve for admins
          },{headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Send the token if necessary
          }});
          console.log('Company created:', response.data);

          setSuccessMessage('Company created successfully!');
          setCompanyName('');
          setAddress('');

          try {
            // Assuming `user` contains the role information
            const { role } = user;  // Ensure role is fetched correctly from user object or AuthContext
            console.log("User role: ", role);  // Debugging: check the role value
        
            // Logic to handle success, followed by role-based redirection
            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/admin'); // Redirect admin to Admin page
                } else if (role === 'user') {
                    navigate('/user'); // Redirect user to User page
                } else {
                    setError('Invalid role detected. Cannot navigate.');
                }
            }, 1000); // Delay to display success message
        } catch (error) {
            setError('Error creating company. Please try again. ' + error.message);
        }
        
      } catch (error) {
          setError('Error creating company. Please try again.'+error.message);
      }
  };
  return (
    <div>
      <Nav />
      <section className="h-[90vh] w-full flex flex-col justify-center items-center">
        <form  onSubmit={handleSubmit} className="md:w-[60%] lg:w-[45%]  w-[80%] flex flex-col gap-10 justify-center shadow-lg shadow-gray-600 px-10 py-6 rounded-lg">
          <p className="text-xl pt-5 md:text-2xl font-semibold md:font-bold ">
            Create Company
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
              <label className="md:w-[25%] w-full text-lg md:text-xl font-semibold">
                Name 
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="border border-gray-500 rounded-lg w-full p-2 outline-none"
                value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
              />
            </div>
            <div></div>
            {/* Company Address Input */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <label className="md:w-[25%] w-full text-lg md:text-xl  font-semibold">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                className="border border-gray-500 rounded-lg w-full p-2 outline-none"
                value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-around mt-4">
            <button type="submit" className="w-[40%] md:w-[30%] bg-blue-500 p-2 text-lg md:text-xl font-semibold rounded-lg text-white hover:bg-blue-600 transition">
              Save
            </button>
            <Link onClick={()=>{navigate(-1)}} className=" text-center w-[40%] md:w-[30%] bg-orange-500 p-2 text-lg md:text-xl font-semibold rounded-lg text-white hover:bg-orange-600 transition">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
