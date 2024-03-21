require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/images-pixabay', async (req, res) => {
  try {
    const pixabayBaseUrl = 'https://pixabay.com/api/?';
    const pixabayApiKey = process.env.PIXABAY_API_KEY;

    const response = await axios.get(`${pixabayBaseUrl}key=${pixabayApiKey}`, {
    });

    const photos = response.data;
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos from Pixabay:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
