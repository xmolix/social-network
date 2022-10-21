import React from 'react';
import ProfileContacts from "./ProfileContacts/ProfileContacts";
import classes from "../../Profile.module.css";

const ProfileData = (
    {jobSearch, jobDescription, contacts, isOwner, editProfile}
) => {
    return (
        <>
            <div className={classes.data_search}>
                <b className={classes.data_name}>Looking for a job:</b> {jobSearch ? "Yes" : "No"}
            </div>

            {jobSearch &&
                <div className={classes.data_description}>
                    <b className={classes.data_name}>My professional skills:</b>
                    <div className={classes.data_description_content}>{jobDescription}</div>
                </div>
            }

            <div className={classes.data_contacts_block}>
                <b className={classes.data_name}>Contacts:</b>
                {Object.keys(contacts).map((key, index) =>
                    <ProfileContacts key={index} title={key[0].toUpperCase() + key.substring(1)}
                                     contact={contacts[key]}/>
                )}
            </div>

            {isOwner &&
                <button className={`${classes.data_edit_btn} ${classes.edit}`}
                        onClick={() => {editProfile(true)}}/>
            }
        </>
    );
};

export default ProfileData;