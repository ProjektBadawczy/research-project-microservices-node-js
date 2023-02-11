import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import { BfsService } from "../services/bfs-service";
import {hostname} from "os";

class BfsController {

    constructor(private readonly bfsService: BfsService) {
    }

    bfs(_req: Request, res: Response) {
        const graphForBfs = _req.body;
        if (graphForBfs == null) {
            res.status(StatusCodes.NOT_FOUND).json([]);
        }
        console.log(hostname())
        return res.json(this.bfsService.Bfs(graphForBfs))
    }
}

export default BfsController
