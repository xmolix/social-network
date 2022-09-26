import {connect} from "react-redux";
import {getAuth, getLogin} from "../../../redux/selectors/authSelector";
import Login from "./Login";
import {logout} from "../../../redux/reducers/authReducer";

const LoginContainer = (props) => {
  const onLoginOut = () => {
    props.logout();
  }

  return (
      <Login onLoginOut={onLoginOut} {...props}/>
  )
};

const mapStateToProps = (state) => ({
  isAuth: getAuth(state),
  login: getLogin(state),
});

export default connect(mapStateToProps, {logout})(LoginContainer);