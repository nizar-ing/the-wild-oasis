import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export function useBookings() {
    const [searchParam] = useSearchParams();

    // FILTER
    const filterValue = searchParam.get("status");
    const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue}; // {field: "totalPrice", value: 2000, method="gte"}

    // SORT
    const sortByRaw = searchParam.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = {field, direction};

    const {data: bookings, isLoading, error} = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({filter, sortBy})
    });
    return {bookings, isLoading, error};
}
