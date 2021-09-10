const { DataTypes } = require("sequelize");
const db = require("../db");

const Journal = db.define("journal", {
    journalEntry: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    journalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
});

module.exports = Journal;