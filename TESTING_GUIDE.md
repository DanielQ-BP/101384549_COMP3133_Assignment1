# Testing Guide - Employee Management System

## Setup Instructions

### 1. Environment Setup
Before testing, ensure you have:
- MongoDB running (local or Atlas)
- Node.js installed
- Dependencies installed (`npm install`)
- `.env` file configured with correct values

### 2. Start the Server
```bash
npm run dev
```

Server should start at: `http://localhost:4000/graphql`

## Testing Methods

### Method 1: GraphiQL Interface
1. Open your browser
2. Navigate to `http://localhost:4000/graphql`
3. Use the GraphiQL interface to run queries

### Method 2: Postman
1. Import the Postman collection: `Employee_Management_System.postman_collection.json`
2. Set the request type to POST
3. URL: `http://localhost:4000/graphql`
4. Use GraphQL body type

---

## Test Cases

### 1. User Signup (Mutation) - 5 Points

**Test Case 1.1: Successful Signup**
```graphql
mutation {
  signup(input: {
    username: "testuser1"
    email: "testuser1@example.com"
    password: "password123"
  }) {
    token
    user {
      _id
      username
      email
      created_at
    }
    message
  }
}
```

**Expected Result:**
- Status: Success
- Response contains token, user details, and success message
- Password should be hashed in database

**Test Case 1.2: Duplicate Username**
```graphql
mutation {
  signup(input: {
    username: "testuser1"
    email: "different@example.com"
    password: "password123"
  }) {
    token
    user {
      username
    }
    message
  }
}
```

**Expected Result:**
- Error: "Username already exists"

**Test Case 1.3: Invalid Email Format**
```graphql
mutation {
  signup(input: {
    username: "testuser2"
    email: "invalidemail"
    password: "password123"
  }) {
    token
    user {
      username
    }
    message
  }
}
```

**Expected Result:**
- Error: Validation error for email format

---

### 2. User Login (Query) - 5 Points

**Test Case 2.1: Login with Username**
```graphql
query {
  login(input: {
    usernameOrEmail: "testuser1"
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

**Expected Result:**
- Status: Success
- Returns JWT token and user details

**Test Case 2.2: Login with Email**
```graphql
query {
  login(input: {
    usernameOrEmail: "testuser1@example.com"
    password: "password123"
  }) {
    token
    user {
      username
      email
    }
    message
  }
}
```

**Expected Result:**
- Status: Success
- Returns JWT token and user details

**Test Case 2.3: Invalid Credentials**
```graphql
query {
  login(input: {
    usernameOrEmail: "testuser1"
    password: "wrongpassword"
  }) {
    token
    message
  }
}
```

**Expected Result:**
- Error: "Invalid credentials"

---

### 3. Get All Employees (Query) - 10 Points

**Test Case 3.1: Get All Employees**
```graphql
query {
  getAllEmployees {
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
    created_at
  }
}
```

**Expected Result:**
- Returns array of all employees
- Empty array if no employees exist
- Sorted by creation date (newest first)

---

### 4. Add New Employee (Mutation) - 10 Points

**Test Case 4.1: Add Employee Successfully**
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
    employee_photo: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
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

**Expected Result:**
- Employee created successfully
- All fields returned correctly
- Image URL stored in employee_photo field

**Test Case 4.2: Salary Validation (< 1000)**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Jane"
    last_name: "Smith"
    email: "jane.smith@company.com"
    gender: "Female"
    designation: "Intern"
    salary: 500
    date_of_joining: "2024-02-01"
    department: "HR"
  }) {
    _id
  }
}
```

**Expected Result:**
- Error: "Salary must be at least 1000"

**Test Case 4.3: Invalid Gender**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Bob"
    last_name: "Johnson"
    email: "bob@company.com"
    gender: "Unknown"
    designation: "Manager"
    salary: 90000
    date_of_joining: "2024-01-01"
    department: "Sales"
  }) {
    _id
  }
}
```

**Expected Result:**
- Error: "Gender must be Male, Female, or Other"

**Test Case 4.4: Duplicate Email**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Another"
    last_name: "Person"
    email: "john.doe@company.com"
    gender: "Male"
    designation: "Developer"
    salary: 70000
    date_of_joining: "2024-03-01"
    department: "IT"
  }) {
    _id
  }
}
```

**Expected Result:**
- Error: "Employee with this email already exists"

---

### 5. Search Employee by ID (Query) - 10 Points

**Test Case 5.1: Get Employee by Valid ID**
```graphql
query {
  getEmployeeById(eid: "65a1b2c3d4e5f6g7h8i9j0k1") {
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

**Note:** Replace with actual employee ID from database

**Expected Result:**
- Returns employee details for valid ID

**Test Case 5.2: Invalid Employee ID Format**
```graphql
query {
  getEmployeeById(eid: "invalid-id") {
    _id
    first_name
  }
}
```

**Expected Result:**
- Error: "Invalid employee ID format"

**Test Case 5.3: Non-existent Employee ID**
```graphql
query {
  getEmployeeById(eid: "65a1b2c3d4e5f6g7h8i9j0k9") {
    _id
  }
}
```

**Expected Result:**
- Error: "Employee not found"

---

### 6. Update Employee (Mutation) - 10 Points

**Test Case 6.1: Update Employee Successfully**
```graphql
mutation {
  updateEmployee(
    eid: "65a1b2c3d4e5f6g7h8i9j0k1"
    input: {
      salary: 85000
      designation: "Senior Software Engineer"
    }
  ) {
    _id
    first_name
    last_name
    designation
    salary
    updated_at
  }
}
```

**Note:** Replace with actual employee ID

**Expected Result:**
- Employee updated successfully
- Only specified fields are updated
- updated_at timestamp is refreshed

**Test Case 6.2: Update with Invalid Salary**
```graphql
mutation {
  updateEmployee(
    eid: "65a1b2c3d4e5f6g7h8i9j0k1"
    input: {
      salary: 500
    }
  ) {
    _id
  }
}
```

**Expected Result:**
- Error: "Salary must be at least 1000"

**Test Case 6.3: Update Email to Existing Email**
```graphql
mutation {
  updateEmployee(
    eid: "65a1b2c3d4e5f6g7h8i9j0k1"
    input: {
      email: "existing@company.com"
    }
  ) {
    _id
  }
}
```

**Expected Result:**
- Error: "Employee with this email already exists"

---

### 7. Delete Employee (Mutation) - 5 Points

**Test Case 7.1: Delete Employee Successfully**
```graphql
mutation {
  deleteEmployee(eid: "65a1b2c3d4e5f6g7h8i9j0k1") {
    message
    success
  }
}
```

**Note:** Replace with actual employee ID

**Expected Result:**
- message: "Employee deleted successfully"
- success: true

**Test Case 7.2: Delete Non-existent Employee**
```graphql
mutation {
  deleteEmployee(eid: "65a1b2c3d4e5f6g7h8i9j0k9") {
    message
    success
  }
}
```

**Expected Result:**
- Error: "Employee not found"

---

### 8. Search Employee by Designation or Department (Query) - 5 Points

**Test Case 8.1: Search by Designation**
```graphql
query {
  searchEmployeeByDesignationOrDepartment(designation: "Software Engineer") {
    _id
    first_name
    last_name
    email
    designation
    department
    salary
  }
}
```

**Expected Result:**
- Returns all employees with matching designation
- Case-insensitive search

**Test Case 8.2: Search by Department**
```graphql
query {
  searchEmployeeByDesignationOrDepartment(department: "Engineering") {
    _id
    first_name
    last_name
    designation
    department
  }
}
```

**Expected Result:**
- Returns all employees in matching department
- Case-insensitive search

**Test Case 8.3: Search by Both**
```graphql
query {
  searchEmployeeByDesignationOrDepartment(
    designation: "Manager"
    department: "Sales"
  ) {
    _id
    first_name
    last_name
    designation
    department
  }
}
```

**Expected Result:**
- Returns employees matching either designation OR department

**Test Case 8.4: Search without Parameters**
```graphql
query {
  searchEmployeeByDesignationOrDepartment {
    _id
  }
}
```

**Expected Result:**
- Error: "Please provide at least designation or department"

---

## MongoDB Verification

After running tests, verify data in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Use the database
use comp3133_StudentID_Assigment1

# Check users collection
db.users.find().pretty()

# Check employees collection
db.employees.find().pretty()

# Verify password is hashed
db.users.findOne({username: "testuser1"})

# Count documents
db.users.countDocuments()
db.employees.countDocuments()
```

---

## Screenshot Checklist

Capture screenshots for:
1. ✅ Signup mutation - success
2. ✅ Signup mutation - duplicate error
3. ✅ Login query - success
4. ✅ Login query - invalid credentials
5. ✅ Get all employees - with data
6. ✅ Add employee - success
7. ✅ Add employee - validation error (salary < 1000)
8. ✅ Get employee by ID - success
9. ✅ Get employee by ID - not found
10. ✅ Update employee - success
11. ✅ Update employee - validation error
12. ✅ Delete employee - success
13. ✅ Search by designation - success
14. ✅ Search by department - success
15. ✅ MongoDB console showing users collection
16. ✅ MongoDB console showing employees collection

---

## Common Issues & Solutions

**Issue 1: Connection Error**
- Solution: Ensure MongoDB is running
- Check MONGODB_URI in .env file

**Issue 2: Validation Errors**
- Solution: Check input data types and required fields
- Ensure all required fields are provided

**Issue 3: Token Issues**
- Solution: Generate new token by logging in
- Check JWT_SECRET is set in .env

**Issue 4: Cloudinary Upload**
- Solution: Verify Cloudinary credentials in .env
- Use valid image URLs for testing

---

## Sample Test Data

### Sample Users
```javascript
{
  username: "admin",
  email: "admin@company.com",
  password: "admin123"
}

{
  username: "manager",
  email: "manager@company.com",
  password: "manager123"
}
```

### Sample Employees
```javascript
{
  first_name: "Alice",
  last_name: "Johnson",
  email: "alice.johnson@company.com",
  gender: "Female",
  designation: "Software Engineer",
  salary: 75000,
  date_of_joining: "2024-01-15",
  department: "Engineering"
}

{
  first_name: "Bob",
  last_name: "Smith",
  email: "bob.smith@company.com",
  gender: "Male",
  designation: "Project Manager",
  salary: 95000,
  date_of_joining: "2023-06-01",
  department: "Management"
}

{
  first_name: "Carol",
  last_name: "Williams",
  email: "carol.williams@company.com",
  gender: "Female",
  designation: "HR Manager",
  salary: 85000,
  date_of_joining: "2023-09-10",
  department: "HR"
}
```
