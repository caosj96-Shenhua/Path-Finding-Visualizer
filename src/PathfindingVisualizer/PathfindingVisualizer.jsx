import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/Dijkstra';
import { dfs } from '../Algorithms/Dfs';
import { astar, getNodesInShortestAstar } from '../Algorithms/astar';
import { bfs } from '../Algorithms/Bfs';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { getInitialGrid, getNewGridWithWalToggled, createNode } from './Board/board';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 5;//10;
const START_NODE_COL = 5;//15;
const FINISH_NODE_ROW = 20; //10;
const FINISH_NODE_COL = 35;//35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }


    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWalToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWalToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 1; i < visitedNodesInOrder.length - 1; i++) {
            if (i === visitedNodesInOrder.length - 2) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            const node = visitedNodesInOrder[i];
            setTimeout(() => {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-visited';
                //    this.setState({ grid: newGrid });
            }, 10 * i);
        }
    }

    animateAstar(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 1; i < visitedNodesInOrder.length - 1; i++) {
            const node = visitedNodesInOrder[i];


            setTimeout(() => {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
            if (i === visitedNodesInOrder.length - 2) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
        }
    }
    animateDfs(visitedNodesInOrder/*, nodesInShortestPathOrder*/) {
        //console.log(visitedNodesInOrder.length);
        for (let i = 1; i < visitedNodesInOrder.length - 1; i++) {
            const node = visitedNodesInOrder[i];
            setTimeout(() => {

                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-visited';
                //    this.setState({ grid: newGrid });
            }, 10 * i);
        }
    }
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDfs() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        //  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDfs(visitedNodesInOrder/*, nodesInShortestPathOrder*/);
    }

    visualizeAstar() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = astar(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestAstar(finishNode);
        this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
    }


    clearPath() {
        const grid = getInitialGrid();
        this.setState({ grid });

        const nodes = [];
        for (const row of grid) {
            for (const col of row) {
                //      nodes.push(col);
                col.isVisited = false;
                col.distance = Infinity;
            }
        }
        return nodes;

    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
            </button>
                <button onClick={() => this.visualizeDfs()}>
                    Visualize DFS's Algorithm
            </button>
                <button onClick={() => this.visualizeAstar()}>
                    Visualize Astar's Algorithm
            </button>
                <button onClick={() => this.clearPath()}>
                    Clear Path
            </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall, isVisited, id } = node;
                                    return (
                                        <Node
                                            // id={row + col}
                                            key={nodeIdx}
                                            col={col}
                                            row={row}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                        //      isVisited={isVisited}
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

//getInitialGrid();
//createNode();
//getNewGridWithWalToggled();

/*
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};


const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};


const getNewGridWithWalToggled = (gird, row, col) => {
    const newGrid = gird.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
*/