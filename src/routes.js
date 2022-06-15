const UserController = require('./controllers/userController')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById
  },
]