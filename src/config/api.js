// API Configuration for SmartyQuest
const API_CONFIG = {
  // AWS API Gateway endpoint - update this with your actual deployed endpoint
  // Format: https://your-api-id.execute-api.region.amazonaws.com/stage
  AWS_API_GATEWAY_URL: process.env.REACT_APP_SMARTYQUEST_API_URL || 'https://t2adewupae.execute-api.us-west-2.amazonaws.com',
  
  // Local development endpoint (when running serverless offline)
  LOCAL_API_URL: 'http://localhost:3001',
  
  // Fallback to local JSON file for development/testing
  LOCAL_JSON_URL: '/profile/samplequizdata.json',
  
  // API endpoints
  ENDPOINTS: {
    QUIZ: '/quiz'
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Whether to use local development mode
  USE_LOCAL_API: process.env.NODE_ENV === 'development'
};

export default API_CONFIG;
