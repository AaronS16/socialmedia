const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post');
const Comment = require('../models/comments')

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                comment: req.body.comment,
                post: req.params.id,
                likes: 0,
                user: req.user.id, 
            });
            console.log('Comment has been added!');
            res.redirect('/post/' + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },
    likePost: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: {likes: 1 },
                }
            );
            console.log('Likes +1');
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    deletePost: async (req, res) => {
        try {
            let postDelete = await Post.findById({ _id: req.params.id });
            await cloudinary.uploader.destroy(postDelete.cloudinaryId);
            await Post.remove({ _id: req.params.id });
            console.log('Deleted Post');
            res.redirect('/profile')
        } catch (err) {
            res.redirect('/profile');
        }
    },
};