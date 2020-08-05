// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    startNode.distance = 0;
    startNode.totalDistance = 0;
    startNode.direction = "up";
    const unvisitedNodes = getAllNodes(grid);//  print out 
    //  let exploredNodes = { startNode: true };
    // var maxDistnce = 0;
    const distance = getDistance(startNode, finishNode);
    console.log(distance);
    while (!!unvisitedNodes.length) {

        /*
        if (closestNode.distance > maxDistnce && !closestNode.isVisited) {
            maxDistnce = closestNode.distance;
            visitedNodesInOrder.push(closestNode);
            //    console.log(closestNode.row);
            // console.log(finishNode.col)
        } else {

        }
        */
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
    // return visitedNodesInOrder;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
    //console.log(neighbors);

}
/*
function updateNeighbors2(node, grid) {
    const neighbors = getNeighbors2(node, grid);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        //   neighbor.previousNode = node;
    }
}
*/
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.unshift(grid[row - 1][col]); //working
    if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);

    // if (grid[row][col + 1]) neighbors.unshift(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.unshift(grid[row + 1][col]);

    // if (grid[row + 1] && grid[row + 1][col]) neighbors.unshift(grid[row + 1][col]);


    if (col > 0) neighbors.unshift(grid[row][col - 1]); //working

    //   console.log(neighbors);

    return neighbors;//.filter(neighbor => !neighbor.isVisited);
}
/*
function getNeighbors2(node, grid) {
    const neighbors = getNeighbors(node, grid);
    //    const neighbors = [];

    const { col, row } = node;

    if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);
    console.log(neighbors);

    return neighbors;
}
*/
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const col of row) {
            nodes.push(col);
        }
    }
    return nodes;
}
/*
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
*/

function getDistance(nodeOne, nodeTwo) {
    let currentCoordinates = nodeOne.id.split("-");
    let targetCoordinates = nodeTwo.id.split("-");
    let x1 = parseInt(currentCoordinates[0]);
    let y1 = parseInt(currentCoordinates[1]);
    let x2 = parseInt(targetCoordinates[0]);
    let y2 = parseInt(targetCoordinates[1]);
    console.log(x1);

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
            return [2, ["l", "f"], "right"];
        }
    }
}