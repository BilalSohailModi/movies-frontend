import React from "react";
import styles from "../styles/Movies.module.css";

interface Props {
    HasPreviousPage: boolean
    HasNextPage: boolean
    activePage: number
    TotalCount: number
    PAGE_LIMIT: number
    onPageChange: (page: number) => void
}
const PaginatationFooter = ({ HasPreviousPage, onPageChange, PAGE_LIMIT, HasNextPage, activePage, TotalCount }: Props) => {
    function getPageNumbers(TotalCount: number): number[] {
        const size = Math.ceil(TotalCount / PAGE_LIMIT);
        return Array.from({ length: size }, (_, index) => index + 1);
    }

    return (
        <footer className={styles.pagination}>
            <button
                disabled={!HasPreviousPage}
                className={`${styles.prev} ${!HasPreviousPage ? styles.disabledButton : ""
                    }`}
                onClick={() => onPageChange(activePage - 1)}
            >
                Prev
            </button>
            {getPageNumbers(TotalCount).map((item) => {
                return (
                    <button
                        className={
                            activePage == item
                                ? styles.paginationButton
                                : styles.inActivePage
                        }
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </button>
                );
            })}
            <button
                className={`${styles.next} ${!HasNextPage ? styles.disabledButton : ""
                    }`}
                onClick={() => onPageChange(activePage + 1)}
                disabled={!HasNextPage}
            >
                Next
            </button>
        </footer>
    );
};

export default PaginatationFooter;
