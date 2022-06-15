const UserController = require('./controllers/userController')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers
  },
]