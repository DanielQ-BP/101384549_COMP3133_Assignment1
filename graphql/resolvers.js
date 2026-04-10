const User = require('../models/User');
const Employee = require('../models/Employee');
const { generateToken } = require('../utils/jwt');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    // Login Query
    login: async (_, { input }) => {
      try {
        const { usernameOrEmail, password } = input;

        // Validation
        if (!usernameOrEmail || !password) {
          throw new UserInputError('Username/Email and password are required');
        }

        // Find user by username or email
        const user = await User.findOne({
          $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
          ]
        });

        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new AuthenticationError('Invalid credentials');
        }

        // Generate token
        const token = generateToken(user._id);

        return {
          token,
          user,
          message: 'Login successful'
        };
      } catch (error) {
        throw error;
      }
    },

    // Get all employees
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find().sort({ created_at: -1 });
        return employees;
      } catch (error) {
        throw new Error(`Error fetching employees: ${error.message}`);
      }
    },

    // Get employee by ID
    getEmployeeById: async (_, { eid }) => {
      try {
        const employee = await Employee.findById(eid);
        
        if (!employee) {
          throw new UserInputError('Employee not found');
        }

        return employee;
      } catch (error) {
        if (error.kind === 'ObjectId') {
          throw new UserInputError('Invalid employee ID format');
        }
        throw error;
      }
    },

    // Search employee by designation or department
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      try {
        if (!designation && !department) {
          throw new UserInputError('Please provide at least designation or department');
        }

        const query = {};
        
        if (designation && department) {
          query.$or = [
            { designation: { $regex: designation, $options: 'i' } },
            { department: { $regex: department, $options: 'i' } }
          ];
        } else if (designation) {
          query.designation = { $regex: designation, $options: 'i' };
        } else if (department) {
          query.department = { $regex: department, $options: 'i' };
        }

        const employees = await Employee.find(query);
        return employees;
      } catch (error) {
        throw new Error(`Error searching employees: ${error.message}`);
      }
    }
  },

  Mutation: {
    // Signup Mutation
    signup: async (_, { input }) => {
      try {
        const { username, email, password } = input;

        // Validation
        if (!username || !email || !password) {
          throw new UserInputError('All fields are required');
        }

        if (password.length < 6) {
          throw new UserInputError('Password must be at least 6 characters long');
        }

        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [{ username }, { email }]
        });

        if (existingUser) {
          if (existingUser.username === username) {
            throw new UserInputError('Username already exists');
          }
          if (existingUser.email === email) {
            throw new UserInputError('Email already exists');
          }
        }

        // Create new user
        const user = new User({
          username,
          email,
          password
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        return {
          token,
          user,
          message: 'User created successfully'
        };
      } catch (error) {
        throw error;
      }
    },

    // Add new employee
    addEmployee: async (_, { input }) => {
      try {
        const { 
          first_name, 
          last_name, 
          email, 
          gender, 
          designation, 
          salary, 
          date_of_joining, 
          department,
          employee_photo 
        } = input;

        // Validation
        if (salary < 1000) {
          throw new UserInputError('Salary must be at least 1000');
        }

        if (!['Male', 'Female', 'Other'].includes(gender)) {
          throw new UserInputError('Gender must be Male, Female, or Other');
        }

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
          throw new UserInputError('Employee with this email already exists');
        }

        // Create new employee
        const employee = new Employee({
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          department,
          employee_photo
        });

        await employee.save();
        return employee;
      } catch (error) {
        throw error;
      }
    },

    // Update employee
    updateEmployee: async (_, { eid, input }) => {
      try {
        // Validate salary if provided
        if (input.salary && input.salary < 1000) {
          throw new UserInputError('Salary must be at least 1000');
        }

        // Validate gender if provided
        if (input.gender && !['Male', 'Female', 'Other'].includes(input.gender)) {
          throw new UserInputError('Gender must be Male, Female, or Other');
        }

        // Check if email is being updated and if it already exists
        if (input.email) {
          const existingEmployee = await Employee.findOne({ 
            email: input.email,
            _id: { $ne: eid }
          });
          
          if (existingEmployee) {
            throw new UserInputError('Employee with this email already exists');
          }
        }

        const employee = await Employee.findByIdAndUpdate(
          eid,
          { ...input, updated_at: Date.now() },
          { new: true, runValidators: true }
        );

        if (!employee) {
          throw new UserInputError('Employee not found');
        }

        return employee;
      } catch (error) {
        if (error.kind === 'ObjectId') {
          throw new UserInputError('Invalid employee ID format');
        }
        throw error;
      }
    },

    // Delete employee
    deleteEmployee: async (_, { eid }) => {
      try {
        const employee = await Employee.findByIdAndDelete(eid);

        if (!employee) {
          throw new UserInputError('Employee not found');
        }

        return {
          message: 'Employee deleted successfully',
          success: true
        };
      } catch (error) {
        if (error.kind === 'ObjectId') {
          throw new UserInputError('Invalid employee ID format');
        }
        throw error;
      }
    }
  }
};

module.exports = resolvers;
