export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    startNode.distance = 0;
    startNode.totalDistance = 0;
    startNode.direction = "up";
    const unvisitedNodes = getAllNodes(grid);

    while (!!unvisitedNodes.length) {

        var closestNode = closestNodefunc(unvisitedNodes)
        //   if (closestNode.isWall) continue;

        while (closestNode.isWall && unvisitedNodes.length) {
            closestNode = closestNodefunc(unvisitedNodes)
        }
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateNeighbors(grid, closestNode, finishNode)
    }
}

function closestNodefunc(unvisitedNodes) {
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (!currentClosest || currentClosest.totalDistance > unvisitedNodes[i].totalDistance) {
            currentClosest = unvisitedNodes[i];
            index = i;
        } else if (currentClosest.totalDistance === unvisitedNodes[i].totalDistance) {
            if (currentClosest.heuristicDistance > unvisitedNodes[i].heuristicDistance) {
                currentClosest = unvisitedNodes[i];
                index = i;
            }
        }
    }
    unvisitedNodes.splice(index, 1);
    return currentClosest;
}

/*
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    // console.log(unvisitedNeighbors);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
    //console.log(neighbors);
}
*/

function updateNeighbors(grid, node, finishNode) {
    let neighbors = getUnvisitedNeighbors(node, grid);
    for (let neighbor of neighbors) {
        if (finishNode) {
            let distance = getDistance(node, neighbor);
            if (!neighbor.heuristicDistance) neighbor.heuristicDistance = manhattanDistance(neighbor, finishNode);
            let distanceToCompare = node.distance + /*neighbor.weightweight*/ + distance[0];//need to reset distance
            if (distanceToCompare < neighbor.distance) {
                neighbor.distance = distanceToCompare;
                neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;
                neighbor.previousNode = node;
                neighbor.path = distance[1];
                neighbor.direction = distance[2];
            }
        }
    }
}



function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.unshift(grid[row - 1][col]); //working
    if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.unshift(grid[row + 1][col]);
    if (col > 0) neighbors.unshift(grid[row][col - 1]); //working

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const col of row) {
            nodes.push(col);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
export function getNodesInShortestAstar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}


function getDistance(nodeOne, nodeTwo) {
    let currentCoordinates = nodeOne.id.split("-");
    let targetCoordinates = nodeTwo.id.split("-");
    let x1 = parseInt(currentCoordinates[0]);
    let y1 = parseInt(currentCoordinates[1]);
    let x2 = parseInt(targetCoordinates[0]);
    let y2 = parseInt(targetCoordinates[1]);

    if (x2 < x1) {
        if (nodeOne.direction === "up") {
            return [1, ["f"], "up"];
        } else if (nodeOne.direction === "right") {
            return [2, ["l", "f"], "up"];
        } else if (nodeOne.direction === "left") {
            return [2, ["r", "f"], "up"];
        } else if (nodeOne.direction === "down") {
            return [3, ["r", "r", "f"], "up"];
        }
    } else if (x2 > x1) {
        if (nodeOne.direction === "up") {
            return [3, ["r", "r", "f"], "down"];
        } else if (nodeOne.direction === "right") {
            return [2, ["r", "f"], "down"];
        } else if (nodeOne.direction === "left") {
            return [2, ["l", "f"], "down"];
        } else if (nodeOne.direction === "down") {
            return [1, ["f"], "down"];
        }
    }
    if (y2 < y1) {
        if (nodeOne.direction === "up") {
            return [2, ["l", "f"], "left"];
        } else if (nodeOne.direction === "right") {
            return [3, ["l", "l", "f"], "left"];
        } else if (nodeOne.direction === "left") {
            return [1, ["f"], "left"];
        } else if (nodeOne.direction === "down") {
            return [2, ["r", "f"], "left"];
        }
    } else if (y2 > y1) {
        if (nodeOne.direction === "up") {
            return [2, ["r", "f"], "right"];
        } else if (nodeOne.direction === "right") {
            return [1, ["f"], "right"];
        } else if (nodeOne.direction === "left") {
            return [3, ["r", "r", "f"], "right"];
        } else if (nodeOne.direction === "down") {
            return [2, ["l", "k"], "right"];
        }
    }
}


function manhattanDistance(nodeOne, nodeTwo) {
    let nodeOneCoordinates = nodeOne.id.split("-").map(ele => parseInt(ele));
    let nodeTwoCoordinates = nodeTwo.id.split("-").map(ele => parseInt(ele));
    let xOne = nodeOneCoordinates[0];
    let xTwo = nodeTwoCoordinates[0];
    let yOne = nodeOneCoordinates[1];
    let yTwo = nodeTwoCoordinates[1];

    let xChange = Math.abs(xOne - xTwo);
    let yChange = Math.abs(yOne - yTwo);

    return (xChange + yChange);
}