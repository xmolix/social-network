import React, {useCallback} from 'react';
import {connect} from "react-redux";
import {getUsers, setFollow, setPage, setUnfollow} from "../../redux/reducers/usersReducer";
import {
    getCurrentPage, getDisabled,
    getLoading,
    getTotalCount,
    getUsersArray,
    getUsersCount
} from "../../redux/selectors/usersSelector";
import {useEffect, useState} from "react";
import Users from "./Users";
import {getAvatar} from "../../redux/selectors/appSelector";
import Loading from "../commons/Loading/Loading";

const UsersComponent = (props) => {
    let [count, setCount] = useState([]);

    useEffect(() => {
        props.getUsers(props.usersCount, props.currentPage);
    }, [props.usersCount, props.currentPage]);

    let totalPages = Math.ceil(props.totalCount / props.usersCount);

    const firstPage = () => {
        props.setPage(props.usersCount, 1);
    }

    const lastPage = () => {
        props.setPage(props.usersCount, totalPages - 1);
    }

    const onPagination = () => {
        for (let x = 1; x < totalPages; x++) {
            count.push(x)
        }

        let thisPage = props.currentPage;
        let currentRP = ((thisPage - 11) < 0) ? 0 : thisPage - 11;
        let currentLP = thisPage + 10;

        return count.slice(currentRP, currentLP);
    };

    const onPageChange = (setPage) => {
        props.setPage(props.usersCount, setPage)
    }

    return (
        <>
            {props.isLoading
                ? <Loading/>
                : <Users pagination={onPagination()}
                         pageChange={onPageChange}
                         firstPage={firstPage}
                         lastPage={lastPage}
                         totalPages={totalPages}
                         {...props}/>}
        </>
    )
}

const mapStateToProps = (state) => ({
    users: getUsersArray(state),
    usersCount: getUsersCount(state),
    totalCount: getTotalCount(state),
    currentPage: getCurrentPage(state),
    defaultAvatar: getAvatar(state),
    isLoading: getLoading(state),
    isDisabled: getDisabled(state),
});

export default connect(mapStateToProps, {
    getUsers, setPage, setFollow, setUnfollow
})(UsersComponent);