import {Field, Form, Formik} from "formik";
import classes from "../../Profile.module.css";
import Textarea from "../../../../formik/Textarea/Textarea";


const SendPost = ({initialValue, onSubmit, validationSchema}) => {
    return (
        <Formik initialValues={initialValue}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            <Form className={classes.post_form}>
                <Field name={"post"}
                       children={(props) => <Textarea placeholder={"Enter the post..."}
                                                      {...props}/>}
                />
                <button className={"send_btn"} type={"submit"}>&#5167;</button>
            </Form>
        </Formik>
    )
}

export default SendPost;