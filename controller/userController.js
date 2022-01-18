const { User } = require("../models");

module.exports = {
  //finds ALL users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //creates user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //gets single user
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then((user) => 
      !user
      ? res.status(404).json({message: "No user found with this id"})
      : res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //updates user
  updateUserById(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $set: { username: req.body.username } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //add Friend
  addFriend(req, res) {
    //adds friend to userId
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : //adds user to friendId
            User.findByIdAndUpdate(
              req.params.friendId,
              { $addToSet: { friends: req.params.userId } },
              { runValidators: true, new: true }
            ).then((friend) =>
              !friend
                ? res.status(404).json({ message: "No user with this id!" })
                : res.json(friend)
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : //adds user to friendId
            User.findByIdAndUpdate(
              req.params.friendId,
              { $pull: { friends: req.params.userId } },
              { runValidators: true, new: true }
            ).then((friend) =>
              !friend
                ? res.status(404).json({ message: "No user with this id!" })
                : res.json(friend)
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findByIdAndRemove(req.params.userId).then((user) =>
      !user
        ? res.status(404).json({ message: "No User exists with this id" })
        : res.json({message: "User has been deleted!"})
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
  },
};
