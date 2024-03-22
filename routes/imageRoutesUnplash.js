require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/images-unsplash', async (req, res) => {
  try {
    const unsplashBaseUrl = 'https://api.unsplash.com';
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    const response = await axios.get(`${unsplashBaseUrl}/search/photos`, {
      params: {
        count: 10,
        query: 'man'
      },
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`
      }
    });

    const images = response.data.results.map(img => ({
      image_ID: img.id,
      thumbnails: img.urls.thumb,
      preview: img.urls.regular,
      title: img.alt_description,
      source: 'Unsplash',
      tags: img.tags.map(tag => tag.title)
    }));

    res.json(images);
  } catch (error) {
    console.error('Error while fetching images from Unsplash:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
