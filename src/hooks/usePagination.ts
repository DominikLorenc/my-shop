import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const usePagination = <T,>(items: T[], itemsPerPage: number) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setSearchParams({ page: totalPages.toString() });
        }
    }, [currentPage, totalPages, setSearchParams]);

    const setPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setSearchParams({ page: page.toString() });
        }
    };

    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return { paginatedItems, currentPage, totalPages, setPage };
};