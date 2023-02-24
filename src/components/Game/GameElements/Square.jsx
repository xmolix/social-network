import React from 'react';
import classes from "../Game.module.css";

export const Square = ({ value, onSquareClick }) => (
    <button className={classes.square} onClick={onSquareClick}>
        {value}
    </button>
)