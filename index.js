import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Posts from "./models/posts.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;


mongoose
	.connect(dbURI)
	.then((_) => {
		console.log("connected to db⚡️");
		app.listen(PORT);
	})
	.then(() => console.log(`Server listening on port ${PORT}✨`))
	.catch((err) => console.log(err));

app.use(express.json());

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter)





app.get("/posts", async(req, res) => {
    //console.log("fetching")

  const data = await Posts.find() 
  res.json({ data, success: true });
});

app.get("/posts/:post_id", async(req, res) => {
  const blog = await Posts.find({_id:req.params.post_id})
  if (!blog) {
    res
      .status(404)
      .json({
        data: "no blog with the given id, please try again",
        success: false,
      });
  } else {
    res.json({ data: blog, success: true });
  }
});

app.post("/posts", async(req, res) => {

  const bodyParams = req.body;

  if (!bodyParams.name || !bodyParams.description) {
    res
      .status(400)
      .json({ data: " Data missing , please try again", success: false });
  } else {
    let entryBlog = {};

    entryBlog.name = bodyParams.name;
    entryBlog.description = bodyParams.description;
    
    await Posts.create(entryBlog)
    res.json({ data: db, success: true });
  }
});
