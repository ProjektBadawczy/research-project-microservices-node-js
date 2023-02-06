import { Graph } from '../../common-models/graph';
import {BfsResult} from "../../common-models/bfs-result";
import {Service} from "typedi";
import * as _ from "lodash"
import {GraphForBfs} from "../../common-models/graph-for-bfs";

@Service()
export default class EdmondsKarpService {
    constructor() {}

    calculateMaxFlow(id: number, source: number, destination: number): number {
        const graphServiceUrl = `http://graph-service:80/graph?id=${id}`
        const bfssServiceUrl = `http://bfs-service:80/bfs`
        let isGraphFetchSuccessful: boolean = false;
        var graph: Graph = new Graph(0,0, new Array<Array<number>>())
        fetch(graphServiceUrl)
            .then(resp => {
                if (resp.ok){
                    isGraphFetchSuccessful = true
                    return resp.json()
                }
            })
            .then( data => {
                    graph.id = data.id
                    graph.numberOfVertices = data.numberOfVertices
                    graph.adjacencyMatrix = data.adjacencyMatrix
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);

            })
        
        if (isGraphFetchSuccessful) {
            var graphForBfs: GraphForBfs = new GraphForBfs(graph.id, 
                graph.numberOfVertices, 
                graph.adjacencyMatrix, source, destination)
            var bfsResult: BfsResult = new BfsResult(new Array<number>(), false)
            fetch(bfssServiceUrl)
                .then(resp => {
                    return resp.json()
                })
                .then( data => {
                    bfsResult = new BfsResult(data.parents, data.success)
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);

                })

            var u, v;
            var residualGraph: GraphForBfs = _.cloneDeep(graphForBfs)
            var maxFlow = 0;

            while (bfsResult.success)
            {
                var pathFlow: number = Number.MAX_VALUE;
                for (v = destination; v != source; v = bfsResult.parents[v])
                {
                    u = bfsResult.parents[v];
                    pathFlow = Math.min(pathFlow, residualGraph.adjacencyMatrix[u][v]);
                }

                for (v = destination; v != source; v = bfsResult.parents[v])
                {
                    u = bfsResult.parents[v];
                    residualGraph.adjacencyMatrix[u][v] -= pathFlow;
                    residualGraph.adjacencyMatrix[v][u] += pathFlow;
                }

                maxFlow += pathFlow;
                var data = new FormData();
                data.append( "json", JSON.stringify( residualGraph ) );
                fetch(bfssServiceUrl, {method: 'POST', body: data})
                    .then(resp => {
                        return resp.json()
                    })
                    .then( data => {
                        bfsResult = new BfsResult(data.parents, data.success)
                    })
                    .catch((error) => {
                        console.error('There has been a problem with your fetch operation:', error);

                    })
            }

            return maxFlow;
        }
        else {
            return -1;
        }
    }
}