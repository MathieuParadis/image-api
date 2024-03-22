require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

router.get('/images', async (req, res) => {
  try {
    const unsplashBaseUrl = 'https://api.unsplash.com';
    const pixabayBaseUrl = 'https://pixabay.com/api/?';
    const storyblocksBaseUrl = 'https://api.graphicstock.com';
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    const pixabayApiKey = process.env.PIXABAY_API_KEY;
    const storyblocksPublicKey = process.env.STORYBLOCKS_PUBLIC_KEY;
    const storyblocksPrivateKey = process.env.STORYBLOCKS_PRIVATE_KEY;
    const storyblocksProjectId = process.env.STORYBLOCKS_PROJECT_ID;
    const storyblocksUserId = process.env.STORYBLOCKS_USER_ID;

    // Create promises for each API call
    const unsplashPromise = axios.get(`${unsplashBaseUrl}/search/photos`, {
      params: { count: 10, query: 'man' },
      headers: { Authorization: `Client-ID ${unsplashAccessKey}` }
    });

    const pixabayPromise = axios.get(`${pixabayBaseUrl}key=${pixabayApiKey}`, {
      params: { q: 'man' }
    });

    const expires = Math.floor(Date.now() / 1000) + 100;
    const hmacBuilder = crypto.createHmac('sha256', storyblocksPrivateKey + expires);
    hmacBuilder.update('/api/v2/images/search');
    const hmac = hmacBuilder.digest('hex');

    const storyblocksPromise = axios.get(`${storyblocksBaseUrl}/api/v2/images/search`, {
      params: {
        APIKEY: storyblocksPublicKey,
        EXPIRES: expires,
        HMAC: hmac,
        project_id: storyblocksProjectId,
        user_id: storyblocksUserId,
        keywords: 'men'
      }
    });

    const [unsplashResponse, pixabayResponse, storyblocksResponse] = await Promise.allSettled([unsplashPromise, pixabayPromise, storyblocksPromise]);

    const unsplashImages = (unsplashResponse.status === 'fulfilled') ? unsplashResponse.value.data.results.map(img => ({
      image_ID: img.id,
      thumbnails: img.urls.thumb,
      preview: img.urls.regular,
      title: img.alt_description,
      source: 'Unsplash',
      tags: img.tags.map(tag => tag.title)
    })) : [];

    const pixabayImages = (pixabayResponse.status === 'fulfilled') ? pixabayResponse.value.data.hits.map(img => ({
      image_ID: img.id,
      thumbnails: img.previewURL,
      preview: img.largeImageURL,
      title: null,
      source: 'Pixabay',
      tags: img.tags
    })) : [];

    const storyblocksImages = (storyblocksResponse.status === 'fulfilled') ? storyblocksResponse.value.data.results.map(img => ({
      image_ID: img.id,
      thumbnails: img.thumbnail_url,
      preview: img.preview_url,
      title: img.title,
      source: 'Storyblocks',
      tags: img.tags
    })) : [];

    const combinedImages = [...unsplashImages, ...pixabayImages, ...storyblocksImages];

    res.json(combinedImages);
  } catch (error) {
    console.error('Error while fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
