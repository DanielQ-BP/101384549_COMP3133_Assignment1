# GraphQL Query & Mutation Examples

Complete reference for all API operations in the Employee Management System.

---

## 🔐 Authentication Operations

### 1. User Signup
Create a new user account.

```graphql
mutation Signup {
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
      created_at
      updated_at
    }
    message
  }
}
```

**With Variables:**
```graphql
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
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

**Variables:**
```json
{
  "input": {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
}
```

---

### 2. User Login
Authenticate and get JWT token.

**Login with Username:**
```graphql
query Login {
  login(input: {
    usernameOrEmail: "johndoe"
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

**Login with Email:**
```graphql
query Login {
  login(input: {
    usernameOrEmail: "john@example.com"
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

**With Variables:**
```graphql
query Login($input: LoginInput!) {
  login(input: $input) {
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

**Variables:**
```json
{
  "input": {
    "usernameOrEmail": "johndoe",
    "password": "password123"
  }
}
```

---

## 👥 Employee Query Operations

### 3. Get All Employees
Retrieve all employees from the database.

```graphql
query GetAllEmployees {
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
    updated_at
  }
}
```

**Selective Fields:**
```graphql
query GetAllEmployees {
  getAllEmployees {
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

---

### 4. Get Employee by ID
Retrieve a specific employee's details.

```graphql
query GetEmployeeById {
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
    created_at
    updated_at
  }
}
```

**With Variables:**
```graphql
query GetEmployeeById($eid: ID!) {
  getEmployeeById(eid: $eid) {
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

**Variables:**
```json
{
  "eid": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

---

### 5. Search Employee by Designation or Department
Search for employees using designation or department filters.

**Search by Designation:**
```graphql
query SearchEmployees {
  searchEmployeeByDesignationOrDepartment(
    designation: "Software Engineer"
  ) {
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

**Search by Department:**
```graphql
query SearchEmployees {
  searchEmployeeByDesignationOrDepartment(
    department: "Engineering"
  ) {
    _id
    first_name
    last_name
    designation
    department
  }
}
```

**Search by Both (OR condition):**
```graphql
query SearchEmployees {
  searchEmployeeByDesignationOrDepartment(
    designation: "Manager"
    department: "Sales"
  ) {
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

**With Variables:**
```graphql
query SearchEmployees($designation: String, $department: String) {
  searchEmployeeByDesignationOrDepartment(
    designation: $designation
    department: $department
  ) {
    _id
    first_name
    last_name
    designation
    department
  }
}
```

**Variables (Option 1 - Designation only):**
```json
{
  "designation": "Software Engineer"
}
```

**Variables (Option 2 - Department only):**
```json
{
  "department": "Engineering"
}
```

**Variables (Option 3 - Both):**
```json
{
  "designation": "Manager",
  "department": "HR"
}
```

---

## ✏️ Employee Mutation Operations

### 6. Add New Employee
Create a new employee record.

```graphql
mutation AddEmployee {
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

**With Variables:**
```graphql
mutation AddEmployee($input: EmployeeInput!) {
  addEmployee(input: $input) {
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

**Variables:**
```json
{
  "input": {
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@company.com",
    "gender": "Female",
    "designation": "Senior Developer",
    "salary": 95000,
    "date_of_joining": "2024-02-01",
    "department": "Engineering",
    "employee_photo": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  }
}
```

**Without Photo:**
```json
{
  "input": {
    "first_name": "Bob",
    "last_name": "Johnson",
    "email": "bob@company.com",
    "gender": "Male",
    "designation": "Product Manager",
    "salary": 90000,
    "date_of_joining": "2024-03-01",
    "department": "Product"
  }
}
```

---

### 7. Update Employee
Update an existing employee's information.

```graphql
mutation UpdateEmployee {
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
    email
    designation
    salary
    department
    updated_at
  }
}
```

**With Variables:**
```graphql
mutation UpdateEmployee($eid: ID!, $input: UpdateEmployeeInput!) {
  updateEmployee(eid: $eid, input: $input) {
    _id
    first_name
    last_name
    designation
    salary
    updated_at
  }
}
```

**Variables (Update Salary & Designation):**
```json
{
  "eid": "65a1b2c3d4e5f6g7h8i9j0k1",
  "input": {
    "salary": 85000,
    "designation": "Senior Software Engineer"
  }
}
```

**Variables (Update Department):**
```json
{
  "eid": "65a1b2c3d4e5f6g7h8i9j0k1",
  "input": {
    "department": "Product Engineering"
  }
}
```

**Variables (Update Multiple Fields):**
```json
{
  "eid": "65a1b2c3d4e5f6g7h8i9j0k1",
  "input": {
    "first_name": "Jonathan",
    "designation": "Lead Engineer",
    "salary": 105000,
    "department": "Engineering Leadership"
  }
}
```

---

### 8. Delete Employee
Remove an employee from the system.

```graphql
mutation DeleteEmployee {
  deleteEmployee(eid: "65a1b2c3d4e5f6g7h8i9j0k1") {
    message
    success
  }
}
```

**With Variables:**
```graphql
mutation DeleteEmployee($eid: ID!) {
  deleteEmployee(eid: $eid) {
    message
    success
  }
}
```

**Variables:**
```json
{
  "eid": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

---

## 🔄 Complete Workflow Example

### Scenario: Complete CRUD Operations

**Step 1: Signup**
```graphql
mutation {
  signup(input: {
    username: "hrmanager"
    email: "hr@company.com"
    password: "secure123"
  }) {
    token
    message
  }
}
```

**Step 2: Login**
```graphql
query {
  login(input: {
    usernameOrEmail: "hrmanager"
    password: "secure123"
  }) {
    token
    user {
      username
    }
  }
}
```

**Step 3: Add Employee**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Alice"
    last_name: "Williams"
    email: "alice@company.com"
    gender: "Female"
    designation: "UX Designer"
    salary: 72000
    date_of_joining: "2024-02-15"
    department: "Design"
  }) {
    _id
    first_name
    last_name
  }
}
```
*Save the returned _id for next steps*

**Step 4: Get Employee**
```graphql
query {
  getEmployeeById(eid: "EMPLOYEE_ID_FROM_STEP_3") {
    first_name
    last_name
    designation
    salary
  }
}
```

**Step 5: Update Employee**
```graphql
mutation {
  updateEmployee(
    eid: "EMPLOYEE_ID_FROM_STEP_3"
    input: {
      designation: "Senior UX Designer"
      salary: 82000
    }
  ) {
    designation
    salary
  }
}
```

**Step 6: Search Employees**
```graphql
query {
  searchEmployeeByDesignationOrDepartment(department: "Design") {
    first_name
    last_name
    designation
  }
}
```

**Step 7: Get All Employees**
```graphql
query {
  getAllEmployees {
    first_name
    last_name
    department
  }
}
```

**Step 8: Delete Employee (if needed)**
```graphql
mutation {
  deleteEmployee(eid: "EMPLOYEE_ID_FROM_STEP_3") {
    message
    success
  }
}
```

---

## 🧪 Testing Scenarios

### Test Case: Validation Errors

**1. Invalid Salary:**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Test"
    last_name: "User"
    email: "test@company.com"
    gender: "Male"
    designation: "Intern"
    salary: 500
    date_of_joining: "2024-01-01"
    department: "IT"
  }) {
    _id
  }
}
```
*Expected: Error - Salary must be at least 1000*

**2. Invalid Gender:**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Test"
    last_name: "User"
    email: "test@company.com"
    gender: "Unknown"
    designation: "Developer"
    salary: 70000
    date_of_joining: "2024-01-01"
    department: "IT"
  }) {
    _id
  }
}
```
*Expected: Error - Gender must be Male, Female, or Other*

**3. Duplicate Email:**
```graphql
mutation {
  addEmployee(input: {
    first_name: "Another"
    last_name: "Person"
    email: "alice@company.com"
    gender: "Female"
    designation: "Developer"
    salary: 70000
    date_of_joining: "2024-01-01"
    department: "IT"
  }) {
    _id
  }
}
```
*Expected: Error - Employee with this email already exists*

---

## 📝 Notes

- Replace `EMPLOYEE_ID_FROM_STEP_3` with actual employee ID
- All dates should be in ISO format: `YYYY-MM-DD`
- Salary must be >= 1000
- Gender must be: "Male", "Female", or "Other"
- Email must be unique
- employee_photo is optional

---

## 🔗 Quick Links

- [GraphiQL Interface](http://localhost:4000/graphql)
- [Testing Guide](./TESTING_GUIDE.md)
- [README](./README.md)
- [Quick Start](./QUICK_START.md)
