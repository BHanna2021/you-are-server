const { DataTypes } = require("sequelize");
const db = require("../db");

const Member = db.define("member", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.NUMBER,
        allowNull: true,
    }
});

module.exports = Member;