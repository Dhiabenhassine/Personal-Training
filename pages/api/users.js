import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db('PersonalTraining');
    const collection = db.collection('users');

    switch (req.method) {
      case 'GET':
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
        break;

      case 'POST': {
        if (req.query.action === 'login') {
          // Login user : POST /api/users?action=login
          const { email, password } = req.body;

          // Validate input
          if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
          }

          // Find user by email
          const user = await collection.findOne({ email: email.toLowerCase().trim() });
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }

          // Compare passwords
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
          }

          // Remove password from the response
          const userResponse = { ...user };
          delete userResponse.password;

          // Send success response
          res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userResponse,
          });
        } else {
          // Register new user
          const { name, email, password } = req.body;

          // Validate input
          if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
          }

          // Validate password length
          if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
          }

          // Check if user already exists
          const existingUser = await collection.findOne({ email: email.toLowerCase().trim() });
          if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
          }

          // Hash password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // Create new user object
          const newUser = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
          };

          // Insert new user into the database
          const result = await collection.insertOne(newUser);

          // Remove password from the response
          const userResponse = { ...newUser };
          delete userResponse.password;

          // Send success response
          res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userResponse,
          });
        }
        break;
      }

      case 'PUT': {
        // Update a user by ID
        const { id, ...updateData } = req.body;
      
        // Validate input
        if (!id) {
          return res.status(400).json({ success: false, message: 'User ID is required for update' });
        }
      
        // Convert id to ObjectId (MongoDB uses ObjectId for _id)
        const { ObjectId } = require('mongodb');
        let objectId;
        try {
          objectId = new ObjectId(id);
        } catch (error) {
          return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }
      
        // Update the user in the database
        const updateResult = await collection.updateOne(
          { _id: objectId },
          { $set: updateData }
        );
      
        // Check if the user was found and updated
        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
      
        // Send success response
        res.status(200).json({
          success: true,
          message: 'User updated successfully',
          updatedFields: updateData,
        });
        break;
      }

      case 'DELETE': {
        // Delete a user by ID
        const { id } = req.body;
      
        // Validate input
        if (!id) {
          return res.status(400).json({ success: false, message: 'User ID is required for deletion' });
        }
      
        // Convert id to ObjectId (MongoDB uses ObjectId for _id)
        const { ObjectId } = require('mongodb');
        let objectId;
        try {
          objectId = new ObjectId(id);
        } catch (error) {
          return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }
      
        // Delete the user from the database
        const deleteResult = await collection.deleteOne({ _id: objectId });
      
        // Check if the user was found and deleted
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
      
        // Send success response
        res.status(200).json({
          success: true,
          message: 'User deleted successfully',
        });
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}