import {connect} from "react-redux";
import SendPost from "./SendPost";
import * as Yup from "yup";
import {actions} from "../../../../redux/reducers/profileReducer";

const SendPostContainer = (props) => {
    const initialValue = {post: ""};

    const maxLength = 300;

    const validationSchema = Yup.object({
       post: Yup.string()
           .required("Text field is empty!")
           .max(maxLength, `Max characters is ${maxLength}`),
    });

    const onSubmit = (values, {resetForm}) => {
        let {post} = values;
        props.setNewPost(post);
        resetForm();
    }

    return <SendPost initialValue={initialValue}
                     onSubmit={onSubmit}
                     validationSchema={validationSchema}/>
}

export default connect(null, {
    setNewPost: actions.setNewPost
})(SendPostContainer);