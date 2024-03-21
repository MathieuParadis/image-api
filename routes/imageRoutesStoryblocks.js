require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

router.get('/images-storyblocks', async (req, res) => {
  try {
    const storyblocksBaseUrl = 'https://api.graphicstock.com/api/v2/images/search?';
    const storyblocksPublicKey = process.env.STORYBLOCKS_PUBLIC_KEY;
    const storyblocksPrivateKey = process.env.STORYBLOCKS_PRIVATE_KEY;

    const expires = Math.floor(Date.now() / 1000) + 100;
    const hmacBuilder = crypto.createHmac('sha256', storyblocksPrivateKey + expires);
    hmacBuilder.update(storyblocksBaseUrl);
    const hmac = hmacBuilder.digest('hex');

    const response = await axios.get(storyblocksBaseUrl, {
      params: {
        APIKEY: storyblocksPublicKey,
        EXPIRES: expires,
        HMAC: hmac,
        results_per_page: 50
      }
    });

    console.log('Response from Storyblocks API:', response.data); // Log the response data

    const images = response.data;
    res.json(images);
  } catch (error) {
    console.error('Error fetching images from Storyblocks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
