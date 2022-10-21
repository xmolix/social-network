import React, {memo} from 'react';
import classes from "../../Profile.module.css";
import {useEffect, useState} from "react";

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const cursor = props.isOwner ? classes.active_status : "";
    const active = editMode === true ? classes.white : "";
    const isOwnerStatus = props.isOwner ? classes.owner_status : classes.other_user_status;

    return (
        <div className={`${classes.status} ${isOwnerStatus} ${cursor} ${active}`}>
            {!editMode &&
                <div className={classes.status_content}
                     onDoubleClick={activateEditMode}
                     title={props.isOwner ? "Double click to change status!" : null}>
                    <div><span>STATUS: </span>{props.status}</div>
                </div>
            }
            {editMode &&
                <div className={classes.status_content} onBlur={deactivateEditMode}>
                    <span>STATUS: </span>
                    <input type="text" onChange={onStatusChange} maxLength={300}
                           autoFocus={true} value={status}/>
                </div>
            }
        </div>
    )
}

export default memo(ProfileStatus);