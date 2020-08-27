export function greedy(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    startNode.distance = 0;
    startNode.totalDistance = 0;
    // startNode.direction = "up";
    startNode.direction = "right";
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
/*
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
*/
function closestNodefunc(unvisitedNodes) {
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (!currentClosest || currentClosest.distance > unvisitedNodes[i].distance) {
            currentClosest = unvisitedNodes[i];
            index = i;
        }
        /*else if (currentClosest.totalDistance === unvisitedNodes[i].totalDistance) {
            if (currentClosest.heuristicDistance > unvisitedNodes[i].heuristicDistance) {
                currentClosest = unvisitedNodes[i];
                index = i;
            }
        }
        */
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
            //  let distanceToCompare;
            let distanceToCompare = manhattanDistance(neighbor, finishNode) + distance[0];//need to reset distance

            //     if (!neighbor.heuristicDistance) neighbor.heuristicDistance = manhattanDistance(neighbor, finishNode);
            if (distanceToCompare < neighbor.distance) {
                neighbor.distance = distanceToCompare;
                //      neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;
                neighbor.previousNode = node;
                neighbor.path = distance[1];
                neighbor.direction = distance[2];
            }
        }
    }
}


/*
function updateNeighbors(grid, node, finishNode) {
    let neighbors = getUnvisitedNeighbors(node, grid);
    for (let neighbor of neighbors) {
        if (finishNode) {
            updateNode(node, neighbor, finishNode);
        } else {
            updateNode(node, neighbor);
        }
    }
}

function updateNode(currentNode, targetNode, actualTargetNode) {
    let distance = getDistance(currentNode, targetNode);
    // let distanceToCompare;
    //  if (actualTargetNode && name === "CLA") {
    //    let weight = targetNode.weight === 15 ? 15 : 1;
    //    if (heuristic === "manhattanDistance") {
    //    distanceToCompare = currentNode.distance + (distance[0] + weight) * manhattanDistance(targetNode, actualTargetNode);
    //    distanceToCompare = currentNode.distance + targetNode.weight + distance[0] + Math.pow(manhattanDistance(targetNode, actualTargetNode), 2);
    //    distanceToCompare = currentNode.distance + (distance[0] + weight) * Math.pow(manhattanDistance(targetNode, actualTargetNode), 7);
    //    }
    //    let startNodeManhattanDistance = manhattanDistance(actualStartNode, actualTargetNode);
    //  } else if (actualTargetNode && name === "greedy") {
    let distanceToCompare = distance[0] + manhattanDistance(targetNode, actualTargetNode);
    //  } else {
    //    distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
    //  }
    if (distanceToCompare < targetNode.distance) {
        targetNode.distance = distanceToCompare;
        targetNode.previousNode = currentNode.id;
        targetNode.path = distance[1];
        targetNode.direction = distance[2];
    }
}

*/
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
export function getNodesInShortestGreedy(finishNode) {
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