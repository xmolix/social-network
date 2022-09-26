import classes from "./Textarea.module.css";
import formikStyle from "../formik.module.css";

const Textarea = (props) => {
    const {field, form, meta, placeholder} = props;

    return (
        <div className={formikStyle.field}>
                            <textarea className={`${classes.textarea} 
                                                  ${meta.touched && meta.error ? classes.textarea_error : ""}`}
                                      cols={30} rows={5} placeholder={placeholder} {...field}/>
            {meta.touched && meta.error && <div className={classes.error}>{meta.error}</div>}
        </div>
    )
}

export default Textarea;