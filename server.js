const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://101384549-comp3133-assignment2.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // You can add authentication context here
    const token = req.headers.authorization || '';
    return { token };
  },
  formatError: (error) => {
    // Custom error formatting
    return {
      message: error.message,
      code: error.extensions.code,
      path: error.path
    };
  }
});

// Start server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});
