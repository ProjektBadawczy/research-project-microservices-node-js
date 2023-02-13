import { Request, Response } from "express";
import {PushRelabelService} from "../services/push-relabel-service";

class PushRelabelController {

    constructor(private readonly pushRelabelService: PushRelabelService) {
    }

    async getPushRelabelMaxGraphFlow(_req: Request, res: Response) {
        const id = Number(_req.query.id);
        const source = Number(_req.query.source);
        const destination = Number(_req.query.destination);
        var maxFlow = await this.pushRelabelService.calculateMaxFlow(id, source, destination)
        return res.json(maxFlow)
    }
}

export default PushRelabelController