## Portfolio Web Application

This is a personal portfolio web application built using Express.js and MongoDB as the database. It allows users to showcase their projects, articles, and other professional achievements in an organized and dynamic way. The application features both an admin panel for managing content and a user-facing frontend to display the portfolio.

## Features

- **Admin Panel: Manage portfolio content such as projects, articles, and personal details.**
- **User Authentication: Admin login functionality to protect the content management system.**
- **Dynamic Categories: Posts are organized by categories (e.g., "Articles" and "Portfolios") that can be dynamically created, updated, and deleted.**
- **CRUD Operations: Add, update, and delete portfolio entries through an easy-to-use interface.**
- **Responsive Design: The frontend is designed to be fully responsive and accessible across devices.**
- **Image Uploads: Upload images for each project or article.**
- **Content Filtering: Filter portfolio items by categories on the frontend without page reloads (using AJAX).**

## Technologies Used

- **Node.js: Server-side JavaScript runtime.**
- **Express.js: Web framework for building the backend.**
- **MongoDB: NoSQL database for storing portfolio content.**
- **Mongoose: ODM library for MongoDB, handling database schemas and queries.**
- **EJS (Embedded JavaScript): Template engine for rendering HTML views.**
- **Bootstrap: Frontend framework for responsive design.**
- **AJAX: Used for fetching content dynamically without reloading pages.**

## Getting Started

## Prerequisites

- **Node.js (v14+)**
- **MongoDB (locally or via MongoDB Atlas)**
- **npm (comes with Node.js)**

## Installation

1. Clone the repository:

   git clone https://github.com/yourusername/portfolio-webapp.git
   cd portfolio-webapp

2. Install dependencies:

   npm install
   npm start
   Access the application in your browser at http://localhost:3000.

Admin Login
To access the admin panel, you need to log in with an admin account. Set up your initial admin account directly in the database (MongoDB) by creating a user document in the users collection.

## Picture

![Dashboard](</pictdoc/Screenshot 2024-09-15 at 20.45.03.png>)
![Category](</pictdoc/Screenshot 2024-09-15 at 20.45.08.png>)
![Create Category](</pictdoc/Screenshot 2024-09-15 at 20.45.12.png>)
![Post](</pictdoc/Screenshot 2024-09-15 at 20.45.17.png>)
![Data](</pictdoc/Screenshot 2024-09-15 at 20.45.21.png>)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
