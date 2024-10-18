import React from 'react';
import Stat from "./Stat.jsx";
import {HiOutlineBriefcase, HiOutlineChartBar} from "react-icons/hi";
import {HiOutlineBanknotes, HiOutlineCalendarDays} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers.js";

function Stats({bookings, confirmedStays, nbDays, cabinCount}) {
    //1. Calculation of number of bookings
    const nbBookings = bookings.length;

    //2. Calculation of total sales
    const sales = bookings.reduce((acc, currentBooking) => acc + currentBooking.totalPrice, 0);

    //3. Calculation of check-ins bookings
    const checkins = confirmedStays.length;

    //4. Calculation of the occupancy rate (number of checked-in nights / all available nights (nb days * nb cabins))
    const occupation = confirmedStays.reduce((acc, currentStay) => acc + currentStay.nbNights, 0) / (nbDays * cabinCount);


    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={nbBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    );
}

export default Stats;
