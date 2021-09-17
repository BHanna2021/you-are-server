const db = require("../db");

const DefineQuote = (sequelize, DataTypes) => {
    const Quote = sequelize.define("quote", {
        quoteBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        attribution: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // tags: {
            //     type: DataTypes.ARRAY,
            // },
        share: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        approvedForAll: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    })
    return Quote
};

module.exports = DefineQuote;