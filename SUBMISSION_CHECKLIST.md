# COMP3133 Assignment 1 - Submission Checklist

## Student Information
- **Name:** [Your Full Name]
- **Student ID:** [Your Student ID]
- **Course:** COMP3133 - Full Stack Development
- **Assignment:** Assignment 1 - Employee Management System

---

## ✅ Submission Checklist

### 1. Documentation (DOCX File)
Create a single Word document with all screenshots labeled properly:

- [ ] **Cover Page**
  - Student name, ID, course code
  - Assignment title
  - Submission date

- [ ] **MongoDB Console Screenshots**
  - Database overview showing collections
  - Users collection with sample data
  - Employees collection with sample data
  - Screenshot showing hashed passwords

- [ ] **API Testing Screenshots**
  Each screenshot should include:
  - Request query/mutation
  - Variables (if any)
  - Response data
  - Timestamp
  
  Required screenshots:
  - [ ] Signup mutation - success case
  - [ ] Signup mutation - error case (duplicate username/email)
  - [ ] Login query - success case
  - [ ] Login query - error case (invalid credentials)
  - [ ] Get all employees query
  - [ ] Add employee mutation - success
  - [ ] Add employee mutation - validation error
  - [ ] Get employee by ID - success
  - [ ] Get employee by ID - not found error
  - [ ] Update employee mutation - success
  - [ ] Update employee mutation - validation error
  - [ ] Delete employee mutation - success
  - [ ] Search by designation/department query
  - [ ] Error handling examples

### 2. Postman Collection
- [ ] Export Postman collection as JSON
- [ ] Include all 8 API endpoints
- [ ] Add example requests with variables
- [ ] Test all requests before submission
- [ ] File name: `Employee_Management_System.postman_collection.json`

### 3. Project ZIP File
- [ ] Remove `node_modules` folder
- [ ] Include all source code files
- [ ] Include `.env.example` file (NOT .env with secrets)
- [ ] Include README.md
- [ ] Include package.json
- [ ] Include all model files
- [ ] Include GraphQL schema and resolvers
- [ ] File name: `COMP3133_[StudentID]_Assignment1.zip`

### 4. GitHub Repository
- [ ] Create repository named: `COMP3133_[StudentID]_Assignment1`
- [ ] Push all code to repository
- [ ] Include comprehensive README.md with:
  - Project description
  - Installation instructions
  - API documentation
  - Database schema
  - Sample credentials
- [ ] Add .gitignore file
- [ ] Commit messages are clear and descriptive
- [ ] Repository is public or accessible to instructor
- [ ] Include link in submission document

### 5. Sample User Details
Include in your documentation:
```
Username: testuser
Email: test@example.com
Password: password123

OR use the seeded data:
Username: admin
Email: admin@company.com
Password: admin123
```

### 6. Comments/Notes Section
- [ ] Add setup instructions
- [ ] List any external dependencies
- [ ] Note Cloudinary setup requirements
- [ ] Mention any assumptions made
- [ ] List any bonus features implemented
- [ ] Known issues (if any)

### 7. Hosting (Optional - 10 Bonus Points)
If hosted, provide:
- [ ] Live URL of deployed application
- [ ] Platform used (Vercel, Heroku, Render, Railway, etc.)
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection configured
- [ ] Test the hosted version before submission

---

## 📊 Evaluation Breakdown (Total: 100 Points)

### GraphQL Object Creation (10 Points)
- [ ] User schema/model properly defined
- [ ] Employee schema/model properly defined
- [ ] MongoDB schemas include all required fields
- [ ] Proper constraints and validations
- [ ] Timestamps (created_at, updated_at) implemented

### GraphQL APIs (60 Points)
- [ ] Signup mutation (5 points)
- [ ] Login query (5 points)
- [ ] Get all employees query (10 points)
- [ ] Add employee mutation with Cloudinary (10 points)
- [ ] Get employee by ID query (10 points)
- [ ] Update employee mutation (10 points)
- [ ] Delete employee mutation (5 points)
- [ ] Search by designation/department query (5 points)

### Screenshots & Validation (10 Points)
- [ ] All API screenshots included
- [ ] Input validation implemented
- [ ] Error messages sent to client
- [ ] Success messages included
- [ ] Screenshots properly labeled

### GitHub Repository (10 Points)
- [ ] Repository properly named
- [ ] All code committed
- [ ] Comprehensive README.md
- [ ] Clear commit history
- [ ] .gitignore properly configured

### Testing Documentation (10 Points)
- [ ] Postman collection exported
- [ ] GraphiQL or Postman screenshots
- [ ] Test cases documented
- [ ] MongoDB console verification

---

## 🔍 Pre-Submission Verification

### Code Quality
- [ ] No syntax errors
- [ ] Code is properly formatted
- [ ] Comments added where necessary
- [ ] No hardcoded sensitive data
- [ ] Environment variables used correctly

### Functionality
- [ ] All 8 API operations work correctly
- [ ] Validation works as expected
- [ ] Error handling implemented
- [ ] Database operations successful
- [ ] Passwords are hashed
- [ ] Unique constraints enforced

### Documentation
- [ ] README is comprehensive
- [ ] API documentation is clear
- [ ] Setup instructions are detailed
- [ ] Sample data provided
- [ ] All screenshots are clear and labeled

### Testing
- [ ] All queries tested
- [ ] All mutations tested
- [ ] Error cases tested
- [ ] Validation tested
- [ ] Edge cases considered

---

## 📁 File Structure Verification

Your project should have this structure:
```
COMP3133_[StudentID]_Assignment1/
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
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── server.js
├── seed.js
└── TESTING_GUIDE.md
```

---

## 📝 Additional Notes

### Cloudinary Setup
1. Create free account at https://cloudinary.com/
2. Get your Cloud Name, API Key, and API Secret
3. Add credentials to .env file
4. Test image upload functionality

### MongoDB Setup
Option 1: Local MongoDB
- Install MongoDB locally
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/comp3133_StudentID_Assigment1`

Option 2: MongoDB Atlas
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Whitelist your IP address
- Get connection string
- Replace in .env file

### JWT Implementation
- JWT secret should be strong and random
- Token expiry set to 7 days by default
- Can be modified in .env file

---

## 🚀 Final Steps

1. [ ] Test everything one final time
2. [ ] Create the Word document with screenshots
3. [ ] Export Postman collection
4. [ ] Create project ZIP (without node_modules)
5. [ ] Verify GitHub repository
6. [ ] Double-check all links work
7. [ ] Review submission checklist
8. [ ] Submit on time!

---

## 📧 Submission Files

Your final submission should include:

1. **[StudentID]_Assignment1_Documentation.docx**
   - All screenshots
   - GitHub link
   - Hosted URL (if applicable)
   - Sample credentials

2. **Employee_Management_System.postman_collection.json**
   - All API endpoints
   - Example requests

3. **COMP3133_[StudentID]_Assignment1.zip**
   - Complete source code
   - No node_modules
   - README.md included

---

## ⚠️ Common Mistakes to Avoid

- [ ] Don't include node_modules in ZIP
- [ ] Don't commit .env file to GitHub
- [ ] Don't use weak passwords in examples
- [ ] Don't forget to test hosted version
- [ ] Don't submit unclear screenshots
- [ ] Don't skip error handling
- [ ] Don't use invalid email formats in tests
- [ ] Don't forget to hash passwords

---

## 📞 Support

If you encounter issues:
1. Check the TESTING_GUIDE.md
2. Review the README.md
3. Verify environment variables
4. Check MongoDB connection
5. Review error messages carefully

---

**Good Luck! 🎓**

Remember: Quality over quantity. Make sure everything works correctly before submission.
