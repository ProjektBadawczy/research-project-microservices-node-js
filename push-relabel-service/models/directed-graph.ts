import { Vertex } from './vertex';

export class DirectedGraph {
    public adjacencyList: Array<Array<Vertex>> = new Array<Array<Vertex>>();
    constructor(
        public id: number,
        public numberOfVertices: number,
    ) {
        for(var i=0; i< numberOfVertices; i++){
            this.adjacencyList.push(new Array<Vertex>())
        }
    }

    addEdge(u: number, v:number, weight: number) {
        this.adjacencyList[u].push(new Vertex(v, weight))
    }

    hasEdge(u:number, v:number): boolean {
        if (u >= this.numberOfVertices) {
            return false;
        }

        for(let vertex of this.adjacencyList[u]) {
            if (vertex.i == v) {
                return true;
            }
        }
        return false;
    }

    getEdge(u: number, v:number): Vertex {
        for(let vertex of this.adjacencyList[u]) {
            if (vertex.i == v) {
                return vertex;
            }
        }
        return new Vertex(0,0)
    }
}