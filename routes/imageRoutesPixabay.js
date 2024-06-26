require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/images-pixabay', async (req, res) => {
  try {
    const pixabayBaseUrl = 'https://pixabay.com/api/?';
    const pixabayApiKey = process.env.PIXABAY_API_KEY;

    const response = await axios.get(`${pixabayBaseUrl}key=${pixabayApiKey}`, {
      params: {
        q: 'man'
      }
    });

    const images = response.data.hits.map(img => ({
      image_ID: img.id,
      thumbnails: img.previewURL,
      preview: img.largeImageURL,
      title: null,
      source: 'Pixabay',
      tags: img.tags
    }));

    res.json(images)
  } catch (error) {
    console.error('Error while fetching images from Pixabay:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
