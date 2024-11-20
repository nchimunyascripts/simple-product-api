# MERN Stack Employee Database Application  

Welcome to the **MERN Stack Employee Database Application**! This guide will help you build a full-stack application using MongoDB, Express, React, and Node.js. The app is designed to record employee information and display it using a React front end.

---

## Table of Contents
1. [About the MERN Stack](#about-the-mern-stack)  
2. [Prerequisites](#prerequisites)  
3. [Project Setup](#project-setup)  
4. [Back-End Setup](#back-end-setup)  
    - [Installing Dependencies](#installing-dependencies)  
    - [Connecting to MongoDB Atlas](#connecting-to-mongodb-atlas)  
    - [API Endpoints](#api-endpoints)  
5. [Front-End Setup](#front-end-setup)  
    - [Installing React and Vite](#installing-react-and-vite)  
    - [Adding Tailwind CSS](#adding-tailwind-css)  
    - [Setting Up React Router](#setting-up-react-router)  
    - [Creating Components](#creating-components)  
6. [Running the Application](#running-the-application)  

---

## About the MERN Stack  
The **MERN stack** is a popular web development framework that includes:  
- **MongoDB**: A NoSQL database for storing data.  
- **Express**: A Node.js framework for building APIs.  
- **React**: A JavaScript library for building user interfaces.  
- **Node.js**: A JavaScript runtime for building the back end.  

---

## Prerequisites  
Before starting, ensure you have:  
1. **Node.js** (v20.11.0 or later).  
2. A code editor (e.g., **Visual Studio Code**).  
3. A **MongoDB Atlas** account for hosting your database ([Sign up for free here](https://www.mongodb.com/cloud/atlas)).  

---

## Project Setup  

1. Create a project folder:  
   ```bash
   mkdir mern && cd mern
   ```

2. Set up separate folders for the server and client:  
   ```bash
   mkdir server client
   ```

---

## Back-End Setup  

### Installing Dependencies  
Navigate to the `server` folder and initialize your project:  
```bash
cd server  
npm init -y  
```

Install required packages:  
```bash
npm install mongodb express cors
```

### Connecting to MongoDB Atlas  
1. Create a `config.env` file and add your MongoDB connection string:  
   ```env
   ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.<projectId>.mongodb.net/employees?retryWrites=true&w=majority  
   PORT=5050
   ```

2. Create a `connection.js` file under the `db` folder to connect to MongoDB:  
   ```javascript
   import { MongoClient, ServerApiVersion } from "mongodb";

   const uri = process.env.ATLAS_URI || "";
   const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true } });

   try {
       await client.connect();
       console.log("Connected to MongoDB!");
   } catch (err) {
       console.error(err);
   }

   export default client.db("employees");
   ```

### API Endpoints  
Define routes in `routes/record.js`:  
```javascript
import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all records
router.get("/", async (req, res) => {
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
});

// Create a record
router.post("/", async (req, res) => {
    const collection = db.collection("records");
    const result = await collection.insertOne(req.body);
    res.status(201).send(result);
});

export default router;
```

---

## Front-End Setup  

### Installing React and Vite  
1. Navigate to the `client` folder and initialize a React project:  
   ```bash
   npm create vite@latest . --template react  
   npm install
   ```

### Adding Tailwind CSS  
1. Install Tailwind CSS:  
   ```bash
   npm install -D tailwindcss postcss autoprefixer  
   npx tailwindcss init -p
   ```

2. Configure Tailwind in `tailwind.config.js`:  
   ```javascript
   export default {
       content: ["./index.html", "./src/**/*.{js,jsx}"],
       theme: { extend: {} },
       plugins: [],
   };
   ```

3. Add Tailwind directives in `src/index.css`:  
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Setting Up React Router  
Install React Router:  
```bash
npm install react-router-dom
```

Define routes in `src/main.jsx`:  
```javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import RecordList from "./components/RecordList";
import "./index.css";

const router = createBrowserRouter([
    { path: "/", element: <RecordList /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
```

### Creating Components  
Create components for `Navbar`, `RecordList`, and `ModifyRecord` under `src/components/`.  

Example `RecordList.jsx`:  
```javascript
const RecordList = () => {
    return <div>Record List Component</div>;
};

export default RecordList;
```

---

## Running the Application  

1. **Start the back end**:  
   ```bash
   cd server  
   node --env-file=config.env server.js
   ```

2. **Start the front end**:  
   ```bash
   cd client  
   npm run dev
   ```

3. Access the application in your browser at `http://localhost:5173`.  

---

Enjoy building your MERN Stack Employee Database Application! 🚀  