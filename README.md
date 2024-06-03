# Drone Management System

This project is a Drone Management System that allows users to manage drones, sites, and missions. The system includes user authentication and authorization, and CRUD operations for drones, sites, and missions.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/virajhmehta/flytbase.git
    cd flytbase
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=8000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.vkouj2v.mongodb.net
    JWT_SECRET=JWT
    CORS_ORIGIN=http://localhost:8000
    ```

4. Start the server:

    ```bash
    npm start
    ```
5. postman collection
    ``` refer the file named as flytbase.postman_collection ```

## steps to run
1. Register the user with the below credentials
2. login with that credentials 
3. you will get the token, use that token to verify the postman collection

## API Endpoints

### User Routes

- **Register User**

    **URL**: `/api/users/register`

    **Method**: `POST`

    **Body**:

    ```json
    {
        "username": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123"
    }

    ```

- **Login User**

    **URL**: `/api/users/login`

    **Method**: `POST`

    **Body**:

    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

