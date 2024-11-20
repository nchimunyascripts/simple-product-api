# Product API

This Product API is built with Node.js, Express, MongoDB, and Redis for caching. It provides basic CRUD operations for managing products and includes a Redis-based caching mechanism for faster access to paginated product data.

## Features
- **Get all products**: Retrieve a list of products with pagination support.
- **Get a single product**: Retrieve details of a specific product by its ID.
- **Create a product**: Add a new product to the database.
- **Update a product**: Modify an existing product's information.
- **Delete a product**: Remove a product from the database.
- **Caching with Redis**: Cached product lists are stored in Redis for 60 seconds to improve performance.

## Technologies Used
- **Node.js**: JavaScript runtime used to build the API.
- **Express.js**: Fast and minimal web framework for Node.js.
- **MongoDB**: NoSQL database for storing product data.
- **Mongoose**: ODM for MongoDB used to manage product schemas and models.
- **Redis**: In-memory data structure store used for caching product lists.

## Endpoints

### 1. Get All Products
```http
GET /api/products
```
Retrieve a paginated list of all products.
- **Query Parameters**:
  - `page` (optional): The page number (default is 1).
  - `limit` (optional): The number of products per page (default is 10).
  
#### Example Request:
```
GET /api/products?page=1&limit=10
```

#### Example Response:
```json
{
  "products": [...],
  "totalPages": 5,
  "currentPage": 1
}
```

### 2. Get Single Product
```http
GET /api/products/:id
```
Retrieve the details of a product by its ID.

#### Example Request:
```
GET /api/products/12345
```

#### Example Response:
```json
{
  "_id": "12345",
  "name": "Product Name",
  "price": 50,
  ...
}
```

### 3. Create a Product
```http
POST /api/products
```
Create a new product.

#### Request Body:
```json
{
  "name": "Product Name",
  "price": 50,
  "description": "Product description"
}
```

#### Example Response:
```json
{
  "_id": "12345",
  "name": "Product Name",
  "price": 50,
  "description": "Product description"
}
```

### 4. Update a Product
```http
PUT /api/products/:id
```
Update an existing product by its ID.

#### Request Body:
```json
{
  "name": "Updated Product Name",
  "price": 60
}
```

#### Example Response:
```json
{
  "_id": "12345",
  "name": "Updated Product Name",
  "price": 60
}
```

### 5. Delete a Product
```http
DELETE /api/products/:id
```
Delete a product by its ID.

#### Example Response:
```json
{
  "message": "Product has been deleted"
}
```

## Setup and Installation

### Prerequisites
- Node.js
- MongoDB
- Redis

### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your MongoDB connection and Redis in the environment file (`.env`):
   ```bash
   MONGODB_URI=<Your MongoDB connection string>
   REDIS_HOST=<Your Redis host>
   REDIS_PORT=<Your Redis port>
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Running the API
The API will be running at `http://localhost:3000/`.

## Caching with Redis
- **Cache Key Format**: The cache key is generated using the page and limit query parameters in the following format:
  ```
  products:<page>:<limit>
  ```
- **TTL**: The cache for the product lists is stored for 60 seconds before it is refreshed.

## Error Handling
- The API returns `500` status code in case of server errors with a descriptive message.
- For invalid or non-existing product requests, appropriate `404` or `400` status codes are returned.

## License
This project is licensed under the MIT License.