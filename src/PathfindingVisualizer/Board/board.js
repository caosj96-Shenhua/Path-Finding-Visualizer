import React, { Component } from 'react';

const rowNumber = 25;
const colNumber = 40;

export function getInitialGrid() {
    const grid = [];
    for (let row = 0; row < rowNumber; row++) {
        const currentRow = [];
        for (let col = 0; col < colNumber; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}


export function createNode(col, row) {

    const START_NODE_ROW = 5;
    const START_NODE_COL = 5;
    const FINISH_NODE_ROW = 20;
    const FINISH_NODE_COL = 35;
    return {
        col,
        row,
        id: row + '-' + col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        direction: null,
        distance: Infinity,
        totalDistance: Infinity,
        heuristicDistance: null,
        weight: 0,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
}


export function getNewGridWithWalToggled(grid, row, col) {
    const newGrid = grid.slice(0);
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};


