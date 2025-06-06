# 🌐 Social Network Platform

## 📄 Project Description

This project involves the development of a full-stack social networking web application designed to enable users to interact through posting content, commenting, liking/disliking posts, and following other users. The system aims to simulate key features of modern social platforms using a robust and scalable technology stack. The application addresses the challenges of real-time interaction, user data management, and secure content sharing within a structured relational database framework.

## 🎯 Functional and Non-functional Requirements

### ✅ Functional Requirements
- User registration and login functionality with JWT-based authentication
- Secure password handling via hashing algorithms
- CRUD operations for user-generated posts and comments
- Like and dislike features for posts
- Follow/unfollow functionality between users
- Media/file upload support (e.g., images in posts or profiles)
- Profile management and editable user information
- RESTful API to handle all frontend-backend communication

### 🚫 Non-functional Requirements
- Responsive and intuitive user interface across devices
- Modular and maintainable codebase with clear separation of concerns
- Scalability of backend components for increasing data volume
- Use of secure authentication practices and HTTPS-ready communication
- Efficient querying and indexing of relational data in MySQL
- Comprehensive error handling and input validation mechanisms

## 🧱 Core Entity Overview

- **User**: Stores credentials, profile details, and follower/following relationships
- **Post**: Represents user-generated content including text, timestamps, and associated media
- **Comment**: Stores content associated with posts and users
- **Like**: Represents the relationship between users and liked posts
- **Follow**: Defines the follower-following dynamics between users
- **Media**: Manages file metadata and references for uploaded images or videos
- **Authentication**: Manages login credentials, JWT tokens, hashed passwords, and session cookies; ensures secure access control to protected routes and resources

## 🔧 Technology Stack

### Frontend
- **React.js**: Component-based UI development
- **Tailwind CSS**: Utility-first CSS framework
- **daisyUI**: Tailwind CSS-based UI component library
- **React Query**: Server-state management and data fetching

### Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express.js**: Framework for building RESTful APIs

### Database
- **MySQL**: Relational database for structured data persistence

### Security & Middleware
- **JWT**: Token-based authentication
- **Cookies**: Secure client-server session management

## 👥 Team Members and Roles

- **Nguyen Tung Lam – V202100571** – Frontend Developer: Responsible for UI/UX development, React components, and client-side state management.
- **Vu Binh Minh – V202100421** – Backend Developer: Implements Express.js API routes, middleware, and integrates security and RESTful practices.
- **Bui Huy Linh Phuc – V202100398** – Database & Authentication Engineer: Designs and manages the MySQL schema, handles data relationships, and implements secure authentication mechanisms.

## 📅 Project Timeline and Milestones

| Milestone                               | Timeframe         | Description |
|-----------------------------------------|-------------------|-------------|
| 🔍 Requirements Analysis & Planning     | May 1–2           | Define system scope, entity models, and tech stack |
| 🏗️ Database Schema & Setup             | May 3–5           | Design MySQL tables, relationships, and indexes |
| 🛠️ Backend API Development             | May 6–10          | Develop Express.js endpoints for users, posts, auth |
| 🎨 Frontend UI Implementation           | May 11–15         | Build React components and page layouts |
| 🔐 Authentication & File Upload         | May 16–18         | JWT integration, cookie auth, media handling |
| 🔄 Feature Integration & Testing        | May 19–25         | Connect frontend to backend, test core features |
| 🧪 Final Testing & Bug Fixing           | May 26–28         | Final QA, performance tuning, and fixes |
| 📝 Documentation & Submission           | May 29–30         | Complete README, code comments, and handover |


## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/social-network-platform.git
```

### 2. Set Up Clerk

Go to the [Clerk Dashboard](https://dashboard.clerk.com) & [Cloudinary](https://dashboard.clerk.com) and create a new application.

Copy your **Frontend API**, **Publishable Key**, and **Secret Key**.

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### 4. Install Dependencies
```bash
npm install
```
### 5. Set Up the Database

You have two options to set up your local database:

#### Option 1: Use Prisma (Recommended)

Push the Prisma schema to your database:

```bash
npx prisma db push
```

#### Option 2: Use SQL Files (Manual)

You can also create the local database manually using the SQL files located in the db/ directory.

### 6. Run the Development Server

```bash
npm run dev
```

Open your browser and visit: http://localhost:3000

## Acknowledgement

This project is conducted as part of COMP3030-Database & Database Systems course at our university. We would like to express our heartfelt appreciation to our course instructor and teaching assistants for their guidance, insightful feedback, and continued support throughout the development of this project.

## Authors and Contact Information

- **Nguyen Tung Lam**  
  *V202100571*  
  Email: [21lam.nt@vinuni.edu.vn](mailto:21lam.nt@vinuni.edu.vn)

- **Vu Binh Minh**  
  *V202100421*  
  Email: [21minh.vb@vinuni.edu.vn](mailto:21minh.vb@vinuni.edu.vn)

- **Bui Huy Linh Phuc**  
  *V202100398*  
  Email: [21phuc.bhl@vinuni.edu.vn](mailto:21phuc.bhl@vinuni.edu.vn)

Feel free to contact us with any questions, suggestions, or comments related to this project. We welcome any feedback that can help improve this work or contribute to further research in the domain of music data analysis and visualization.
