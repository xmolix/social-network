import classes from "./Input.module.css";
import formikStyle from "../formik.module.css";

const Input = (props) => {
    const {field, form, meta, placeholder, type, classError} = props;

    let error, field_style;
    if (classError === "loginError") {
        error = classes.login_error;
        field_style = formikStyle.field;
    } else {
        error = classes.error;
        field_style = formikStyle.profile_field;
    }

    return (
        <div className={field_style}>
            <input className={meta.touched && meta.error ? classes.input_error : ""}
                   placeholder={placeholder} type={type} {...field}/>
            {meta.touched && meta.error && <div className={error}>{meta.error}</div>}
        </div>
    )
}

export default Input;