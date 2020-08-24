import React, { Component } from 'react';

const rowNumber = 25;
const colNumber = 40;

export function getInitialGrid(height, width) {
    const grid = [];
    for (let row = 0; row < height; row++) {
        const currentRow = [];
        for (let col = 0; col < width; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}


export function createNode(col, row) {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    let height = Math.floor(vh / 28) - 8;
    let width = Math.floor(vw / 25);
    const START_NODE_ROW = 5;
    const START_NODE_COL = 5;
    //   const FINISH_NODE_ROW = 20;
    //   const FINISH_NODE_COL = 35; 
    const FINISH_NODE_ROW = height - 6;
    const FINISH_NODE_COL = width - 6;

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

export function getNewGridWithStartToggled(grid, row, col) {
    const newGrid = grid.slice(0);
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isStart: !node.isStart,
    };
    newGrid[row][col] = newNode;
    return newGrid;

}


