# Company Management System

## Overview

It is a web-based Company Management System designed to facilitate creating, managing, and approving company records. Built on the MERN stack (MongoDB, Express, React, Node.js), the application offers a seamless user experience through a well-structured interface and efficient data handling.

## Features

- **User Authentication**: Secure login and registration processes.
- **Company Management**: Create, edit, delete, and approve company records.
- **Search, Filter, and Sort**: Enhanced data retrieval and organization functionalities.
- **Responsive Design**: A mobile-friendly interface for diverse user needs.
- **Error Handling**: User-friendly messages to improve the user experience.

## Technologies Used

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS (or any other CSS framework of your choice)

# Step-by-Step Functionality

1. Frontend (React.js)
The frontend is built using React.js, allowing users to interact with the application through various components like Login, Register, Home, CompanyList, CreateCompany, and EditCompany. The UI supports functionalities such as search, filter, sort, and pagination.

Step-by-Step Principles:
Routing:

The application uses React Router to manage navigation through routes such as /login, /register, /home, /company-list, /create-company, and /edit-company.
Each route renders a respective component, with the Nav component visible on all pages except login and registration.
Login and Register Pages:

Users can enter their login or registration information.
Axios sends API requests to the backend for authentication.
Validation and error handling occur, redirecting users to the Home page upon successful login.
Company List Page:

Displays a list of companies created by the logged-in user.
Includes search, filter, and sort features to enhance data accessibility.
Pagination enables users to navigate through company records efficiently.
Conditional rendering applies to buttons, ensuring disabled buttons are styled appropriately.
Create and Edit Company Pages:

Users can fill out forms to create or edit company records.
Form data (like company name, address, created by, and status) is sent to the backend for processing.
On successful submission, users are redirected back to the Company List page.
Search, Filter, and Sort:

A search bar allows users to filter company records based on attributes like name or status.
Sorting options enable users to organize data by fields like creation date or company name.
Search results update in real-time, providing immediate feedback.
2. Backend (Node.js + Express)
The backend is built using Node.js and Express to handle API requests from the frontend, interacting with the MongoDB database for storing, retrieving, and manipulating company data.

Step-by-Step Principles:
API Routes:

Various routes are set up (e.g., POST /login, POST /register, GET /companies, POST /company, PUT /company/:id, and DELETE /company/:id).
These routes handle CRUD (Create, Read, Update, Delete) operations for company records.
Middleware manages tasks like validation, authentication, and error handling.
Company Model:

A Company Schema is defined using Mongoose.
Key fields include companyID, companyName, created_by, address, and status.
An empid field serves as a primary key and can be auto-incremented using Mongoose or another method.
Handling Data:

Company data is stored in the MongoDB collection, allowing efficient management of records.
Each company has associated fields for easy retrieval and modification.
Security:

Authentication logic ensures that only authorized users can access sensitive routes (e.g., the company list).
JWT (JSON Web Tokens) or similar mechanisms manage secure user sessions.
3. Database (MongoDB)
MongoDB serves as the database for storing company data, with Mongoose acting as an ODM (Object Data Modeling) library for structured data interaction.

Step-by-Step Principles:
Company Collection:

Company data is stored in a dedicated collection, with each entry containing fields such as companyID, companyName, created_by, etc.
CRUD Operations:

Create: A new company is added to the database when the Create Company form is submitted.
Read: The Company List page retrieves and displays company data.
Update: Companies can be edited, with changes saved in the database via the PUT request.
Delete: Companies can be removed, and the UI updates accordingly.
Auto-Increment Field (empid):

While MongoDB's _id field uniquely identifies records, the empid field can auto-increment using a library or manual counter management for simplicity.
Pagination Logic:

Implemented pagination to divide company data across multiple pages:
Previous and Next buttons facilitate navigation.
Buttons are conditionally disabled based on the current page, with appropriate styling.
Success Message Timeout:

When a company is deleted, a success message displays for 2 seconds before disappearing, achieved through setTimeout.
