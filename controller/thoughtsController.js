const { Thoughts, User, Reaction } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find()
      .then(async (thoughts) => 
      !thoughts
      ? res.status(404).json({message: "No thoughts!"})
      :res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getThoughtById(req, res) {
    Thoughts.findById(req.params.thoughtsId)
      .then((thought) => 
      !thought
      ? res.status(404).json({message: "No thoughts!"})
      :res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  addThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts!" })
          : User.findByIdAndUpdate(
              req.body.userId,
              { $addToSet: { thoughts: thought._id } },
              { runValidators: true, new: true }
            ).then((thought) =>
              !thought
                ? res.status(404).json({ message: "No thoughts!" })
                : res.json(thought)
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  changeThoughtById(req, res) {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtsId,
      { $set: { thoughtText: req.body.thoughtText } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought exists" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtsId,
      { $push: { $in: {reactions: req.body} } },
      { runValidators: true, new: true }
    )
    .then((reaction) => 
    !reaction
    ? res.status(404).json({message: "No Thoughts exist"})
    : res.json(reaction)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },
  deleteThought(req, res) {
    Thoughts.findByIdAndRemove(req.params.thoughtsId).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No Thought exists with this id" })
        : res.json({message: "Thought has been deleted!"})
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
  },
  removeReaction(req, res) {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtsId,
      { $pull: {reactions: {_id: req.params.reactionId}}},
      { runValidators: true, new: true }
    )
    .then((reaction) => 
    !reaction
    ? res.status(404).json({message: "No Reactions exist"})
    : res.json(reaction)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  }
};
