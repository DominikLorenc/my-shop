export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}
