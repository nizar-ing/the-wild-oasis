import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export function useBookings() {
    const [searchParam] = useSearchParams();
    const filterValue = searchParam.get("status");
    const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue};
    const {data: bookings, isLoading, error} = useQuery({
        queryKey: ['bookings', filter],
        queryFn: () => getBookings({filter})
    });
    return {bookings, isLoading, error};
}
