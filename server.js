// server.js
import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("api/db.json"); // path to your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/", router); // API endpoint path

server.listen(3000, () => {
  console.log(`JSON Server is running on port 3000`);
});
