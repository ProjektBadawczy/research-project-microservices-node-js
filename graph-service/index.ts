import express from 'express';
import {route} from "./routes";
import bodyParser from "body-parser";
import cluster from 'cluster';
import os from "os";

const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
    // Fork workers.
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const app = express();
    app.use(bodyParser.json())
    app.use(express.json({limit: '50mb'}))
    app.use(express.urlencoded({limit: '50mb', extended: true}))
    app.use('/', route);

    app.listen(80, () => {
        console.log('Server started');
    });
    console.log(`Worker ${process.pid} started`);
  }


