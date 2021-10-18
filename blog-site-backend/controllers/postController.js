const Post = require('../models/post');

exports.all_posts = async (req, res) => {

    const posts = await Post.find().populate('author').sort('-date');

    res.json({
        posts
    });
};

exports.user_posts = async (req, res) => {
    const posts = await Post.find({author: req.user}).populate('author').sort('-date');

    res.json({
        posts
    });
};

exports.single_post = async (req, res) => {

    const post = await Post.findById(req.params.postId).populate('author');

    if (!post) {
        return res.json({ error: "Cannot find post"});
    };

    res.json({
        post
    });
};

exports.create_post = async (req, res) => {

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user,
    });

    const savedPost = await post.save();

    res.json({
        savedPost
    });
};

exports.update_post = async (req, res) => {

    const foundPost = await Post.findById(req.params.postId);

    if (req.user !== foundPost.author._id.toString()) {
        return res.json({
            error: "Not Authorized to edit this post"
        });
    };

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        _id: req.params.postId
    });

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post);

    res.json({
        updatedPost
    });
};

exports.delete_post = async (req, res) => {

    const foundPost = await Post.findById(req.params.postId);

    if (req.user !== foundPost.author._id.toString()) {
        return res.json({
            error: "Not Authorized to delete this post"
        });
    };

    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    res.json({
        deletedPost
    });
};