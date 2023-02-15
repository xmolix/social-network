import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFilter, getLoading, getUsersCount} from "../../redux/selectors/usersSelector";
import {Users} from "./Users";
import Loading from "../commons/Loading/Loading";
import {getUsers} from "../../redux/reducers/usersReducer";
import {AppDispatch} from "../../redux/store";

export const UsersPage: FC = () => {
    document.title = "Social Network - Users"

    const isLoading = useSelector(getLoading)
    const usersCount = useSelector(getUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        void dispatch(getUsers(usersCount, currentPage, filter))
    }, [filter, currentPage, usersCount, dispatch])

    return (
        <>
            { isLoading
                ? <Loading/>
                : <Users usersCount={usersCount}
                         currentPage={currentPage}
                         filter={filter} />
            }
        </>
    )
}

// type MapStateToPropsType = ReturnType<typeof mapStateToProps>