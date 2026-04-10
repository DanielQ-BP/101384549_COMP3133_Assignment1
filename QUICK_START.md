# Quick Start Guide

Get your Employee Management System up and running in 5 minutes!

## Prerequisites
- Node.js v14+ installed
- MongoDB installed (or MongoDB Atlas account)
- Cloudinary account (optional for image uploads)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd employee-management-system

# Install dependencies
npm install
```

## Step 2: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your details
# Required: MONGODB_URI
# Optional: Cloudinary credentials, JWT_SECRET
```

**Minimum .env configuration:**
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/comp3133_StudentID_Assigment1
JWT_SECRET=any_random_string_here
```

## Step 3: Start MongoDB

### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Or on macOS with Homebrew:
brew services start mongodb-community
```

### Option B: MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Step 4: Seed Database (Optional)

```bash
# Add sample data for testing
node seed.js
```

This creates:
- 3 sample users
- 8 sample employees

**Sample Login:**
- Username: `admin`
- Password: `admin123`

## Step 5: Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 Server running on port 4000
📊 GraphQL endpoint: http://localhost:4000/graphql
```

## Step 6: Test the API

### Method 1: GraphiQL (Recommended for beginners)
1. Open browser: http://localhost:4000/graphql
2. Try this query:
```graphql
query {
  getAllEmployees {
    first_name
    last_name
    email
  }
}
```

### Method 2: Postman
1. Import `Employee_Management_System.postman_collection.json`
2. Run the "Get All Employees" request

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Seed database
node seed.js

# Test API (if you have a test script)
npm test
```

## Testing Workflow

1. **Create a user:**
```graphql
mutation {
  signup(input: {
    username: "myuser"
    email: "my@email.com"
    password: "password123"
  }) {
    token
    message
  }
}
```

2. **Login:**
```graphql
query {
  login(input: {
    usernameOrEmail: "myuser"
    password: "password123"
  }) {
    token
    user {
      username
      email
    }
  }
}
```

3. **Add an employee:**
```graphql
mutation {
  addEmployee(input: {
    first_name: "John"
    last_name: "Doe"
    email: "john@company.com"
    gender: "Male"
    designation: "Developer"
    salary: 70000
    date_of_joining: "2024-01-15"
    department: "IT"
  }) {
    _id
    first_name
    last_name
  }
}
```

4. **Get all employees:**
```graphql
query {
  getAllEmployees {
    first_name
    last_name
    designation
    department
  }
}
```

## Troubleshooting

### Error: "Cannot connect to MongoDB"
- **Solution:** Make sure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, verify IP whitelist

### Error: "Module not found"
- **Solution:** Run `npm install`

### Error: "Port 4000 already in use"
- **Solution:** Change PORT in .env or stop other service using port 4000

### Error: "Invalid credentials"
- **Solution:** Verify username/password
- Check if user exists in database
- Run seed script to create test users

### Cloudinary errors
- **Solution:** Verify credentials in .env
- Can skip image upload for basic testing

## Next Steps

1. ✅ Server running? Great!
2. ✅ Can query employees? Awesome!
3. ✅ Try all mutations and queries
4. ✅ Check TESTING_GUIDE.md for comprehensive tests
5. ✅ Review README.md for full documentation

## Quick Reference

- **GraphiQL Interface:** http://localhost:4000/graphql
- **Database Name:** comp3133_StudentID_Assigment1
- **Default Port:** 4000

## Need Help?

1. Check README.md for full documentation
2. Review TESTING_GUIDE.md for examples
3. See SUBMISSION_CHECKLIST.md for requirements

---

**You're ready to go! 🚀**

Start testing your API and building awesome features!
