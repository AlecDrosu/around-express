const User = require("../models/user");

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const getUsers = (req, res) => {
  User.find()
    .orFail(() => {
      res.status(404).send({ message: "Users not found" });
    })
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      avatar: req.body.avatar,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
};
