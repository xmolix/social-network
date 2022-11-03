import React from 'react';
import classes from "./Loading.module.css";
import loading from "../../../img/loading.svg";

const Loading = () => {
    return (
        <div className={classes.container}>
            <img className={classes.loading} src={loading} alt={"learn react"}/>
        </div>
    )
}

export default Loading;