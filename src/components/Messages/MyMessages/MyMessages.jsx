import React from 'react';
import classes from "../Messages.module.css";


const MyMessages = (props) => {
    return (
        <>
            {props.myMessage.map(mm =>
                <div className={classes.my_message_container} key={mm.id}>
                    <div className={classes.my_message}>{mm.message}
                        <sub className={classes.time}>{mm.time}</sub>
                    </div>
                </div>
            )}
        </>
    )
}

export default MyMessages;