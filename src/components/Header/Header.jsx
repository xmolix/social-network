import classes from "./Header.module.css";
import logo from "../../img/logo.png";
import LoginContainer from "./Login/LoginContainer";

const Header = () => {
    return (
        <header className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.header_container}>
                <LoginContainer/>
                <div className={classes.header_name}>nonamesite.search</div>
            </div>
        </header>
    );
}

export default Header;