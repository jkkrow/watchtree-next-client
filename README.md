<div align="center">
  <a href="https://watchtree.net">
    <img src="https://raw.githubusercontent.com/jkkrow/watchtree-next-client/main/public/readme.png" alt="WatchTree - A Video Streaming Platform for Enthusiastic Creators">
  </a>
  <h1 align="center">WatchTree</h1>
  <p align="center">
    A Video Streaming Platform for Enthusiastic Creators.
  </p>
  <a href="https://watchtree.net">
    <strong>Explore the website »</strong>
  </a>
  <br />
  <a href="https://github.com/jkkrow/watchtree-next-client">Client</a>
  ·
  <a href="https://github.com/jkkrow/watchtree-nest-api">Server</a>
</div>

# WatchTree - Client

WatchTree is a video streaming platform that allows users to enjoy a seamless experience while watching and uploading videos. This client app built with NextJS, provides a wide range of features and utilizes cutting-edge technologies to ensure smooth user interaction.

## About

This project was born out of my passion for full-stack web development, and my desire to bring my envisioned idea to life, transforming it from a mere concept into a tangible reality, by using the knowledge that I've learned. Initially built using the MERN stack (React, Express, NodeJS, MongoDB), I decided to take it to the next level by rebuilding it with different tech stacks, incorporating advanced techniques, cleaner code, and improved structure that adhere to best practices.

At its core, this website is a video streaming platform that offers a unique user experience through its tree-structured video format. This format allows users to actively engage with the content by selecting their desired path as they watch, effectively personalizing their viewing experience. Content creators can leverage this interactive format to produce captivating stories that unfold in multiple directions, offering viewers a truly immersive experience.

With the goal of making video streaming more dynamic and engaging, this platform encourages active viewer participation and fosters deeper connections between creators and their audience. By showcasing the potential of the tree-structured video format, this project aims to inspire creative and innovative content that pushes the boundaries of traditional video streaming.

Whether you're a developer interested in the technical aspects, a content creator seeking new ways to tell stories, or a viewer looking for an interactive experience, this project can offer a fresh perspective on the world of video streaming.

## Key Features

### User Authentication

- User sign-in and sign-up with email verification
- Google sign-in integration
- Authorization with JWT tokens using refresh token & access token
- Refresh token rotation for higher security

### Video Management

- Video streaming with adaptive formats
- Multipart video upload
- Tree-structured video format
- Save video settings with local storage
- Track upload status and continously edit with Redux state

### User Interactions

- Offset-based pagination with navigation UI
- Cursor-based pagination with infinite scrolling
- Search videos by title, categories, description, or creator name
- Subscribe / Unsubscribe other users
- Add to / Remove from favorite videos
- Save watch history
  - In the database for signed-in users
  - In IndexedDB for guest users

### User Interface

- Responsive layout
- Custom video player UI
- Smooth animations using CSS, Framer Motion, and Swiper

## Technologies

- NextJS
- TypeScript
- React
- Redux
- RTK Query
- Tailwind CSS
- IndexedDB
- Shaka Player
- Framer Motion
- Swiper

## Getting Started

To get started with the WatchTree Client App, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/jkkrow/watchtree-next-client.git
```

2. Navigate to the project directory

```bash
cd watchtree-next-client
```

3. Install the required dependencies

```bash
pnpm install
```

4. Configure environment variables
```txt
NEXT_PUBLIC_SERVER_DOMAIN
NEXT_PUBLIC_ASSET_DOMAIN
NEXT_PUBLIC_DB_TOKEN_KEY
NEXT_PUBLIC_GOOGLE_CLIENT_ID
NEXT_PUBLIC_SAMPLE_VIDEO_ID
NEXT_PUBLIC_PAYPAL_CLIENT_ID
SERVER_DOMAIN
ASSET_DOMAIN
SAMPLE_VIDEO_ID
```

5. Start the development server

```bash
pnpm dev
```

Open your browser and navigate to `http://localhost:3000` to see the application running.
