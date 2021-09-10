const { DataTypes } = require("sequelize");
const db = require("../db");

const Quote = db.define("quote", {
    quote: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    attribution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    share: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    owner: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    approvedForAll: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Quote;