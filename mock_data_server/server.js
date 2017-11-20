var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

console.log(require('./db.json'));

server.use(middlewares)
server.use(router)

server.listen(9000, function () {
  console.log('JSON Server is running')
})