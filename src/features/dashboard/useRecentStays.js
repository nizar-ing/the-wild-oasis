import React from 'react';
import {useSearchParams} from "react-router-dom";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getStaysAfterDate} from "../../services/apiBookings.js";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const nbDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), nbDays).toISOString();

    const {isLoading, data: stays} = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${nbDays}`],
    });
    const confirmedStays = stays?.filter((stay) => (stay?.status === "checked-in")
        || (stay?.status === "checked-out")
    );

    return {isLoading, stays, confirmedStays, nbDays};
}
