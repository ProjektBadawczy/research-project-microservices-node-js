export class GraphForBfs {
    constructor(
        public id: number,
        public numberOfVertices: number,
        public adjacencyMatrix: number [][],
        public source: number,
        public destination: number
    ) {}
}