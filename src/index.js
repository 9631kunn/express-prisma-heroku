import pkgPrisma from "@prisma/client";
import express from "express";

const { PrismaClient } = pkgPrisma;
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", async (req, res, next) => {
  const users = await prisma.user.findMany();
  return res.send(users);
});

app.get("/posts/", async (req, res, next) => {
  const posts = await prisma.post.findMany();
  return res.send(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.listen(3000);
