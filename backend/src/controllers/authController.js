// backend/src/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// In a real-world application, you would interact with your database.
// For this example, we'll use an in-memory array.
let users = []; // This is temporary and only for demonstration.

const SECRET_KEY = 'your_secret_key'; // In production, use a secure environment variable

// Signup Controller
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  
  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save the user
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  
  res.status(201).json({ message: 'User created successfully' });
};

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // Find the user
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  
  // Compare the password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  
  // Generate a JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};
