export function simpleMaze(grid) {
    const wallsToAnimate = [];

    //   let currentIdY = grid.length - 10;
    /*
    for (let counter = 0; counter < 7; counter++) {
        //        let currentIdXOne = Math.floor(board.height / 2) - counter;
        //        let currentIdXTwo = Math.floor(board.height / 2) + counter;
        let currentIdXOne = Math.floor(grid[0].length / 2) - counter;
        let currentIdXTwo = Math.floor(grid[0].length / 2) + counter;
        let currentIdOne = `${currentIdXOne}-${currentIdY}`;
        let currentIdTwo = `${currentIdXTwo}-${currentIdY}`;
        let currentElementOne = document.getElementById(currentIdOne);
        let currentElementTwo = document.getElementById(currentIdTwo);
        //      board.wallsToAnimate.push(currentElementOne);
        //      board.wallsToAnimate.push(currentElementTwo);      
        wallsToAnimate.push(currentElementOne);
        wallsToAnimate.push(currentElementTwo);
        //       let currentNodeOne = board.nodes[currentIdOne];
        //       let currentNodeTwo = board.nodes[currentIdTwo];        
        //      let currentNodeOne = grid[currentIdXOne][currentIdY];
        //      let currentNodeTwo = grid[currentIdXTwo][currentIdY];
        //      currentNodeOne.status = "wall";
        //      currentNodeTwo.status = "wall";
        //     currentNodeOne.isWall = true;
        //     currentNodeTwo.isWall = true;

    }
    */

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


  //module.exports = simpleDemonstration;