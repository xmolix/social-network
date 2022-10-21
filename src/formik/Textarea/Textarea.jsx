import classes from "./Textarea.module.css";
import formikStyle from "../formik.module.css";

const Textarea = (props) => {
    const {field, form, meta, placeholder, cols = 30, rows = 5} = props;

    return (
        <div className={formikStyle.field}>
                            <textarea className={`${classes.textarea} 
                                                  ${meta.touched && meta.error ? classes.textarea_error : ""}`}
                                      cols={cols} rows={rows} placeholder={placeholder} {...field}/>
            {meta.touched && meta.error && <div className={classes.error}>{meta.error}</div>}
        </div>
    )
}

export default Textarea;