import {Service} from "typedi";
import { GraphForBfs } from "../models/graph-for-bfs";
import {BfsResult} from "../models/bfs-result";

@Service()
export class BfsService {

    Bfs(graphForBfs: GraphForBfs): BfsResult {
        var numberOfVertices: number = graphForBfs.numberOfVertices
        var parent: number[] = []
        var visited: boolean[] = []

        for (var i = 0; i < numberOfVertices; i++)
        {
            visited[i] = false
        }

        var queue: Array<number> = Array<number>();
        queue.push(graphForBfs.source)
        visited[graphForBfs.source] = true
        parent[graphForBfs.source] = -1

        while (queue.length != 0)
        {
            var u = queue[0]
            queue.shift()
            for (var v = 0; v < numberOfVertices; v++)
            {
                if (!visited[v] && graphForBfs.adjacencyMatrix[u][v] > 0)
                {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }

        return new BfsResult(parent, visited[graphForBfs.destination]);
    }
}