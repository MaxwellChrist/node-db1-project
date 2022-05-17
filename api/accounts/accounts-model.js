const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where({ id: id}).first()
}

const create = account => {
  return db('accounts').insert(account)
  .then(result => {
    return getById(result[0])
  })
}

const updateById = (id, account) => {

}

const deleteById = id => {
  return db('accounts').where('id', id).delete()
}

const checkIfNameUnique = (newName) => {
  return db('accounts').where(newName)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkIfNameUnique
}
