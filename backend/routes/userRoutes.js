const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: { username: username },
  });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPasswordValue = String(hashedPassword);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPasswordValue,
    },
  });

  req.session.user = newUser;

  res.json(newUser);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      username,
      email,
      password,
    },
  });

  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findFirst({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Set the user in the session
    req.session.user = user;

    // Return the user data in the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
