const db = require("../models");
const Recipe = db.recipes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const recipe = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Recipe.create(recipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the recipe."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Recipe.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipe."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving recipe with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Recipe.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update recipe with id=${id}. Maybe recipe was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating recipe with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete recipe with id=${id}. Maybe recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete recipe with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} recipe were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipes."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Recipe.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      });
    });
};
