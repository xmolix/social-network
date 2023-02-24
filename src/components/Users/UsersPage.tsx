import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFilter, getLoading, getUsersCount} from "../../redux/selectors/usersSelector";
import {Users} from "./Users";
import Loading from "../commons/Loading/Loading";
import {getUsers} from "../../redux/reducers/usersReducer";
import {AppDispatch} from "../../redux/store";
import {useLocation, useSearchParams} from "react-router-dom";

export const UsersPage: FC = () => {
    document.title = "Social Network - Users"

    const isLoading = useSelector(getLoading)
    const usersCount = useSelector(getUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)

    const dispatch: AppDispatch = useDispatch()

    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams(location.search)

    const parsed: any = Object.fromEntries([...searchParams])

    let actualPage = parsed.page || currentPage
    let term = parsed.term || filter.term

    let friend = parsed.friend || filter.friend
    if (parsed.friend === false) {
        friend = parsed.friend
    }

    const actualFilter = { friend, term }

    useEffect(() => {
        const term = filter.term
        const friend = filter.friend

        let urlQuery = (term === "" ? "" : `&term=${term}`)
            + (friend === null ? "" : `&friend=${friend}`)
            + (currentPage === 1 ? `&page=${currentPage}` : `&page=${currentPage}`)

        setSearchParams(urlQuery)
    }, [filter, currentPage])

    useEffect(() => {
        void dispatch(getUsers(usersCount, actualPage, actualFilter))
    }, [])

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