require('dotenv').config();
const mongoose = require('mongoose');

// Use environment variables or fallback to a simple local MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log('MongoDB connected.');
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
        console.log('Continuing without MongoDB connection...');
        // Don't exit the process, just continue without DB
    }
}

module.exports = connectDB;
