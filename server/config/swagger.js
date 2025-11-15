const swaggerUi = require('swagger-ui-express');

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'DevConnect API',
    version: '1.0.0',
    description: 'API documentation for DevConnect - A social platform for developers'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development Server'
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health Check',
        tags: ['Health'],
        responses: {
          200: {
            description: 'Server is running'
          }
        }
      }
    },
    '/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  username: { type: 'string' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Validation error' }
        }
      }
    },
    '/auth': {
      post: {
        summary: 'Login user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' }
        }
      }
    },
    '/profile': {
      get: {
        summary: 'Get user profile',
        tags: ['Profile'],
        responses: {
          200: { description: 'Profile retrieved successfully' },
          404: { description: 'Profile not found' }
        }
      },
      put: {
        summary: 'Update user profile',
        tags: ['Profile'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bio: { type: 'string' },
                  skills: { type: 'array' },
                  location: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Profile updated successfully' },
          400: { description: 'Validation error' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

module.exports = { swaggerUi, swaggerDoc };
