const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const Post = require("./models/Post");
const methodOverride = require("method-override");

const app = express();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require("./controllers/postController");
const {
  aboutPage,
  homePage,
  addPage,
  editPage
} = require("./controllers/pageController");

mongoose
  .connect('mongodb://localhost/blog-test-db')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.get("/", getAllPosts);
app.get("/post/:id", getPost);
app.post("/add", createPost);
app.put("/post/:id", updatePost);
app.delete("/post/:id", deletePost);
app.get("/home", homePage);
app.get("/about", aboutPage);
app.get("/add", addPage);
app.get("/post/edit/:id", editPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
