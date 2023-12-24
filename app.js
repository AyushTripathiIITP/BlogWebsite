//jshint esversion:6

const lodash = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Main code goes here
const posts = [];

app.get("/", (req, res) => {
  res.render("home", { content: homeStartingContent, post_arr: posts });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

app.get("/posts/:topic", (req, res) => {
  const tt = req.params.topic;
  const tar = lodash.lowerCase(tt);

  for (const post of posts) {
    if (lodash.lowerCase(post.title) === tar) {
      return res.render("post", {
        postTitle: post.title,
        postContent: post.body,
      });
    }
  }
  res.status(404).send("Error 404");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const { composeContentTitle, composeContentBody } = req.body;

  if (!composeContentTitle || !composeContentBody) {
    return res.send("Error: Title and body are required.");
  }

  const post = {
    title: composeContentTitle,
    body: composeContentBody,
  };

  posts.push(post);

  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).send("Error 404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
