const { DataTypes } = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
    tagName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    tagDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Member;