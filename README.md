# Image Aggregator API
The Image Aggregator API is a Node.js application that aggregates images from multiple image sources including Unsplash, Pixabay, and Storyblocks. It provides a unified interface to fetch images based on a search keyword.

## Features
- Fetch images from Unsplash, Pixabay, and Storyblocks APIs.
- Combine images from multiple sources into a single response.
- Ability to specify the search keyword directly in the URL.

## Installation
1. Clone this repository to your local machine:
    ```
    git clone https://github.com/your-username/image-aggregator-api.git
    ```

2. Install dependencies using npm:
    ```
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory and adding your API keys:
    ```env
    UNSPLASH_ACCESS_KEY=your_unsplash_access_key
    PIXABAY_API_KEY=your_pixabay_api_key
    STORYBLOCKS_PUBLIC_KEY=your_storyblocks_public_key
    STORYBLOCKS_PRIVATE_KEY=your_storyblocks_private_key
    STORYBLOCKS_PROJECT_ID=your_storyblocks_project_id
    STORYBLOCKS_USER_ID=your_storyblocks_user_id
    ```

## Usage
To start the server, run:

    ```
    npm start
    ```

The server will start running on port 3000 by default. You can then access the API endpoints to fetch images.

### API Endpoints
- **GET /api/images?q=keyword**: Fetch images from multiple sources based on the specified keyword.