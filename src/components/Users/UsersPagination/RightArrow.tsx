import React, {FC} from 'react';
import classes from "../Users.module.css";
import {setPage} from "../../../redux/reducers/usersReducer";
import {AppDispatch} from "../../../redux/store";
import {useDispatch} from "react-redux";
import {UsersType} from "../Users";

export const RightArrow: FC<UsersType & ArrowType> = ({ usersCount, currentPage, filter, totalPages }) => {

    const dispatch: AppDispatch = useDispatch()
    const lastPage = () => {
        void dispatch(setPage(usersCount, totalPages - 1, filter))
    }

    return (
        <>
            { totalPages - 1 > currentPage + 10 &&
                <button className={classes.pagination_btn}
                        onClick={() => lastPage()}>
                    &gt;&gt;
                </button>
            }
        </>
    )
}

export type ArrowType = {
    totalPages: number
}