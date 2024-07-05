const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const comment = await prisma.comment.findMany();
  res.json(comment);
});

router.post("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { userPosting, comment } = req.body;

  const newComment = await prisma.comment.create({
    data: {
      userPosting,
      eventId: parseInt(eventId),
      comment,
    },
  });

  res.json(newComment);
});

router.put("/:eventId/:id", async (req, res) => {
  const { eventId, id } = req.params;
  const { userPosting, comment } = req.body;

  const updatedComment = await prisma.comment.update({
    where: {
      id: parseInt(id),
      eventId: parseInt(eventId),
    },
    data: {
      userPosting,
      eventId,
      comment,
    },
  });

  res.json(updatedComment);
});

router.delete("/:eventId/:id", async (req, res) => {
  const { eventId, id } = req.params;

  const deletedComment = await prisma.comment.delete({
    where: {
      id: parseInt(id),
      eventId: parseInt(eventId),
    },
  });

  res.json(deletedComment);
});

router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const comments = await prisma.comment.findMany({
    where: { eventId: parseInt(eventId) },
  });

  res.json(comments);
});

module.exports = router;
