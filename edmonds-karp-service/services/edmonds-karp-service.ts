import { Graph } from '../models/graph';
import {BfsResult} from "../models/bfs-result";
import {Service} from "typedi";
import * as _ from "lodash"
import {GraphForBfs} from "../models/graph-for-bfs";

@Service()
export default class EdmondsKarpService {
    constructor() {}

    async calculateMaxFlow(id: number, source: number, destination: number): Promise<number> {
        const graphServiceUrl = `http://localhost:5001/graph?id=${id}`
        const bfsServiceUrl = `http://localhost:5003/bfs`
        var isGraphFetchSuccessful: boolean = false;
        var graphData  = await fetch(graphServiceUrl)
            .then(resp => {
                if (resp.ok) {
                    isGraphFetchSuccessful = true
                    return resp.json()
                }
            })
            .then(data => {
                return data
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);

            })
        var graph = new Graph(graphData.id, graphData.numberOfVertices, graphData.adjacencyMatrix)
        
        if (isGraphFetchSuccessful) {
            var graphForBfs: GraphForBfs = new GraphForBfs(graph.id,
                graph.numberOfVertices,
                graph.adjacencyMatrix, source, destination)
            
            var bfsResult = await fetch(bfsServiceUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(graphForBfs)})
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    return data
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);

                })
            
            var u, v;
            var residualGraph: GraphForBfs = _.cloneDeep(graphForBfs)
            var maxFlow = 0;

            while (bfsResult.success) {
                var pathFlow: number = Number.MAX_VALUE;
                for (v = destination; v != source; v = bfsResult.parents[v]) {
                    u = bfsResult.parents[v];
                    pathFlow = Math.min(pathFlow, residualGraph.adjacencyMatrix[u][v]);
                }

                for (v = destination; v != source; v = bfsResult.parents[v]) {
                    u = bfsResult.parents[v];
                    residualGraph.adjacencyMatrix[u][v] -= pathFlow;
                    residualGraph.adjacencyMatrix[v][u] += pathFlow;
                }

                maxFlow += pathFlow;
                var newBfsResult = await fetch(bfsServiceUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(residualGraph)})
                    .then(resp => {
                        return resp.json()
                    })
                    .then(data => {
                        return data
                    })
                    .catch((error) => {
                        console.error('There has been a problem with your fetch operation:', error);

                    })
                bfsResult = new BfsResult(newBfsResult.parents, newBfsResult.success)
            }
            return maxFlow;
        } else {
            return -1;
        }
    }
}