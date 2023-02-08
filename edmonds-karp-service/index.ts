import express from 'express';
import {route} from "./routes";

export const app = express();

app.use('/', route);

app.listen(5003, () => {
    console.log('Server started');
});
