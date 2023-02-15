import React, {FC, memo} from 'react';
import classes from "./Users.module.css";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {FilterType, setPage} from "../../redux/reducers/usersReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {User} from "./User/User";
import {UsersPagination} from "./UsersPagination/UsersPagination";

export const Users: FC<UsersType> = memo(({ usersCount, currentPage, filter }) => {

    const dispatch: AppDispatch = useDispatch()

    const onFilterChanged = (filter: FilterType) => {
        void dispatch(setPage(usersCount, 1, filter))
    }

    return (
        <div className={classes.users}>
            <UsersSearchForm onFilterChanged={onFilterChanged}
                             friend={filter.friend} />
            <User />
            <UsersPagination usersCount={usersCount}
                             currentPage={currentPage}
                             filter={filter} />
        </div>
    )
})

export type UsersType = {
    usersCount: number,
    currentPage: number,
    filter: FilterType
}