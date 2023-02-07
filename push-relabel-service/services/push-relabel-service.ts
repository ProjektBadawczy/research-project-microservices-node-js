import {DirectedGraph} from "../models/directed-graph";
import {Service} from "typedi";


@Service()
export class PushRelabelService {

    initResidualGraph(graph: DirectedGraph): DirectedGraph {
        var residualGraph: DirectedGraph = new DirectedGraph(graph.id, graph.numberOfVertices)

        for (var u = 0; u < graph.numberOfVertices; u++) {

            for(let v of graph.adjacencyList[u]) {
                if (residualGraph.hasEdge(u, v.i)) {
                    residualGraph.getEdge(u, v.i).w += v.w;
                }

                else {
                    residualGraph.addEdge(u, v.i, v.w);
                }

                if (!residualGraph.hasEdge(v.i, u)) {
                    residualGraph.addEdge(v.i, u, 0);
                }
            }
        }

        return residualGraph;
    }

    async calculateMaxFlow(id: number, source: number, destination: number): Promise<number> {
        const graphServiceUrl = `http://graph-service:80/directedGraph?id=${id}`
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
        var graph = graphData

        
        var residualGraph: DirectedGraph  = this.initResidualGraph(graph);

        var queue: Array<number> = new Array<number>();

        var e: number[] = [];
        var h: number[] = [];
        var inQueue: boolean[] = [];

        for(let i=0; i < graph.numberOfVertices; i++ ){
            e[i] = 0;
            h[i] = 0;
            inQueue[i] = false;
        }

        h[source] = graph.numberOfVertices;

        for(var v of graph.adjacencyList[source]) {
            residualGraph.getEdge(source, v.i).w = 0;
            residualGraph.getEdge(v.i, source).w = v.w;

            e[v.i] = v.w;

            if (v.i != destination) {
                queue.push(v.i);
                inQueue[v.i] = true;
            }
        }

        while (queue.length != 0) {

            var u = queue[0];
            queue.shift();
            inQueue[u] = false;

            this.relabel(u, h, residualGraph);
            this.push(u, e, h, queue, inQueue, residualGraph, source,destination);
        }

        return e[destination];
    }

    relabel(u: number, h: number[], residualGraph: DirectedGraph) {
        var minHeight: number = Number.MAX_VALUE;

        for(let v of residualGraph.adjacencyList[u]) {
            if (v.w > 0)
            {
                minHeight = Math.min(h[v.i], minHeight);
            }
        }

        h[u] = minHeight + 1;
    }

    push(u: number, e: number[], h: number[], queue: Array<number>, inQueue: boolean[], residualGraph: DirectedGraph, source: number, destination: number) {

        for(let v of residualGraph.adjacencyList[u]) {
            if (e[u] == 0)
                return;

            if (v.w > 0 && h[v.i] < h[u]) {
                var f: number = Math.min(e[u], v.w);

                v.w -= f;
                residualGraph.getEdge(v.i, u).w += f;

                e[u] -= f;
                e[v.i] += f;

                if (!inQueue[v.i] && v.i != source && v.i != destination) {
                    queue.push(v.i);
                    inQueue[v.i] = true;
                }
            }
        }

        if (e[u] != 0) {
            queue.push(u);
            inQueue[u] = true;
        }
    }

}