# COMP 3123 Assignment II - Employee Management System

Full-stack Employee Management System built with React, Node.js, Express, and MongoDB.

## 📋 Features

- User Authentication (Signup/Login)
- Employee CRUD Operations
- Profile Picture Upload
- Search by Department/Position
- Responsive UI Design
- Session Management with JWT
- Protected Routes

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Bcrypt for password hashing

## 📁 Project Structure

```
studentID_comp3123_assignment/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── employeeRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── EmployeeList.js
    │   │   ├── AddEmployee.js
    │   │   ├── EditEmployee.js
    │   │   ├── ViewEmployee.js
    │   │   ├── PrivateRoute.js
    │   │   ├── Auth.css
    │   │   └── Employee.css
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git

### 1. Clone or Create the Project

```bash
# Create project directory
mkdir studentID_comp3123_assignment
cd studentID_comp3123_assignment
```

### 2. Backend Setup

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose cors bcryptjs jsonwebtoken multer dotenv

# Install dev dependencies
npm install --save-dev nodemon

# Create project structure
mkdir models routes middleware uploads
```

Create the files I provided in the artifacts:
- `server.js`
- `models/User.js`
- `models/Employee.js`
- `routes/userRoutes.js`
- `routes/employeeRoutes.js`
- `middleware/auth.js`
- `.env`

Update your `package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `.env` file with your connection string

### 4. Frontend Setup

```bash
# From project root
cd ..

# Create React app
npx create-react-app frontend

# Navigate to frontend
cd frontend

# Install dependencies
npm install react-router-dom axios
```

Create the directory structure:
```bash
mkdir src/components src/context src/services
```

Copy all the React component files I provided into their respective directories.

Update `package.json` to include the proxy:
```json
"proxy": "http://localhost:5000"
```

### 5. Environment Variables

Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/comp3123_assignment
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

Optional: Create `.env` in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

React app will open automatically at `http://localhost:3000`

## 🔐 API Endpoints

### User Routes
- `POST /api/v1/user/signup` - Create new user
- `POST /api/v1/user/login` - User login

### Employee Routes (Protected)
- `GET /api/v1/emp/employees` - Get all employees
- `GET /api/v1/emp/employees/:id` - Get employee by ID
- `POST /api/v1/emp/employees` - Create new employee
- `PUT /api/v1/emp/employees/:id` - Update employee
- `DELETE /api/v1/emp/employees/:id` - Delete employee
- `GET /api/v1/emp/search?department=X&position=Y` - Search employees

## 📱 Application Features

### Authentication
1. **Signup**: Create new account with username, email, and password
2. **Login**: Authenticate and receive JWT token
3. **Session Management**: Token stored in localStorage
4. **Protected Routes**: Automatic redirect to login if not authenticated

### Employee Management
1. **View All Employees**: Display in table format with profile pictures
2. **Add Employee**: Form with all fields including file upload
3. **Edit Employee**: Update employee information
4. **View Details**: See complete employee information
5. **Delete Employee**: Remove employee with confirmation
6. **Search**: Filter by department or position

## 🎨 UI/UX Features

- Professional gradient design
- Responsive layout for all screen sizes
- Form validation with error messages
- Loading states for better UX
- Success/Error notifications
- Hover effects and smooth transitions
- Profile picture preview before upload

## 📝 Testing the Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Create a new account via Signup
4. Login with your credentials
5. Add some employees with profile pictures
6. Test CRUD operations
7. Try search functionality
8. Test logout and session persistence

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access in MongoDB Atlas

### CORS Issues
- Ensure CORS is enabled in backend
- Check proxy setting in frontend `package.json`

### File Upload Issues
- Verify `uploads` directory exists
- Check file size limits (5MB default)
- Ensure correct file types (images only)

### Token Issues
- Clear localStorage if authentication fails
- Check JWT_SECRET matches in backend
- Verify token expiration time

## 📦 GitHub Repository Setup

```bash
# Initialize git (from project root)
git init

# Create .gitignore
echo "node_modules/
.env
uploads/
build/
.DS_Store" > .gitignore

# Add files
git add .

# Commit
git commit -m "Initial commit: Employee Management System"

# Create GitHub repository and push
git remote add origin https://github.com/VirtualVince/3123-Assignment-2
git branch -M main
git push -u origin main
```

## 🚢 Docker Deployment (Optional)

If you want to use Docker, create these files:

**backend/Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**frontend/Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**docker-compose.yml (root):**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/comp3123_assignment
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

## 📄 License

This project is created for educational purposes as part of COMP 3123 course assignment.

## 👨‍💻 Author

Vincente Sequeira - 101484793