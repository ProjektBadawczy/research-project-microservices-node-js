import { Request, Response } from "express";
import GraphService from "../services/graph-service";
import {StatusCodes} from "http-status-codes";

class GraphController {

    constructor(private readonly graphService: GraphService) {
    }

    getGraph(_req: Request, res: Response) {
        const id = Number(_req.query.id);
        const graph = this.graphService.getGraph(id);
        if (graph == null) {
            res.status(StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(graph)
    }

    getDirectedGraph(_req: Request, res: Response) {
        const id = Number(_req.query.id);
        const graph = this.graphService.getDirectedGraph(id);
        if (graph == null) {
            res.status(StatusCodes.NOT_FOUND).json([]);
        }
        return res.json(graph)
    }
}

export default GraphController
