const User = require('../model/User');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const authController = {
  generateToken: (user) => {
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  },

  registerUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await User.create({ firstName, lastName, email, password, role });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add more methods here...
};

module.exports = authController;