# Foosha Store

Foosha Store is an eCommerce application developed from scratch using the MERN stack.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- User authentication and authorization
- Product management (CRUD)
- Order management
- User profile with order history
- PayPal payment integration
- Responsive design using React Bootstrap
- Admin dashboard for managing products, users, and orders

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/s4zgard/eCommerceStore.git
   cd eCommerceStore
   ```
2. Install server dependencies:
   ```bash
   yarn
   ```
3. Install client dependencies:
   ```bash
   cd client
   yarn
   cd ..
   ```
4. Set up environment variables:
   Create a .env file in the root directory and add the following variables:
   ```.ENV
   NODE_ENV=development
   PORT=3000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PAYPAL_CLIENT_ID=<your_paypal_client_id>
   ```

## Usage
1. Run the development server:
   ```
   Yarn
   ```
2. Open your browser and navigate to http://localhost:5173

## Dependencies

### Server
- bcryptjs: ^2.4.3
- colors: ^1.4.0
- cookie-parser: ^1.4.6
- express: ^4.19.2
- jsonwebtoken: ^9.0.2
- mongoose: ^8.4.0
- multer: ^1.4.5-lts.1
- concurrently: ^8.2.2
- dotenv: ^16.4.5

### Client
- @paypal/react-paypal-js: ^8.5.0
- @reduxjs/toolkit: ^2.2.5
- axios: ^1.7.2
- bootstrap: ^5.3.3
- react: ^18.2.0
- react-bootstrap: ^2.10.2
- react-dom: ^18.2.0
- react-helmet-async: ^2.0.5
- react-icons: ^5.2.1
- react-redux: ^9.1.2
- react-router-bootstrap: ^0.26.2
- react-router-dom: ^6.23.1
- react-toastify: ^10.0.5

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author
Sajjad Ahmed
