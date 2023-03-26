import { Service } from "typedi";
import * as fs from "fs";
import {JsonGraph} from "../models/json-graph";
import {Graph} from "../models/graph";
import {DirectedGraph} from "../models/directed-graph";

@Service()
class GraphService {

    private graphs: JsonGraph[] = [];

    constructor() {
        fs.readFile('./resources/random_set.json', 'utf8',(err, data) => {
            if (err) throw err;
            this.graphs = JSON.parse(data);
        });
    }

    getGraph(id: number): Graph | null {
        let graph = this.graphs.find(graph => graph.graph.id == id)
        if(graph != undefined){
            return graph.graph
        }
        return null
    };

    getDirectedGraph(id: number): DirectedGraph | null {
        let graph = this.graphs.find(graph => graph.directedGraph.id == id)
        if(graph != undefined){
            return graph.directedGraph
        }
        return null
    }
}

export default GraphService