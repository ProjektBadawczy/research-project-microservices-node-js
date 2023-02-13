import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import { BfsService } from "../services/bfs-service";

class BfsController {

    constructor(private readonly bfsService: BfsService) {
    }

    bfs(_req: Request, res: Response) {
        const graphForBfs = _req.body;
        if (graphForBfs == null) {
            res.status(StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(this.bfsService.Bfs(graphForBfs))
    }
}

export default BfsController
