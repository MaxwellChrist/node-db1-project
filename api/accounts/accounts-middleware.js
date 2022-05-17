const {getById, checkIfNameUnique} = require('./accounts-model');
const db = require('../../data/db-config');
const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if (typeof req.body.name === "undefined" || typeof req.body.budget === "undefined") {
    res.status(400).json({ message: "name and budget are required"});
    return
  }
  if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
    return
  }
  if (typeof req.body.budget !== "number" || isNaN(req.body.budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
    return;
  }
  if (req.body.budget > 1000000 || req.body.budget < 0) {
    res.status(400).json({ message: "budget of account is too large or too small" });
    return
  }
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  const name = req.body.name.trim();
  Accounts.checkIfNameUnique({'name': name})
  .then(result => {
    if (result.length > 0) {
      res.status(400).json({ message: "that name is taken" });
      return
    }
    next()
  })
}

exports.checkAccountId = (req, res, next) => {
  const id = req.params.id
  Accounts.getById(id)
  .then(result => {
    if (result == null) {
      res.status(404).json({ message: "account not found" });
      return
    } else {
      req.accounts = result;
      next()
    }
  })
}