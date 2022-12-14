const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        poster: req.user.userName,
        posterId: req.user._id,
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log('Comment has been added!');
      res.redirect('/post/' + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.find({ post: req.params.id });
      // Delete comment from db
      await Comment.remove({ post: req.params.id });
      console.log('Deleted Comment');
      res.redirect('/post/' + req.params.id);
    } catch (err) {
      res.redirect('/post/' + req.params.id);
    }
  },
};
