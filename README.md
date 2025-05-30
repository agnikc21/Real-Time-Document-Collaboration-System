# Real-time Document Collaboration Platform

A modern, real-time collaborative document editor built with React, Socket.IO, and AWS Cognito. Create, edit, and collaborate on documents in real-time with multiple users simultaneously.


## ✨ Features

- **Real-time Collaboration**: Multiple users can edit documents simultaneously
- **Rich Text Editor**: Full-featured text editor powered by Quill.js
- **User Authentication**: Secure authentication using AWS Cognito
- **Document Management**: Create, delete, and organize documents
- **Auto-save**: Documents automatically save every 2 seconds
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Print Support**: Optimized for printing with proper page formatting

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **Quill.js** - Rich text editor
- **Socket.IO Client** - Real-time communication
- **AWS Cognito** - Authentication
- **React Router** - Client-side routing

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - Document storage
- **Mongoose** - MongoDB object modeling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or MongoDB Atlas)
- **AWS Account** (for Cognito configuration)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/agnikc21/Real-Time-Document-Collaboration-System.git
cd Real-Time-Document-Collaboration-System
```

### 2. Install dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure AWS Cognito

Create an `aws-config.js` file in the `client/src` directory:

```javascript
const awsConfig = {
  region: 'your-aws-region',
  userPoolId: 'your-user-pool-id',
  userPoolWebClientId: 'your-user-pool-web-client-id',
 
};

export default awsConfig;
```

### 4. Set up MongoDB

Make sure MongoDB is running locally on the default port (27017), or update the connection string in `server/server.js`:

```javascript
mongoose.connect("mongodb://localhost/test-docs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### 5. Start the application

Open three terminal windows:

**Terminal 1 - Start MongoDB** (if running locally):
```bash
mongod
```

**Terminal 2 - Start the server**:
```bash
cd server
npm run devStart
```

**Terminal 3 - Start the client**:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`


## 📝 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

![Screenshot](./images/screenshot.png)
![Screenshot](./images/screenshot.png)
![Screenshot](./images/screenshot.png)
![Screenshot](./images/screenshot.png)
