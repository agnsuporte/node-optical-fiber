/**
 *
 *
 * Este arquivo já não é necessário desde que passei a usar
 * o Sequelize-CLI. Mas decidi deixar como registro.
 *
 *
 */

const { Sequelize } = require('sequelize');
const config = require('../config/config');

const User = require('./models/user');
const Project = require('./models/project');

const conn = {
  user: config.development.username,
  pass: config.development.password,
  host: config.development.host,
  port: config.development.port,
  base: config.development.database,
};

const connection = new Sequelize(
  `postgres://${conn.user}:${conn.pass}@${conn.host}:${conn.port}/${conn.base}`
);

const user = User(connection, Sequelize.DataTypes);
const project = Project(connection, Sequelize.DataTypes);

user.associate(connection.models);
project.associate(connection.models);

module.exports = connection;
