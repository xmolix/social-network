import React, {FC, Suspense, useEffect} from "react"
import './App.css'
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import LoginPageContainer from "./components/LoginPage/LoginPageContainer"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/reducers/appReducer"
import {getInitialize} from "./redux/selectors/appSelector"
import {UsersPage} from "./components/Users/UsersPage"
import Loading from "./components/commons/Loading/Loading"
import Profile from "./components/Profile/Profile"
import store, {AppStateType} from "./redux/store"
import ComingSoon from "./components/commons/ComingSoon/ComingSoon"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import {Game} from "./components/Game/Game";

const MessagesContainer = React.lazy(() => import ("./components/Messages/MessagesContainer"))
const ChatPage = React.lazy(() => import ("./pages/Chat/ChatPage"))

const App: FC<MapPropsType & DispatchPropsType> = (props) => {
    useEffect(() => {
        props.initializeApp();
    }, [props.initialize]);

    if (!props.initialize) return <Loading/>

    return (
        <>
            <Header/>
            <main className={"main"}>
                <Navbar/>
                <div className={"content"}>
                    <Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path={ "/" } element={ <Navigate to={ "/login" } /> } />
                            <Route path={ "/login" } element={ <LoginPageContainer /> } />
                            <Route path={ "/profile/*" } element={ <Profile /> } />
                            <Route path={ "/profile/:userId" } element={ <Profile /> } />
                            <Route path={ "/messages/*" } element={ <MessagesContainer /> } />
                            <Route path={ "/chat" } element={ <ChatPage /> } />
                            <Route path={ "/users" } element={ <UsersPage /> } />
                            <Route path={ "/game" } element={ <Game />} />
                            <Route path={ "/music" } element={ <ComingSoon /> } />
                            <Route path={ "/news" } element={ <ComingSoon /> } />
                            <Route path={ "/settings" } element={ <ComingSoon /> } />
                            <Route path={ "*" } element={ <PageNotFound /> } />
                        </Routes>
                    </Suspense>
                </div>
            </main>
            <Footer/>
        </>
    );
};

const mapStateToProps = (state: AppStateType) => ({
    initialize: getInitialize(state),
});

const AppContainer = connect(mapStateToProps, {initializeApp})(App);

const SocialNetworkApp: FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    )
}

export default SocialNetworkApp;


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void,
}