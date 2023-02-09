import express from 'express';
import {route} from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())
app.use('/', route);
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.listen(80, () => {
    console.log('Server started');
});
