const express = require('express');
const connectDB = require('./user/config/db');

const app = express();      

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send("Rajni Saini's Docker");
});
app.get('/about', (req, res) => {
    res.send('About Page');
});
app.get('/contact', (req, res) => { 
    res.send('Contact Page');
});
app.get('/services', (req, res) => {
    res.send('Services Page');
});         

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});