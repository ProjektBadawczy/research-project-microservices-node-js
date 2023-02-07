import 'reflect-metadata';
import { Router } from 'express';
import Container from "typedi";

import PushRelabelController from "./controllers/push-relabel-controller";
import {PushRelabelService} from "./services/push-relabel-service";

export const route = Router();

const pushRelabelController = new PushRelabelController(Container.get(PushRelabelService));


route.get('/pushRelabelMaxGraphFlow', 
    (req, res) => pushRelabelController.getPushRelabelMaxGraphFlow(req, res));
