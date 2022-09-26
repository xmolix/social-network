import {NavLink} from "react-router-dom";
import classes from "../Header.module.css";


const Login = (props) => {
    return (
        <>
            {!props.isAuth
                ? <div className={classes.authorization_false}>
                    <NavLink className={`${classes.login_btn} ${classes.login}`} to={"/login"}>login</NavLink>
                </div>
                : <div className={classes.authorization_true}>
                    <div className={classes.user_name}>User: <span>{props.login}</span></div>
                    <NavLink className={`${classes.login_btn} ${classes.logout}`}
                             onClick={props.onLoginOut}
                             to={"/login"}>logout</NavLink>
                </div>
            }
        </>
    )
}

export default Login;