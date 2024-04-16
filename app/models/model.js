module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("recipes", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.STRING
    }
  });

  return recipes;
};
