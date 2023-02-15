import React from 'react';
import classes from "./Switch.module.css";

const Switch = (props) => {
    const {field, form, meta, search, setSearch, onSwitchTumbler} = props;

    return (
        <>
            <input id={"react_switch_new"}
                   className={classes.switch_checkbox}
                   type={"checkbox"} checked={search}
                   onClick={onSwitchTumbler} onChange={() => setSearch(!search)}/>
            <label className={`${classes.switch_label} ${search && classes.switch_true}`}
                   htmlFor={"react_switch_new"}>
                <span className={classes.switch_button}/>
                <span className={`${classes.switch_status} ${classes.switch_yes}`}>Yes</span>
                <span className={`${classes.switch_status} ${classes.switch_no}`}>No</span>
            </label>
        </>
    );
};

export default Switch;