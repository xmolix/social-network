import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {getAuth} from "../redux/selectors/authSelector";
import {ComponentType} from "react";
import {AppStateType} from "../redux/store";

const mapStateToProps = (state: AppStateType) => ({
    isAuth: getAuth(state),
})

type MapStatePropsType = ReturnType<typeof mapStateToProps>

export const withAuthRedirect = (Component: ComponentType) => {
    const RedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Navigate to={"/login"}/>

        return <Component {...restProps}/>
    }

    return connect(mapStateToProps, {})(RedirectComponent);
}