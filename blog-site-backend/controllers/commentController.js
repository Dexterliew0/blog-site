const Comment = require('../models/comment');

exports.get_comments = async (req, res) => {
    const comments = await Comment.find({post: req.params.postId}).populate('author').sort('-date');

    res.json({
        comments
    });
}

exports.get_single_comment = async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);

    res.json({
        comment
    });
}

exports.create_comment = async (req, res) => {

    const comment = new Comment({
        text: req.body.text,
        author: req.user,
        post: req.body.post
    });

    const savedComment = await comment.save();

    res.json({
        savedComment
    });
};

exports.update_comment = async (req, res) => {

    const foundComment = await Comment.findById(req.params.commentId);

    if (req.user !== foundComment.author._id.toString()) {
        return res.json({
            error: "Not Authorized to edit this comment"
        });
    };

    const comment = new Comment({
        text: req.body.text,
        _id: req.params.commentId
    });

    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, comment);

    res.json({
        updatedComment
    });
};

exports.delete_comment = async (req, res) => {

    const foundComment = await Comment.findById(req.params.commentId);

    if (req.user !== foundComment.author._id.toString()) {
        return res.json({
            error: "Not Authorized to delete this comment"
        });
    };

    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);

    res.json({
        deletedComment
    });
};