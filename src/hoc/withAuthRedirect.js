import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {getAuth} from "../redux/selectors/authSelector";

const mapStateToProps = (state) => ({
    isAuth: getAuth(state),
})

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to={"/login"}/>

        return <Component {...props}/>
    }

    return connect(mapStateToProps, {})(RedirectComponent);
}