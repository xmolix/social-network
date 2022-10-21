import React, { Suspense } from "react";
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/reducers/appReducer";
import {getInitialize} from "./redux/selectors/appSelector";
import UsersComponent from "./components/Users/UsersComponent";
import {useEffect} from "react";
import Loading from "./components/commons/Loading/Loading";
import Profile from "./components/Profile/Profile";
import store from "./redux/store";

const MessagesContainer = React.lazy(() => import ("./components/Messages/MessagesContainer"));

const App = (props) => {
    useEffect(() => {
        props.initializeApp();
    }, [props.initialize]);

    if (!props.initialize) return <Loading/>;

    return (
        <>
            <Header/>
            <main className={"main"}>
                <Navbar/>
                <div className={"content"}>
                    <Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path={"/login"} element={<LoginPageContainer/>}/>
                            <Route path={"/profile/*"} element={<Profile/>}/>
                            <Route path={"/profile/:userId"} element={<Profile/>}/>
                            <Route exact path={"/messages/*"} element={<MessagesContainer/>}/>
                            <Route path={"/users"} element={<UsersComponent/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </main>
            <Footer/>
        </>
    );
};

const mapStateToProps = (state) => ({
    initialize: getInitialize(state),
});

const AppContainer = connect(mapStateToProps, {initializeApp})(App);

const SocialNetworkApp = () => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    );
};

export default SocialNetworkApp;