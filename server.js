const jsonserver = require("json-server");
const server = jsonserver.create();
const router = jsonserver.router("./db.json");
const middlewares = jsonserver.defaults({
    static: "./build",
});

const port = process.env.PORT || 4000;
server.use(middlewares);
server.use(
    jsonserver.rewriter({
        "/api/*": "/$1",
    })
);

server.use(router);
server.listen(port, ()=>{
    console.log(`Server is runnung on ${port}`);
});