import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const setActive = active => active.isActive ? classes.active : "";
const setActiveCS = active => active.isActive ? classes.active_navbar_cs : classes.navbar_cs;

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <NavLink className={setActive} to={"/profile"}>
                <div className={classes.navbar_name}>Profile</div>
            </NavLink>
            <NavLink className={setActive} to={"/messages"}>
                <div className={classes.navbar_name}>Messages</div>
            </NavLink>
            <NavLink className={setActive} to={"/chat"}>
                <div className={classes.navbar_name}>Chat</div>
            </NavLink>
            <NavLink className={setActive} to={"/users"}>
                <div className={classes.navbar_name}>Users</div>
            </NavLink>
            <NavLink className={setActive} to={"/game"}>
                <div className={classes.navbar_name}>Game</div>
            </NavLink>
            <NavLink className={setActiveCS} to={"/music"}>
                <div className={classes.navbar_name}>Music</div>
            </NavLink>
            <NavLink className={setActiveCS} to={"/news"}>
                <div className={classes.navbar_name}>News</div>
            </NavLink>
            <NavLink className={setActiveCS} to={"/settings"}>
                <div className={classes.navbar_name}>Settings</div>
            </NavLink>
        </div>
    );
}

export default Navbar;