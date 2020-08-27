import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/Dijkstra';
import { dfs } from '../Algorithms/Dfs';
import { astar, getNodesInShortestAstar } from '../Algorithms/astar';
import { bfs } from '../Algorithms/Bfs';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { getInitialGrid, getNewGridWithWalToggled } from './Board/board';
import './PathfindingVisualizer.css';
import { simpleMaze } from '../Maze/simpleMaze';
import { recursiveMaze } from '../Maze/recursiveMaze';
import { horizontalMaze } from '../Maze/horizontalMaze';
import { verticalMaze } from '../Maze/verticalMaze';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import RangeSlider from 'react-bootstrap-range-slider';


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const height = Math.floor(vh / 28) - 8;
const width = Math.floor(vw / 25);
const START_NODE_ROW = 5;//10;
const START_NODE_COL = 5;//15;
const FINISH_NODE_ROW = height - 6;
const FINISH_NODE_COL = width - 6;
//const VISIT_SPEED = 10;
const PATH_SPEED = 30;

//const height = 25;
//const width = 40;


export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            START_NODE_ROW: 5,
            START_NODE_COL: 5,
            mouseIsPressed: false,
            VISIT_SPEED: 10,
            PATH_SPEED: 30,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid(height, width);
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
        for (let i = 0; i < visitedNodesInOrder.length - 1; i++) {
            const node = visitedNodesInOrder[i];
            if (i == 0) {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-visit-start';
            }
            else if (i > 0) {
                setTimeout(() => {
                    document.getElementById(`${node.row}-${node.col}`).className =
                        'node node-visited';
                }, this.state.VISIT_SPEED * i);
            }
            if (i === visitedNodesInOrder.length - 2) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, this.state.VISIT_SPEED * i);
                return;
            }
        }
    }

    animateAstar(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i < visitedNodesInOrder.length - 1; i++) {
            const node = visitedNodesInOrder[i];
            if (i == 0) {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-visit-start';
            }
            else if (i > 0) {
                ///     else if (i >= 1 && i < nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    document.getElementById(`${node.row}-${node.col}`).className =
                        'node node-visited';
                }, this.state.VISIT_SPEED * i);
            }
            /*
            else if (i == nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    document.getElementById(`${node.row}-${node.col}`).className =
                        'node node-visit-finish';
                }, 10 * i);
            }
            */
            if (i == visitedNodesInOrder.length - 2) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, this.state.VISIT_SPEED * i);
                return;
            }
            if (node.isVisited) {
                console.log("find");
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
            }, this.state.VISIT_SPEED * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            const node = nodesInShortestPathOrder[i];
            if (i == 0) {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-Real-start';
            }
            else if (i >= 1 && i < nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    document.getElementById(`${node.row}-${node.col}`).className =
                        'node node-shortest-path';
                }, PATH_SPEED * i);
            }
            else {// if (i == nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    document.getElementById(`${node.row}-${node.col}`).className =
                        'node node-Real-finish';
                }, PATH_SPEED * i);
            }
        }
    }

    animateMaze(wallsToAnimate) {
        for (let i = 0; i < wallsToAnimate.length; i++) {
            const node = wallsToAnimate[i];
            setTimeout(() => {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'node node-wall';
            }, this.state.VISIT_SPEED * i);
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

    visualizeMaze() {
        const { grid } = this.state;
        const wallsToAnimate = simpleMaze(grid);
        this.animateMaze(wallsToAnimate);
    }

    visualizeRecursiveMaze() {
        const { grid } = this.state;
        const wallsToAnimate = [];
        const surroundingWalls = false;
        const orientation = "horizontal";
        const wallAnimate = recursiveMaze(grid, 2, grid.length - 3, 2, grid[0].length - 3, orientation, surroundingWalls, wallsToAnimate);
        this.animateMaze(wallAnimate);
    }

    visualizeHorizontalMaze() {
        const { grid } = this.state;
        const wallsToAnimate = [];
        const surroundingWalls = false;
        const orientation = "horizontal";
        const wallAnimate = horizontalMaze(grid, 2, grid.length - 3, 2, grid[0].length - 3, orientation, surroundingWalls, wallsToAnimate);
        this.animateMaze(wallAnimate);
    }

    visualizeVerticalMaze() {
        const { grid } = this.state;
        const wallsToAnimate = [];
        const surroundingWalls = false;
        const orientation = "vertical";
        const wallAnimate = verticalMaze(grid, 2, grid.length - 3, 2, grid[0].length - 3, orientation, surroundingWalls, wallsToAnimate);
        this.animateMaze(wallAnimate);
    }

    //  export function recursiveMaze(grid, rowStart, rowEnd, colStart, colEnd, surroundingWalls, wallsToAnimate) {


    clearPath() {
        const { grid } = this.state;

        for (const row of grid) {
            for (const col of row) {
                col.isVisited = false;
                col.distance = Infinity;
                col.totalDistance = Infinity;
                col.heuristicDistance = null;
                col.direction = null;
                col.previousNode = null;
                //      if (!col.isStart && !col.isFinish && !col.isWall) {
                document.getElementById(`${col.row}-${col.col}`).className =
                    'node node-unvisited';
                //     }
                if (col.isStart) {
                    document.getElementById(`${col.row}-${col.col}`).className =
                        'node node-start';
                }
                if (col.isFinish) {
                    document.getElementById(`${col.row}-${col.col}`).className =
                        'node node-finish';
                }
                if (col.isWall) {
                    document.getElementById(`${col.row}-${col.col}`).className =
                        'node node-wall';
                }
            }
        }

    }

    clearWall() {
        const { grid } = this.state;
        for (const row of grid) {
            for (const col of row) {
                if (col.isWall) {
                    //  console.log("find");
                    col.isWall = false;
                    document.getElementById(`${col.row}-${col.col}`).className =
                        'node node-unvisited';
                }
            }
        }
        // grid.height
    }

    clearBoard() {
        this.clearPath();
        this.clearWall();
    }

    getAllNodes(grid) {
        const nodes = [];
        for (const row of grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }



    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                {/* 
                <Navbar bg="dark" variant="dark">

                    <Navbar.Brand href="#home" onClick={() => window.location.reload()}>PathfindingVisualizer</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            <Button variant="primary" size='sm' onClick={() => { this.visualizeDijkstra() }}>Visualize Dijkstra's Algorithm
                            </Button>
                            <Button variant="primary" onClick={() => this.visualizeDijkstra()}>Visualize BFS's Algorithm
                            </Button>
                            <Button variant="primary" onClick={() => this.visualizeAstar()}>Visualize Astar's Algorithm
                            </Button>
                            <Button variant="primary" onClick={() => this.visualizeMaze()}>Add Random Maze
                            </Button>
                            <Button variant="primary" onClick={() => this.visualizeRecursiveMaze()}>Add Recursive Maze
                            </Button>
                            <Button variant="primary" onClick={() => this.visualizeVerticalMaze()}>Add Vertical Maze
                            </Button>
                            <Button variant="primary" onClick={() => this.visualizeHorizontalMaze()}>Add Horizontal Maze
                            </Button>
                            <Button variant="success" onClick={() => this.clearBoard()} > Generate New Board</Button>
                            <Button variant="success" onClick={() => this.clearPath()} > Clear Path</Button>
                            <Button variant="success" onClick={() => this.clearWall()} > Clear Wall</Button>

                        </Nav>


                    </Navbar.Collapse>

                </Navbar>
                */}

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand className="brandStyle" href="#home" onClick={() => window.location.reload()}>PathfindingVisualizer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => { this.visualizeDijkstra() }}>Visualize Dijkstra's Algorithm</Nav.Link>
                            <Nav.Link onClick={() => { this.visualizeDijkstra() }}>Visualize BFS's Algorithm</Nav.Link>
                            <Nav.Link onClick={() => { this.visualizeAstar() }}>Visualize Astar's Algorithm</Nav.Link>
                            <NavDropdown title="Maze" id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={() => this.visualizeMaze()}>Add Random Maze</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.visualizeRecursiveMaze()}>Add Recursive Maze</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.visualizeVerticalMaze()}>Add Vertical Maze</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.visualizeHorizontalMaze()}>Add Horizontal Maze</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link eventKey="disabled" disabled>   Animation Speed(ms)</Nav.Link>
                            <Nav.Link eventKey="disabled" disabled>FAST</Nav.Link>


                            <RangeSlider className="speed-slider"
                                value={this.state.VISIT_SPEED}
                                min={1}
                                max={20}
                                step={1}
                                tooltipPlacement='bottom'
                                tooltip={false}
                                reverse={true}

                                size='sm'
                                onChange={changeEvent => this.setState({ VISIT_SPEED: changeEvent.target.value })}>
                            </RangeSlider>
                            <Nav.Link eventKey="disabled" disabled> SLOW</Nav.Link>

                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => this.clearPath()} > Clear Path</Nav.Link>
                            <Nav.Link onClick={() => this.clearWall()} > Clear Wall</Nav.Link>

                        </Nav>


                    </Navbar.Collapse>
                </Navbar>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
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