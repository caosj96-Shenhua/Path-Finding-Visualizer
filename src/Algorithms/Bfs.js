// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);//  print out 
    console.log(unvisitedNodes[startNode.id]);
    var maxDistnce = 0;

    while (!!unvisitedNodes.length) {

        sortNodesByDistance(unvisitedNodes);

        const closestNode = unvisitedNodes.shift();//.shift();
        //  console.log(closestNode);
        if (closestNode.distance > maxDistnce && !closestNode.isVisited) {
            maxDistnce = closestNode.distance;
            visitedNodesInOrder.push(closestNode);
            //    console.log(closestNode.row);
            // console.log(finishNode.col)
        } else {

        }
        /*
        else {
            const closestNode = unvisitedNodes.shift();
            visitedNodesInOrder.push(closestNode);

        }
        */
        //   const distance = closestNode.distance;
        // if(closestNode.getNeighbors )
        //   console.log(getUnvisitedNeighbors(node, grid));

        // If we encounter a wall, we skip it.
        //    if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        //   if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;

        if (closestNode.row === finishNode.row && closestNode.col === finishNode.col) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
        //    visitedNodesInOrder.push(closestNode);
        //    }
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
        for (const node of row) {
            nodes.push(node);
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