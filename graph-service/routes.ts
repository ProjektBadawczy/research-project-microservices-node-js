import 'reflect-metadata';
import { Router } from 'express';
import Container from "typedi";
import GraphService from "./services/graph-service";
import GraphController from "./controllers/graph-controller";

export const route = Router();

const graphController = new GraphController(Container.get(GraphService));


route.get('/graph', 
    (req, res) => graphController.getGraph(req, res));

route.get('/directedGraph',
    (req, res) => graphController.getDirectedGraph(req, res));