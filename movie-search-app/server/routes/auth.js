// server/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await User.hashPassword(password, 10);
  try {
    const user = await User.create({ username, email, password, role });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(400).json({ error: "Signup failed", details: error.message });
  }
});

// Guest login route
router.post("/guest", async (req, res) => {
  try {
    // Create a guest user token
    const token = jwt.sign({ guest: true }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in as guest", error });
  }
});
// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
});

module.exports = router;
