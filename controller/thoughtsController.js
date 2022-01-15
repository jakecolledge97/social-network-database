const { Thoughts, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find()
    .then(async (thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  getThoughtById(req, res) {
      Thoughts.findById(req.params.thoughtsId)
      .then((thought) => res.json(thought))
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
};
