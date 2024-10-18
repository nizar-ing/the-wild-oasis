import React from 'react';
import {useSearchParams} from "react-router-dom";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getBookingsAfterDate} from "../../services/apiBookings.js";
import error from "eslint-plugin-react/lib/util/error.js";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const nbDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), nbDays).toISOString();

    const {isLoading, data: bookings} = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${nbDays}`],
    });

    return {isLoading, bookings};
}
