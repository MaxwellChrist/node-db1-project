const express = require("express");
const server = express();

const accountsRouter = require('./accounts/accounts-router')

server.use(express.json());

server.use('/api/accounts/', accountsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "Ready to Code!" })
  })

module.exports = server;