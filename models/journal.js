const db = require("../db");

const DefineJournal = (sequelize, DataTypes) => {
    const Journal = sequelize.define("journal", {
        journalBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        journalName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Journal
};


module.exports = DefineJournal;