// server.js
const express = require('express');
const app = express();
const PORT =  5000;
const favRoutes = require('./routes/fav.js'); 

app.use(express.json()); // Middleware to parse JSON requests

// Use the routes for handling favourites
app.use('/api', favRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
