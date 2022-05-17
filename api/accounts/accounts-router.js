const router = require('express').Router();
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  Accounts.getAll()
  .then(result => {
    res.json(result)
  })
  .catch(result => {
    res.status(500).json({ message: "Error: get request failed" })
  })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.accounts)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body) 
  .then(result => {
    result.name = result.name.trim()
    res.status(201).json(result)
  })
  .catch(result => {
    res.status(500).json({ message: "Error: post request failed" })
  })
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
  .then(result => {
    res.json(result)
  })
  .catch(result => {
    res.status(500).json({ message: "Error: put request failed" })
  })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(result => {
    res.json(req.accounts)
  })
  .catch(result => {
    res.status(500).json({ message: "Error: delete request failed" })
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
