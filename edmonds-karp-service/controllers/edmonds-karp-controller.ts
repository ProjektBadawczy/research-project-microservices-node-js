import { Request, Response } from "express";
import EdmondsKarpService from "../services/edmonds-karp-service";

class EdmondsKarpController {

    constructor(private readonly edmondsKarpService: EdmondsKarpService) {
    }

    async getEdmondsKarpMaxGraphFlow(_req: Request, res: Response) {
        const id = Number(_req.query.id);
        const source = Number(_req.query.source);
        const destination = Number(_req.query.destination);
        var maxFlow = await this.edmondsKarpService.calculateMaxFlow(id, source, destination)
        return res.json(maxFlow)
    }
}

export default EdmondsKarpController
