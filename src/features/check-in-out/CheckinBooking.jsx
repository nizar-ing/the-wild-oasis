import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import {useBooking} from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import Checkbox from "../../ui/Checkbox.jsx";
import {useEffect, useState} from "react";
import {formatCurrency} from "../../utils/helpers.js";
import {useCheckin} from "./useCheckin.js";
import {useSettings} from "../settings/useSettings.js";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const {booking, isLoading} = useBooking();
    const {settings, isLoading: isLoadingSettings} = useSettings();

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    const moveBack = useMoveBack();
    const {checkin, isCheckingIn} = useCheckin();

    if (isLoading || isLoadingSettings) return <Spinner/>

    const {
        id: bookingId,
        guests,
        totalPrice,
        nbGuests,
        hasBreakfast,
        nbNights,
    } = booking;
    console.log(settings);
    const optionalBreakfastPrice = settings.breakfastPrice * nbNights * nbGuests;

    function handleCheckin() {
        if (!confirmPaid) return;
        if(addBreakfast){
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice
                }
            });
        }
        else checkin({bookingId, breakfast: {}});
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>
            <BookingDataBox booking={booking}/>
            {
                !hasBreakfast && (
                    <Box>
                        <Checkbox
                            id="breakfast"
                            checked={addBreakfast}
                            onChange={() => {
                                setAddBreakfast((add) => !add);
                                setConfirmPaid(false);
                            }}
                        >
                            Want to add breakfast for {optionalBreakfastPrice}?
                        </Checkbox>
                    </Box>
                )
            }
            <Box>
                <Checkbox id="confirm" checked={confirmPaid} disabled={confirmPaid || isCheckingIn}
                          onChange={() => setConfirmPaid((confirm) => !confirm)}>
                    I confirm that {guests.fullName} has paid the total amount of
                    {!addBreakfast ? formatCurrency(totalPrice) :
                    `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}.
                </Checkbox>
            </Box>
            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking
                    #{bookingId}</Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
