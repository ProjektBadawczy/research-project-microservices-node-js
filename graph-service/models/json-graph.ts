import { Graph } from './graph';
import { DirectedGraph } from './directed-graph';

export class JsonGraph {
    constructor(
        public graph: Graph,
        public directedGraph: DirectedGraph
    ) {}
}