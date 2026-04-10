const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Employee = require('./models/Employee');

dotenv.config();

const users = [
  {
    username: 'admin',
    email: 'admin@company.com',
    password: 'admin123'
  },
  {
    username: 'manager',
    email: 'manager@company.com',
    password: 'manager123'
  },
  {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  }
];

const employees = [
  {
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice.johnson@company.com',
    gender: 'Female',
    designation: 'Software Engineer',
    salary: 75000,
    date_of_joining: new Date('2024-01-15'),
    department: 'Engineering',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob.smith@company.com',
    gender: 'Male',
    designation: 'Senior Software Engineer',
    salary: 95000,
    date_of_joining: new Date('2023-06-01'),
    department: 'Engineering',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'Carol',
    last_name: 'Williams',
    email: 'carol.williams@company.com',
    gender: 'Female',
    designation: 'HR Manager',
    salary: 85000,
    date_of_joining: new Date('2023-09-10'),
    department: 'HR',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'David',
    last_name: 'Brown',
    email: 'david.brown@company.com',
    gender: 'Male',
    designation: 'Project Manager',
    salary: 90000,
    date_of_joining: new Date('2023-03-20'),
    department: 'Management',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'Emma',
    last_name: 'Davis',
    email: 'emma.davis@company.com',
    gender: 'Female',
    designation: 'UX Designer',
    salary: 70000,
    date_of_joining: new Date('2024-02-01'),
    department: 'Design',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'Frank',
    last_name: 'Wilson',
    email: 'frank.wilson@company.com',
    gender: 'Male',
    designation: 'DevOps Engineer',
    salary: 88000,
    date_of_joining: new Date('2023-11-15'),
    department: 'Engineering',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'Grace',
    last_name: 'Taylor',
    email: 'grace.taylor@company.com',
    gender: 'Female',
    designation: 'Marketing Manager',
    salary: 82000,
    date_of_joining: new Date('2023-08-05'),
    department: 'Marketing',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  },
  {
    first_name: 'Henry',
    last_name: 'Anderson',
    email: 'henry.anderson@company.com',
    gender: 'Male',
    designation: 'Sales Executive',
    salary: 65000,
    date_of_joining: new Date('2024-01-10'),
    department: 'Sales',
    employee_photo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    console.log('Existing data cleared');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Insert employees
    const createdEmployees = await Employee.insertMany(employees);
    console.log(`${createdEmployees.length} employees created`);

    console.log('Database seeded successfully!');
    console.log('\nSample Login Credentials:');
    console.log('------------------------');
    console.log('Username: admin');
    console.log('Email: admin@company.com');
    console.log('Password: admin123');
    console.log('------------------------');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
