import classes from "../Messages.module.css";
import {Field, Form, Formik} from "formik";
import Textarea from "../../../formik/Textarea/Textarea";

const SendMessage = ({initialValue, validationSchema, onSubmit}) => {
    return (
        <Formik initialValues={initialValue}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            <Form className={classes.message_form}>
                <Field name={"message"}
                       children={(props) => <Textarea placeholder={"Enter the message..."}
                                                                       {...props}/>}/>
                <button className={"send_btn"} type={"submit"}>&#5169;</button>
            </Form>
        </Formik>
    )
}

export default SendMessage;
