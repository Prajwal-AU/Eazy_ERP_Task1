const cluster = require("cluster");
const os = require("os");
const numCPU = os.cups.length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} running`);

  for (let i = 0; i < numCPU; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Creating a new worker");
    cluster.fork();
  });
} else {
  require("./index");
  console.log(` worker ${process.pic} started`);
}
