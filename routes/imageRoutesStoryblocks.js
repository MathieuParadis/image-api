require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

router.get('/images-storyblocks', async (req, res) => {
  try {
    // url info
    const storyblocksBaseUrl = 'https://api.graphicstock.com';
    const resource = '/api/v2/images/search';
    const urlWithoutQueryParams = storyblocksBaseUrl + resource;

    // API keys & IDs
    const storyblocksPublicKey = process.env.STORYBLOCKS_PUBLIC_KEY;
    const storyblocksPrivateKey = process.env.STORYBLOCKS_PRIVATE_KEY;
    const storyblocksProjectId = process.env.STORYBLOCKS_PROJECT_ID;
    const storyblocksUserId = process.env.STORYBLOCKS_USER_ID;

    // HMAC generation
    const expires = Math.floor(Date.now() / 1000) + 100;
    const hmacBuilder = crypto.createHmac('sha256', storyblocksPrivateKey + expires);
    hmacBuilder.update(resource);
    const hmac = hmacBuilder.digest('hex');
    

    const response = await axios.get(urlWithoutQueryParams, {
      params: {
        APIKEY: storyblocksPublicKey,
        EXPIRES: expires,
        HMAC: hmac,
        project_id: storyblocksProjectId,
        user_id: storyblocksUserId
      }
    });

    const images = response.data.results.map(img => ({
      image_ID: img.id,
      thumbnails: img.thumbnail_url,
      preview: img.preview_url,
      title: img.title,
      source: 'Storyblocks',
      tags: img.tags
    }));

    res.json(images);
  } catch (error) {
    console.error('Error while fetching images from Storyblocks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
