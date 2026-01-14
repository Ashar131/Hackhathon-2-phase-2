// Simple test to check if the API is accessible
const axios = require('axios');

async function testConnection() {
  try {
    console.log('Testing connection to backend...');
    
    // Test the backend health endpoint
    const healthResponse = await axios.get('http://localhost:8000/health');
    console.log('✓ Backend health check passed:', healthResponse.data);
    
    // Test the API base URL that the frontend uses
    const apiResponse = await axios.get('http://localhost:8000/api');
    console.log('✓ API root endpoint accessible:', apiResponse.status);
    
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testConnection();