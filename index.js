const express = require('express');
const bodyParser = require('body-parser');
const imageRoutesUnplash = require('./routes/imageRoutesUnplash');
const imageRoutesPixabay = require('./routes/imageRoutesPixabay');

const app = express();
app.use(bodyParser.json());

// Use imageRoutes with the '/api/images' base path
app.use('/api', imageRoutesUnplash); // Corrected the base path
app.use('/api', imageRoutesPixabay); // Corrected the base path

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
