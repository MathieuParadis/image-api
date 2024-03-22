const express = require('express');
const bodyParser = require('body-parser');
const imageRoutesUnplash = require('./routes/imageRoutesUnplash');
const imageRoutesPixabay = require('./routes/imageRoutesPixabay');
const imageRoutesStoryblocks = require('./routes/imageRoutesStoryblocks');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', imageRoutesUnplash);
app.use('/api', imageRoutesPixabay);
app.use('/api', imageRoutesStoryblocks);
app.use('/api', imageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
