# Employee Management System - GraphQL API

A full-stack Employee Management System built with Node.js, Express, GraphQL, and MongoDB.

## 🚀 Features

- User authentication (Signup & Login)
- Complete Employee CRUD operations
- Search employees by designation or department
- Image upload support via Cloudinary
- Input validation and error handling
- JWT authentication (optional)
- GraphQL API with Apollo Server

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd employee-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/comp3133_StudentID_Assigment1
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start MongoDB:
```bash
# If using local MongoDB
mongod
```

5. Run the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:4000/graphql`

## 📚 API Documentation

### Mutations

#### 1. Signup
Create a new user account.
```graphql
mutation {
  signup(input: {
    username: "johndoe"
    email: "john@example.com"
    password: "password123"
  }) {
    token
    user {
      _id
      username
      email
    }
    message
  }
}
```

#### 2. Add Employee
Create a new employee record.
```graphql
mutation {
  addEmployee(input: {
    first_name: "John"
    last_name: "Doe"
    email: "john.doe@company.com"
    gender: "Male"
    designation: "Software Engineer"
    salary: 75000
    date_of_joining: "2024-01-15"
    department: "Engineering"
    employee_photo: "https://cloudinary.com/image.jpg"
  }) {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
  }
}
```

#### 3. Update Employee
Update employee details by ID.
```graphql
mutation {
  updateEmployee(
    eid: "employee_id_here"
    input: {
      salary: 80000
      designation: "Senior Software Engineer"
    }
  ) {
    _id
    first_name
    last_name
    salary
    designation
  }
}
```

#### 4. Delete Employee
Delete an employee by ID.
```graphql
mutation {
  deleteEmployee(eid: "employee_id_here") {
    message
    success
  }
}
```

### Queries

#### 1. Login
Authenticate a user.
```graphql
query {
  login(input: {
    usernameOrEmail: "johndoe"
    password: "password123"
  }) {
    token
    user {
      _id
      username
      email
    }
    message
  }
}
```

#### 2. Get All Employees
Retrieve all employees.
```graphql
query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
    date_of_joining
  }
}
```

#### 3. Get Employee by ID
Retrieve a specific employee by ID.
```graphql
query {
  getEmployeeById(eid: "employee_id_here") {
    _id
    first_name
    last_name
    email
    gender
    designation
    salary
    date_of_joining
    department
    employee_photo
  }
}
```

#### 4. Search Employee by Designation or Department
Search employees by designation or department.
```graphql
query {
  searchEmployeeByDesignationOrDepartment(
    designation: "Software Engineer"
    department: "Engineering"
  ) {
    _id
    first_name
    last_name
    email
    designation
    department
  }
}
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  created_at: Date,
  updated_at: Date
}
```

### Employees Collection
```javascript
{
  _id: ObjectId,
  first_name: String,
  last_name: String,
  email: String (unique),
  gender: String (Male/Female/Other),
  designation: String,
  salary: Number (>= 1000),
  date_of_joining: Date,
  department: String,
  employee_photo: String,
  created_at: Date,
  updated_at: Date
}
```

## 🧪 Testing

### Using GraphiQL
1. Navigate to `http://localhost:4000/graphql`
2. Use the GraphiQL interface to test queries and mutations

### Using Postman
1. Create a new POST request to `http://localhost:4000/graphql`
2. Set header: `Content-Type: application/json`
3. In the body (raw JSON), structure your GraphQL query:
```json
{
  "query": "mutation { signup(input: { username: \"test\", email: \"test@example.com\", password: \"password123\" }) { token user { username email } message } }"
}
```

## 📝 Sample User Credentials

For testing purposes:
```
Username: testuser
Email: test@example.com
Password: password123
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- MongoDB injection protection
- Error handling and validation

## 📦 Project Structure

```
employee-management-system/
├── config/
│   ├── db.js
│   └── cloudinary.js
├── models/
│   ├── User.js
│   └── Employee.js
├── graphql/
│   ├── typeDefs.js
│   └── resolvers.js
├── utils/
│   └── jwt.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🚢 Deployment

The application can be deployed to:
- Heroku
- Vercel
- Render
- AWS
- Docker

## 👨‍💻 Author

**Student ID:** [Your Student ID]
**Name:** [Your Name]
**Course:** COMP3133

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- GraphQL Documentation
- Apollo Server Documentation
- MongoDB Documentation
- Express.js Documentation
