export function simpleMaze(grid) {
    const wallsToAnimate = [];
    const unvisitedNodes = getAllNodes(grid);
    unvisitedNodes.sort(() => Math.random() - 0.5).splice(0, unvisitedNodes.length / 1.4);
    //   unvisitedNodes = unvisitedNodes.splice(0, unvisitedNodes.length / 2);

    while (unvisitedNodes.length) {
        const closestNode = unvisitedNodes.shift();
        if (!closestNode.isStart && !closestNode.isFinish) {
            closestNode.isWall = true;
            wallsToAnimate.push(closestNode);
        }
    }
    //   const halfArray = wallsToAnimate.splice(0, wallsToAnimate.length / 2)
    // wallsToAnimate.sort(() => Math.random() - 0.5);
    //   const halfArray = wallsToAnimate.splice(0, wallsToAnimate.length / 2);
    return wallsToAnimate;
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}