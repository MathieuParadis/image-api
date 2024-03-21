const express = require('express');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(bodyParser.json());

// Use imageRoutes with the '/api/images' base path
app.use('/api', imageRoutes); // Corrected the base path

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
