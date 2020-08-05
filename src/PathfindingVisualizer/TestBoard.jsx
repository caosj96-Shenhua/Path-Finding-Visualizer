import { Board } from './Board/BoardTest';
import React, { Component } from 'react';


export default class TestBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }



    render() {
        const { grid } = this.state;
        return (
            <div className="grid">


            </div>


        );
    }
}