// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
      port: process.env.DATABASE_PORT
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&",
      port: "5500"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABSE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
