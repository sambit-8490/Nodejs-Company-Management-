require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/companies', companyRoutes);


// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, 
    (err) =>{
        if(err) console.log("Error while running server"); 
        console.log(`Server running on port ${PORT}`
        
        )
    });
