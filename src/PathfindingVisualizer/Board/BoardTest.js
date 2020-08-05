const Node = require("../Node/NodeTest");

function Board(/*height, width*/) {
    this.height = 100;
    this.width = 100;
    this.start = null;
    this.target = null;
    this.object = null;
    this.boardArray = [];
    this.nodes = {};
    this.nodesToAnimate = [];
    //   this.objectNodesToAnimate = [];
    //   this.shortestPathNodesToAnimate = [];
    //    this.objectShortestPathNodesToAnimate = [];
    this.wallsToAnimate = [];
    //    this.mouseDown = false;
    this.pressedNodeStatus = "normal";
    this.previouslyPressedNodeStatus = null;
    this.previouslySwitchedNode = null;
    this.previouslySwitchedNodeWeight = 0;
    this.keyDown = false;
    this.algoDone = false;
    //    this.currentAlgorithm = null;
    //    this.currentHeuristic = null;
    //    this.numberOfObjects = 0;
    //    this.isObject = false;
    //    this.buttonsOn = false;
    this.speed = "fast";
}

Board.prototype.initialise = function () {
    this.createGrid();
    //    this.addEventListeners();
    //   this.toggleTutorialButtons();
};

Board.prototype.createGrid = function () {
    let tableHTML = "";
    for (let r = 0; r < this.height; r++) {
        let currentArrayRow = [];
        let currentHTMLRow = `<tr id="row ${r}">`;
        for (let c = 0; c < this.width; c++) {
            let newNodeId = `${r}-${c}`, newNodeClass, newNode;
            if (r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)) {
                newNodeClass = "start";
                this.start = `${newNodeId}`;
            } else if (r === Math.floor(this.height / 2) && c === Math.floor(3 * this.width / 4)) {
                newNodeClass = "target";
                this.target = `${newNodeId}`;
            } else {
                newNodeClass = "unvisited";
            }
            newNode = new Node(newNodeId, newNodeClass);
            currentArrayRow.push(newNode);
            currentHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`;
            this.nodes[`${newNodeId}`] = newNode;
        }
        this.boardArray.push(currentArrayRow);
        tableHTML += `${currentHTMLRow}</tr>`;
    }
    let board = document.getElementById("board");
    //  board.innerHTML = tableHTML;
};

Board.prototype.getNode = function (id) {
    let coordinates = id.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);
    return this.boardArray[r][c];
};

let height = 100;//Math.floor(($(document).height()) / 28);
let width = 100;//Math.floor($(document).width() / 25);
let newBoard = new Board(height, width)
newBoard.initialise();