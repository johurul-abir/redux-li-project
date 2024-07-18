// server.js
import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("api/db.json"); // path to your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router); // API endpoint path

server.listen(5050, () => {
  console.log(`JSON Server is running on port 5050`);
});
