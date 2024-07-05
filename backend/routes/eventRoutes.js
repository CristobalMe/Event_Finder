const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

router.post("/", async (req, res) => {
  const { rating, location, name, duration, description, image, category } =
    req.body;

  const newEvent = await prisma.event.create({
    data: {
      rating,
      location,
      name,
      duration,
      description,
      image,
      category,
    },
  });

  res.json(newEvent);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { rating, location, name, duration, description, image, category } =
    req.body;

  const updatedEvent = await prisma.event.update({
    where: { id: parseInt(id) },
    data: {
      rating,
      location,
      name,
      duration,
      description,
      image,
      category,
    },
  });

  res.json(updatedEvent);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await prisma.event.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedEvent);
});

module.exports = router;
