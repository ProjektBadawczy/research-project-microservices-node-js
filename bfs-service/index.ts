import express from 'express';
import {route} from "./routes";

const app = express();

app.use('/', route);

app.listen(8001, () => {
    console.log('Server started');
});
