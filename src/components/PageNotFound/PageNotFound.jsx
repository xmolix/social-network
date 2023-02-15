import React from 'react';
import classes from "./PageNotFound.module.css";

const PageNotFound = () => {
    document.title = "Social Network - Page Not Found";

    return (
        <div className={classes.png_container}>
            <div className={classes.png}>404 Page Not Found...</div>
        </div>
    );
};

export default PageNotFound;