const db = require("../db");

const DefineMember = (sequelize, DataTypes) => {
    const Member = sequelize.define("member", {
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
            type: DataTypes.STRING,
        },
        // favoriteQuotes: {
        //     type: DataTypes.ARRAY(NUMBER),
        // },
        // favoritePics: {
        //     type: DataTypes.ARRAY(NUMBER),
        // },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        } 
    })
    return Member
};


module.exports = DefineMember;