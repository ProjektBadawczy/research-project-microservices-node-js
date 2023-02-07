import 'reflect-metadata';
import { Router } from 'express';
import BfsController from "./controllers/bfs-controller";
import Container from "typedi";
import { BfsService } from "./services/bfs-service";

export const route = Router();

const bfsController = new BfsController(Container.get(BfsService));


route.post('/bfs', 
    (req, res) => bfsController.bfs(req, res));