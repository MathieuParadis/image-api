// imageRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/images', async (req, res) => {
    console.log('tes')
  try {
    const unsplashBaseUrl = 'https://api.unsplash.com';
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    console.log('tes')

    const response = await axios.get(`https://api.unsplash.com/photos/?client_id=wp00NOhUF1dglThw4_zte2Tq3wamjI7Di8BR38Blf68`, {
    //   params: { client_id: unsplashAccessKey } // Passing API key as a parameter
    });

    const photos = response.data; // Check the structure of the response
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos from Unsplash:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
