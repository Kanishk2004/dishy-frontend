# Dishy - The Flavour Network

Dishy is a recipe-sharing web application that allows users to create accounts, post recipes, add favorites, rate other recipes, and track their activity through various statistics. This repository contains the frontend code for Dishy, developed using Next.js and integrated with the `dishy-api` backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Known Issues](#known-issues)
- [License](#license)

## Features

- User Registration and Login
- Post, Edit, and Delete Recipes
- Add Recipes to Favorites
- Rate and Review Recipes
- View Stats on Posted Recipes

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **React**: JavaScript library for building user interfaces.
- **React-Dropzone**: For drag-and-drop image upload functionality.
- **Browser Image Compression**: For client-side image compression before upload.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dishy-frontend.git
   cd dishy-frontend
   ```
2. Install Dependencies
   After navigating into the project directory, install the necessary dependencies:
   ```bash
   npm install
   ```
3. Running the Application
   Start the development server using the following command:
   ```bash
   npm run dev
   ```
   The application will start on http://localhost:3000.

### API Integration

This frontend application connects to the dishy-api backend. The base URL for API requests is stored in a constant file (Constant.js) as apiURL. During development, this points to http://localhost:8080/api/v1. Update this URL when deploying the application.

### Authentication

User authentication is managed through cookies set by the backend upon successful login. The frontend checks these cookies to handle session management and to update the user interface accordingly.

### Known Issues

The application is still under development and may have several limitations and bugs. Please expect incomplete features and potential issues.
