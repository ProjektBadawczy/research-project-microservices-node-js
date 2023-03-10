import express from 'express';
import {route} from "./routes";

export const app = express();

app.use('/', route);

app.listen(80, () => {
    console.log('Server started');
});
