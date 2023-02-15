import React, {useState} from 'react';
import Board from "./GameElements/Board";
import classes from "./Game.module.css";
import { calculateWinners } from "./GameElements/calculateWinners";

const Game = () => {
    const [history, setHistory] = useState({ squares: Array(9).fill(null) })
    const [xIsNext, setXIsNext] = useState(true)
    const [stepNumber, setStepNumber] = useState(0)

    const winner = calculateWinners(history.squares)

    const nextPlayer = xIsNext ? "X" : "O"

    const handleClick = (i) => {
        let squares = history.squares.slice(0, setStepNumber(stepNumber + 1))

        if (winner || squares[i]) return

        squares[i] = nextPlayer

        setHistory(squares.concat([
            {squares: squares}
        ]))
        setStepNumber(history.squares.length)
        setXIsNext(!xIsNext)
    }

    let status
    winner
        ? status = `Winner is: ${ winner }`
        : status = `Next player is: ${ nextPlayer }`


    const jumpTo = (step) => {
        debugger
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }

    const moves = history.squares.map((step, move) => {
        const desc = move
            ? `Go to move #${ move }`
            : "Go to game start"

        return (
            <li key={ move }>
                <button onClick={ () => jumpTo(move)}>{ desc }</button>
            </li>
        )
    })


    return (
        <div className={classes.game}>
            <div className={classes.game_board}>
                <Board squares={ history.squares } onClick={ (i) => handleClick(i) }/>
            </div>
            <div className={classes.game_info}>
                <div>{ status }</div>
                <ol>{ moves }</ol>
            </div>
        </div>
    );
};

export default Game;