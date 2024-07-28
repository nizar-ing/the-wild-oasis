import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue}; // {field: "totalPrice", value: 2000, method="gte"}

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = {field, direction};

    // PAGINATION
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const {
        data: {data: bookings, count} = {},
        isLoading,
        error
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({filter, sortBy, page})
    });
    return {bookings, isLoading, error, count};
}
