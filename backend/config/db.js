const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI; // Get the URI from the environment variable
        if (!uri) {
            throw new Error('MongoDB URI is undefined. Please check your .env file.');
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
