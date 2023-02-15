import React from 'react';
import Square from "./Square";
import classes from "../Game.module.css";

const Board = ({ squares, onClick }) => {
    // const [squares, setSquares] = useState(Array(9).fill(null))
    // const [xIsNext, setXIsNext] = useState(true)

    // const nextPlayer = xIsNext ? "X" : "O"
    // const winner = calculateWinners(squares)

    const renderSquare = (i) => {
        return <Square value={ squares[i] } onClick={ () => onClick(i) }/>
    }
    //
    // const handleClick = (i) => {
    //     const square = squares.slice()
    //     if (winner || square[i]) return
    //
    //     square[i] = nextPlayer
    //
    //     setSquares(square)
    //     setXIsNext(!xIsNext)
    // }
    //
    // let status
    // winner
    //     ? status = `Winner is: ${winner}`
    //     : status = `Next player is: ${nextPlayer}`

    return (
        <div>
            {/*<div className={classes.status}>{status}</div>*/}
            <div className={classes.board_row}>
                { renderSquare(0) }
                { renderSquare(1) }
                { renderSquare(2) }
            </div>
            <div className={classes.board_row}>
                { renderSquare(3) }
                { renderSquare(4) }
                { renderSquare(5) }
            </div>
            <div className={classes.board_row}>
                { renderSquare(6) }
                { renderSquare(7) }
                { renderSquare(8) }
            </div>
        </div>
    );
};

export default Board;