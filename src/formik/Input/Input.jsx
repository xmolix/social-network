import classes from "./Input.module.css";
import formikStyle from "../formik.module.css";

const Input = (props) => {
    const {field, form, meta, placeholder, type} = props;

    return (
        <div className={formikStyle.field}>
            <input className={meta.touched && meta.error ? classes.input_error : ""}
                   placeholder={placeholder} type={type} {...field}/>
            {meta.touched && meta.error && <div className={classes.error}>{meta.error}</div>}
        </div>
    )
}

export default Input;