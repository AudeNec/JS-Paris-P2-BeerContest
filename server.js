const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000; // Port défini par Vercel
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
