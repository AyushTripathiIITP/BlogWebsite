//jshint esversion:6

const lodash = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeStartingContent =
  "Welcome to our blog, a digital haven where curiosity meets knowledge, and diverse perspectives converge. Here, we embark on a journey through the realms of information, exploring topics that inspire, educate, and entertain. Our blog is more than just a collection of articles; it's a dynamic space where ideas come to life. Whether you're seeking the latest trends, insightful analyses, or simply a delightful escape into the world of words, you'll find it here.";
const aboutContent =
  "About our blog website, we are more than just storytellers; we are a collective of passionate individuals driven by the belief that knowledge shared is knowledge multiplied. Our journey began with a shared vision of creating a space where ideas flourish and perspectives intertwine. Here, you'll get to know the faces behind the words, the storytellers who strive to bring you engaging and thought-provoking content. Our diverse team is united by a common thread: a love for exploration, learning, and the art of expression.Let's embark on a continuous journey of discovery, curiosity, and meaningful connections.";
const contactContent =
  "We value the thoughts, questions, and feedback from our readers, and we're thrilled that you're reaching out. Whether you have a suggestion for a topic you'd love to see covered, want to collaborate with our talented team, or simply wish to share your thoughts on a recent post, your input is invaluable to us. Feel free to drop us a message using the form below, and we'll make sure to get back to you promptly. Your engagement is what makes this community thrive, and we look forward to hearing from you. Let's keep the conversation going!";
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//main code goes here
var posts = [];

app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, post_arr: posts });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
});

app.get("/posts/:topic", function (req, res) {
  var tt = req.params.topic;
  tar = lodash.lowerCase(tt);

  for (let i = 0; i < posts.length; i++) {
    if (lodash.lowerCase(posts[i].title) === tar) {
      return res.render("post", {
        postTitle: posts[i].title,
        postContent: posts[i].body,
      });
    }
  }
  res.send("Error 404");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.composeContentTitle,
    body: req.body.composeContentBody,
  };
  
  posts.push(post);

  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).render('404-page');
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
