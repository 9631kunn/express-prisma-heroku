import pkgPrisma from "@prisma/client";
import express from "express";

const { PrismaClient } = pkgPrisma;
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><ul><li><a href="/users">/users</a></li><li><a href="/user/1">/user/:id</a></li><li><a href="/posts">/posts</a></li><li><a href="/post/1">/post/:id</a></li></ul></body></html>'
  );
});

// USER

app.get("/users", async (req, res, next) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

app.get("/user/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.post("/user", async (req, res, next) => {
  response.header("Access-Control-Allow-Origin", "http://example.com");
  const data = { ...req.body };
  const newUser = await prisma.user.create({
    data: data,
  });
  res.json(newUser);
});

// POST

app.get("/posts/", async (req, res, next) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

app.get("/post/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.post("/post", async (req, res, next) => {
  const { title, content, authorId } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { id: authorId } },
    },
  });
  res.json(newPost);
});

const PORT = process.env.PORT || 3000; // for heroku

app.listen(PORT);
