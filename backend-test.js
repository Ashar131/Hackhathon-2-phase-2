const http = require('http');

// Test if the server is responding to basic requests
const options = {
  hostname: '127.0.0.1',
  port: 8000,
  path: '/health',
  method: 'GET',
};

console.log('Testing backend connection...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);

  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });

  res.on('end', () => {
    console.log('Health check completed.');

    // Now test signup endpoint
    console.log('\nTesting signup endpoint...');
    const signupOptions = {
      hostname: '127.0.0.1',
      port: 8000,
      path: '/api/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const signupReq = http.request(signupOptions, (signupRes) => {
      console.log(`Signup Status: ${signupRes.statusCode}`);

      signupRes.on('data', (chunk) => {
        console.log(`Signup Response: ${chunk}`);
      });
    });

    const testData = JSON.stringify({
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });

    signupReq.write(testData);
    signupReq.end();
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();