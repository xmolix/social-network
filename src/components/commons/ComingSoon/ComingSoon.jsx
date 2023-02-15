import React from 'react';
import classes from "./ComingSoon.module.css";

const ComingSoon = () => {
    document.title = "Social Network - Coming Soon";

    return (
        <div className={classes.coming_soon_container}>
            <div className={classes.coming_soon}>Coming Soon...</div>
        </div>
    );
};

export default ComingSoon;