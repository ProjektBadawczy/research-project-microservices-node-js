import 'reflect-metadata';
import { Router } from 'express';
import Container from "typedi";
import EdmondsKarpService from "./services/edmonds-karp-service";
import EdmondsKarpController from "./controllers/edmonds-karp-controller";

export const route = Router();

const edmondsKarpController = new EdmondsKarpController(Container.get(EdmondsKarpService));


route.get('/edmondsKarpMaxGraphFlow', 
    (req, res) => edmondsKarpController.getEdmondsKarpMaxGraphFlow(req, res));