# Employee Management System

A full-stack web application for managing employee records with user authentication, built with the MERN stack (MongoDB, Express.js, React, Node.js).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)

## 📖 About

This Employee Management System is a comprehensive CRUD application developed as part of COMP 3123 - Full Stack Development course. It demonstrates modern web development practices including RESTful API design, JWT authentication, file uploads, and responsive UI design.

### Key Features

- 🔐 **Secure Authentication** - JWT-based user signup and login
- 👥 **Employee CRUD** - Complete Create, Read, Update, Delete operations
- 🖼️ **Profile Pictures** - Upload and manage employee profile images
- 🔍 **Advanced Search** - Filter employees by department or position
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, professional interface with smooth animations
- 🔒 **Protected Routes** - Secure pages requiring authentication
- ⚡ **Real-time Validation** - Instant form validation feedback

## 🎥 Demo

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 6.20.0 - Client-side routing
- **Axios** 1.6.2 - HTTP client
- **Context API** - State management
- **CSS3** - Custom styling with modern design

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.0 - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0 or higher) - Either locally or MongoDB Atlas account
- **Git** - For cloning the repository

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VirtualVince/3123-Assignment-2.git
cd 3123-Assignment-2
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/comp3123_assignment
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/comp3123_assignment?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install
```

Optional: Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

### 4. Start the Application

#### Start Backend Server

```bash
# From backend directory
npm run dev
```

The backend server will start on `http://localhost:5000`

You should see:
```
Server running on port 5000
MongoDB Connected
```

#### Start Frontend Development Server

```bash
# From frontend directory (open new terminal)
npm start
```

The React app will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
3123-Assignment-2/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── Employee.js             # Employee schema
│   ├── routes/
│   │   ├── userRoutes.js           # Authentication routes
│   │   └── employeeRoutes.js       # Employee CRUD routes
│   ├── uploads/                    # Profile pictures storage
│   ├── server.js                   # Express server entry point
│   ├── .env                        # Environment variables
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js            # Login page
    │   │   ├── Signup.js           # Registration page
    │   │   ├── EmployeeList.js     # Employee table view
    │   │   ├── AddEmployee.js      # Add employee form
    │   │   ├── EditEmployee.js     # Edit employee form
    │   │   ├── ViewEmployee.js     # Employee details view
    │   │   ├── PrivateRoute.js     # Route protection
    │   │   ├── Auth.css            # Auth page styles
    │   │   └── Employee.css        # Employee page styles
    │   ├── context/
    │   │   └── AuthContext.js      # Authentication context
    │   ├── services/
    │   │   └── api.js              # Axios API configuration
    │   ├── App.js                  # Main app component
    │   ├── App.css                 # Global styles
    │   └── index.js                # React entry point
    ├── .gitignore
    └── package.json
```

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/user/signup` | Register new user | No |
| POST | `/api/v1/user/login` | User login | No |

**Signup Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Employee Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/emp/employees` | Get all employees | Yes |
| GET | `/api/v1/emp/employees/:id` | Get employee by ID | Yes |
| POST | `/api/v1/emp/employees` | Create new employee | Yes |
| PUT | `/api/v1/emp/employees/:id` | Update employee | Yes |
| DELETE | `/api/v1/emp/employees/:id` | Delete employee | Yes |
| GET | `/api/v1/emp/search` | Search employees | Yes |

**Create Employee Request Body (multipart/form-data):**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@company.com",
  "position": "Software Engineer",
  "salary": 75000,
  "date_of_joining": "2024-01-15",
  "department": "Engineering",
  "profile_picture": [File]
}
```

**Search Query Parameters:**
```
GET /api/v1/emp/search?department=Engineering&position=Manager
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User signs up or logs in
2. Server generates JWT token
3. Token is stored in localStorage
4. Token is sent with each API request in Authorization header: `Bearer <token>`
5. Backend middleware verifies token before processing protected routes

## 🎨 Features Walkthrough

### 1. User Registration & Login
- Create account with username, email, and password
- Secure password hashing with bcrypt
- Form validation for all fields
- Automatic redirect to employee list after login

### 2. Employee Management
- **View All**: Displays employees in a responsive table
- **Add New**: Form to create employee with profile picture
- **Edit**: Update employee information
- **View Details**: See complete employee profile
- **Delete**: Remove employee with confirmation dialog

### 3. Search Functionality
- Filter by department
- Filter by position
- Combined search criteria
- Real-time results

### 4. Profile Pictures
- Upload during employee creation
- Update existing photos
- Preview before submission
- Automatic image validation (format, size)

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Create new user account
- [ ] Login with credentials
- [ ] Add employee without photo
- [ ] Add employee with photo
- [ ] View employee list
- [ ] Search by department
- [ ] Search by position
- [ ] View employee details
- [ ] Edit employee information
- [ ] Update profile picture
- [ ] Delete employee
- [ ] Logout and verify session cleared
- [ ] Try accessing protected routes without login

### Sample Test Data

```javascript
// Test User
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}

// Test Employee
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane.smith@company.com",
  "position": "Senior Developer",
  "salary": 95000,
  "date_of_joining": "2023-06-01",
  "department": "Engineering"
}
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### MongoDB Connection Error
```
Error: MongoDB Connection Error
```
**Solution:**
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify `MONGODB_URI` in `.env` file
- Check network access in MongoDB Atlas (whitelist your IP)

#### CORS Issues
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure backend server is running
- Check `cors()` is enabled in `server.js`
- Verify `proxy` setting in frontend `package.json`

#### Token Expired/Invalid
```
Error: Invalid or expired token
```
**Solution:**
- Clear localStorage and login again
- Check JWT_SECRET matches between requests
- Verify token expiration time in backend

#### File Upload Fails
```
Error: File upload failed
```
**Solution:**
- Check `uploads/` directory exists in backend
- Verify file size is under 5MB
- Ensure file is an image format (jpg, png, gif)
- Check folder write permissions

#### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:**
```bash
# Find process using port
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

## 🚢 Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku create your-app-name-backend
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Environment Variables for Production

**Backend:**
- `MONGODB_URI` 
- `JWT_SECRET` 
- `PORT` 


### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb://localhost:27017/comp3123_assignment` |
| JWT_SECRET | Secret key for JWT tokens | `your_super_secret_key_here` |
| PORT | Server port number | `5000` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API base URL | `http://localhost:5000/api/v1` |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Vincent**
- GitHub: [@VirtualVince](https://github.com/VirtualVince)
- Repository: [3123-Assignment-2](https://github.com/VirtualVince/3123-Assignment-2)

##  Acknowledgments

- COMP 3123 - Full Stack Development Course
- George Brown College
- MongoDB Documentation
- React Documentation
- Express.js Documentation

## Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/VirtualVince/3123-Assignment-2/issues)
- or send me an email through my contact from at [virtualvince.ca](https://virtualvince.ca/)

---

**Note:** This project was created for educational purposes as part of the COMP 3123 course assignment.