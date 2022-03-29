const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find()
    .orFail(() => {
      res.status(404).send({ message: "Cards not found" });
    })
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(404).send({ message: "Card not found" });
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  updateLike,
  likeCard,
  dislikeCard,
};
