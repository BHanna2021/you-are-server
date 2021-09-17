const { DataTypes } = require("sequelize");
const { sequelize } = require("../db")

const DefineJournal = require("./journal");
const DefineMember = require("./member");
const DefineQuote = require("./quote");

const Member = DefineMember(sequelize, DataTypes)
const Journal = DefineJournal(sequelize, DataTypes)
const Quote = DefineQuote(sequelize, DataTypes)

Member.hasMany(Journal, {
    foreignKey: 'memberId'
})
Journal.belongsTo(Member)

Quote.belongsToMany(Member, { through: 'FavQuotes' })
Member.belongsToMany(Quote, { through: 'FavQuotes' })

sequelize.sync({ alter: true })
module.exports = {
    Journal,
    Member,
    Quote,
};