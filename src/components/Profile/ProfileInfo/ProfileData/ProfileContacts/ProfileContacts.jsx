import React from "react";
import classes from "../../../Profile.module.css";

const ProfileContacts = ({title, contact}) => {
    return (
        <div className={classes.data_contacts}>
            <b>{title}: </b> {contact}
        </div>
    );
};

export default ProfileContacts;