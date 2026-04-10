const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    created_at: String!
    updated_at: String!
  }

  type AuthPayload {
    token: String!
    user: User!
    message: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String!
    updated_at: String!
  }

  type MessageResponse {
    message: String!
    success: Boolean!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  input UpdateEmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: String
    department: String
    employee_photo: String
  }

  type Query {
    # User Queries
    login(input: LoginInput!): AuthPayload!
    
    # Employee Queries
    getAllEmployees: [Employee!]!
    getEmployeeById(eid: ID!): Employee!
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee!]!
  }

  type Mutation {
    # User Mutations
    signup(input: SignupInput!): AuthPayload!
    
    # Employee Mutations
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(eid: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(eid: ID!): MessageResponse!
  }
`;

module.exports = typeDefs;
