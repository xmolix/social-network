import React from 'react';
import {connect} from "react-redux";
import {setNewMessage} from "../../../redux/reducers/messagesReducer";
import * as Yup from "yup";
import SendMessage from "./SendMessage";

const SendMessageContainer = (props) => {
    const initialValue = {message: ""};

    const validationSchema = Yup.object({
        message: Yup.string().required("Text field is empty!")
    });

    const onSubmit = (values, {resetForm}) => {
        let {message} = values;
        props.setNewMessage(message);
        resetForm();
    }

    return (
        <SendMessage initialValue={initialValue}
                     validationSchema={validationSchema}
                     onSubmit={onSubmit}/>
    )
}

export default connect(null, {setNewMessage})(SendMessageContainer)