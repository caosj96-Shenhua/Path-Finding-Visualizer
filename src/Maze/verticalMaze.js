export function verticalMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, wallsToAnimate) {
    // const wallsToAnimate = [];

    if (rowEnd < rowStart || colEnd < colStart) {
        return wallsToAnimate;
    }

    if (!surroundingWalls) {
        const unvisitedNodes = getAllNodes(grid);
        while (unvisitedNodes.length) {
            const closestNode = unvisitedNodes.shift();
            const r = parseInt(closestNode.id.split("-")[0]);
            const c = parseInt(closestNode.id.split("-")[1]);
            if (r === 0 || c === 0 || c === grid[0].length - 1 || r === grid.length - 1) {
                //   let currentNode = document.getElementById(closestNode);
                //   wallsToAnimate.push(currentNode);
                closestNode.isWall = true;
                wallsToAnimate.push(closestNode);
            }


        }
        surroundingWalls = true;
    }
    if (orientation === "horizontal") {
        const possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        const possibleCols = [];
        for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
            possibleCols.push(number);
        }
        const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        const randomColIndex = Math.floor(Math.random() * possibleCols.length);
        //    const randomColIndex2 = Math.floor(Math.random() * possibleRows.length);
        const currentRow = possibleRows[randomRowIndex];
        const colRandom = possibleCols[randomColIndex];
        //    const colRandom2 = possibleCols[randomColIndex2];
        const unvisitedNodes = getAllNodes(grid);
        while (unvisitedNodes.length) {
            const closestNode = unvisitedNodes.shift();
            const r = parseInt(closestNode.id.split("-")[0]);
            const c = parseInt(closestNode.id.split("-")[1]);
            if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
                if (!closestNode.isStart && !closestNode.isFinish) {
                    closestNode.isWall = true;
                    wallsToAnimate.push(closestNode);
                }

            }
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            verticalMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, wallsToAnimate);
        } else {
            verticalMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls, wallsToAnimate)
        }
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            verticalMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, wallsToAnimate);
        } else {
            verticalMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, wallsToAnimate);
        }
    } else {// if (orientation === "vertical") {
        const possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        const possibleRows = [];
        for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
        }
        const randomColIndex = Math.floor(Math.random() * possibleCols.length);
        const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        const currentCol = possibleCols[randomColIndex];
        const rowRandom = possibleRows[randomRowIndex];
        const unvisitedNodes = getAllNodes(grid);
        while (unvisitedNodes.length) {
            const closestNode = unvisitedNodes.shift();
            const r = parseInt(closestNode.id.split("-")[0]);
            const c = parseInt(closestNode.id.split("-")[1]);
            if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
                if (!closestNode.isStart && !closestNode.isFinish) {
                    closestNode.isWall = true;
                    wallsToAnimate.push(closestNode);
                }
            }
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            verticalMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "vertical", surroundingWalls, wallsToAnimate);
        } else {
            verticalMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, wallsToAnimate);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            verticalMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls, wallsToAnimate);
        } else {
            verticalMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, wallsToAnimate);
        }
    }

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