
# Sara7a App

**Sara7a** is a simple, secure messaging application with authentication, profile management, and role-based access control.

🚀 **[Live Application on Vercel](https://sara7a-app-nine.vercel.app/)**  
🌐 **[API Documentation on Postman](https://documenter.getpostman.com/view/26311189/2sAYJ7fyYU)**

---

## 🔖 Table of Contents

- [Features](##features)
- [Technologies](##technologies)
- [Setup Instructions](##setup-instructions)
- [Available Scripts](##available-scripts)
- [API Endpoints](##api-endpoints)
- [Environment Variables](##environment-variables)


---

## ✨ Features
- User authentication (sign-up, sign-in)
- Email confirmation for new accounts
- Profile management with phone number encryption and decryption
- Soft delete for user accounts (freeze account)
- Send, update, retrieve, and delete messages
- Role-based authorization (user/admin)
- Password update with validation of old password
- Message management (CRUD operations: create, read, update, delete)
- Schema validation for user and message data
- Secure JWT token-based authentication for session management
- Phone number validation (Egyptian format) during sign-up and update
  
---

## 🛠️ Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Deployment**: Vercel
- **Hashing**: bcrypt
- **Encryption**:crypto-js

---

## 🧑‍💻 Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/raneemmagdy/Sara7aApp.git
   cd Sara7aApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set up the environment variables:

   ```plaintext
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_USER=your_jwt_secret_for_users
   JWT_SECRET_ADMIN=your_jwt_secret_for_admins
   CONFIRM_SECRET_KEY=your_email_confirmation_secret
   SALT_NUMBER=10
   PHONE_SECRET_KEY=your_phone_encryption_key
   EMAIL_FOR_SEND=email_app
   PASSWORD_FOR_SEND=password_for_email_app
   ```

4. Run the server in development mode:

   ```bash
   npm run dev
   ```

5. Open your browser and visit:

   ```plaintext
   http://localhost:3000
   ```

---

## 🏃 Available Scripts

- `npm run dev`: Start the application in development mode.
- `npm start`: Start the application in production mode.

---

##  API Endpoints

### 💬 Message Routes

- **POST /messages/**: Send a message.
- **GET /messages/**: Retrieve all messages of the authenticated user.
- **DELETE /messages/deleteMessage/:messageId**: Delete a message by ID.
- **PATCH /messages/updateMessage/:messageId**: Update a message by ID.

### 🧑 User Routes

- **POST /users/signup**: Register a new user.
- **POST /users/signin**: Log in an existing user.
- **GET /users/profile**: Retrieve the authenticated user's profile.
- **PATCH /users/updateProfile**: Update the user's profile.
- **PATCH /users/updatePassword**: Change the user's password.
- **DELETE /users/freezeAccount**: Soft delete (freeze) the user account.

For detailed request and response formats, refer to the [API Documentation on Postman](https://documenter.getpostman.com/view/26311189/2sAYJ7fyYU).

---

## 🌍 Environment Variables

| Variable             | Description                                      |
| -------------------- | ------------------------------------------------ |
| `PORT`               | The port number for the server.                  |
| `MONGO_URI`          | Connection string for MongoDB.                   |
| `JWT_SECRET_USER`    | Secret key for generating JWT tokens for users.  |
| `JWT_SECRET_ADMIN`   | Secret key for generating JWT tokens for admins. |
| `CONFIRM_SECRET_KEY` | Secret key for email confirmation tokens.        |
| `SALT_NUMBER`        | Salt rounds for hashing passwords.               |
| `PHONE_SECRET_KEY`   | Secret key for phone number encryption.          |
| `EMAIL_FOR_SEND`    | The email address used for sending notifications. |
| `PASSWORD_FOR_SEND` | The application key for the email account.        |


