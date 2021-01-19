import pkgPrisma from "@prisma/client";
import express from "express";
import cors from "cors";

const { PrismaClient } = pkgPrisma;
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: "https://31navi.com",
  optionsSuccessStatus: 200,
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

// USER

app.get("/users", cors(corsOptions), async (req, res, next) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

app.get("/user/:id", cors(corsOptions), async (req, res, next) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.post("/user", cors(corsOptions), async (req, res, next) => {
  const data = { ...req.body };
  const newUser = await prisma.user.create({
    data: data,
  });
  res.json(newUser);
});

// POST

app.get("/posts/", cors(corsOptions), async (req, res, next) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

app.get("/post/:id", cors(corsOptions), async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

const PORT = process.env.PORT || 3000; // for heroku

app.listen(PORT);
