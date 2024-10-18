import React from 'react';
import styled from "styled-components";
import {useRecentBookings} from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useRecentStays} from "./useRecentStays.js";
import Stats from "./stats.jsx";
import {useCabins} from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;


function DashboardLayout() {
    const {bookings, isLoading: isLoadingBookings} = useRecentBookings();
    const {confirmedStays, isLoading: isLoadingStays, nbDays} =useRecentStays();
    const {cabins, isLoading: isLoadingCabins} = useCabins();

    if (isLoadingBookings || isLoadingStays) return <Spinner />

    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmedStays={confirmedStays} nbDays={nbDays} cabinCount={cabins.length} />
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} nbDays={nbDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
