const Post = require("../models/postSchema");
const {uploadCloudinary , deleteCloudinary} = require("../utils/cloudinary");
const Fs = require("fs");

const allpostController = async (request, response) => {
  const username = request.query.username;
  const category = request.query.category;
  try {
    let posts;

    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({ categories: [category] });
    } else {
      posts = await Post.find();
    }

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};

//GET post by :id
const idController = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

//new Post
const newPost = async (req, res) => {
  const { title, description, categories, username } = req.body;

  try {
    const photoLocalPath = req.file?.path;
    if (!photoLocalPath) return res.status(200).json("Invalid photo");
    const cloudPhotoPath = await uploadCloudinary(photoLocalPath);

    const savePost = await new Post({
      title,
      description,
      photo: cloudPhotoPath.url,
      cloudinaryPublicId:cloudPhotoPath.public_id,
      categories,
      username,
    }).save();
    await Fs.unlinkSync(photoLocalPath);
    res.status(200).json(savePost);
  } catch (error) {
    console.log("error");
    res.status(500).json({ msg: error });
  }
};

//delete Post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { username } = req.body;
   
    const post = await Post.findById(postId);

    if (req.body.username === post.username) {
      await deleteCloudinary(post.cloudinaryPublicId)
      await post.delete()
      res.status(200).json({ msg: "Post Delete Successfully !!" });
    } else {
      res.status(401).json({ msg: "its Not Your's Post !!" });
    }

  } catch (error) {
    res.status(500).json({ msg: "Post Not Delete", error });
  }
};

module.exports = { allpostController, idController, newPost, deletePost };
