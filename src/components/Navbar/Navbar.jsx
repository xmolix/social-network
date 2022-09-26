import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const setActive = active => active.isActive ? classes.active : "";

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <NavLink className={setActive} to={"/profile"}>
                <div className={classes.navbar_name}>Profile</div>
            </NavLink>
            <NavLink className={setActive} to={"/messages"}>
                <div className={classes.navbar_name}>Messages</div>
            </NavLink>
            <NavLink className={setActive} to={"/users"}>
                <div className={classes.navbar_name}>Users</div>
            </NavLink>
            <NavLink className={setActive} to={"/music"}>
                <div className={classes.navbar_name}>Music</div>
            </NavLink>
            <NavLink className={setActive} to={"/news"}>
                <div className={classes.navbar_name}>News</div>
            </NavLink>
            <NavLink className={setActive} to={"/setting"}>
                <div className={classes.navbar_name}>Settings</div>
            </NavLink>
        </div>
    );
}

export default Navbar;