// test-firebase.js
const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

admin.auth().listUsers(1)
  .then(users => console.log('Success! Users:', users))
  .catch(error => console.error('Error:', error));