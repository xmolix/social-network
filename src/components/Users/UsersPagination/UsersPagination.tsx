import React, {FC} from 'react';
import classes from "../Users.module.css";
import cn from "classnames";
import {setPage} from "../../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {getTotalCount} from "../../../redux/selectors/usersSelector";
import {AppDispatch} from "../../../redux/store";
import {UsersType} from "../Users";
import {LeftArrow} from "./LeftArrow";
import {RightArrow} from "./RightArrow";

export const UsersPagination: FC<UsersType> = ({ usersCount, filter, currentPage }) => {

    const totalCount = useSelector(getTotalCount)

    const dispatch: AppDispatch = useDispatch()

    let totalPages = Math.ceil(totalCount / usersCount)

    let pages: number[] = []
    const onPagination = () => {
        for (let x = 1; x < totalPages; x++) {
            pages.push(x)
        }

        let thisPage = currentPage
        let currentRP = ((thisPage - 11) < 0) ? 0 : thisPage - 11
        let currentLP = thisPage + 10

        return pages.slice(currentRP, currentLP)
    };
    const onPageChange = (page: number) => {
        void dispatch(setPage(usersCount, page, filter))
    }

    return (
        <div className={classes.pagination}>

            <LeftArrow usersCount={usersCount}
                       currentPage={currentPage}
                       filter={filter}
                       totalPages={totalPages} />

            { onPagination().map(p =>
                <button className={cn(classes.pagination_btn, currentPage === p ? classes.active_page : "")}
                        onClick={() => onPageChange(p)}
                        key={p}>
                    { p }
                </button>
            ) }

            <RightArrow usersCount={usersCount}
                        currentPage={currentPage}
                        filter={filter}
                        totalPages={totalPages} />
        </div>
    );
};