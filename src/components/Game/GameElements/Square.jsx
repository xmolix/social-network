import React, {useState} from 'react';
import classes from "../Game.module.css";

const Square = (props) => {
    // const [state, setState] = useState({value: null});

    return (
        <button className={classes.square} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
};

export default Square;