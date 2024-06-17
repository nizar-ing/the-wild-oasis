import Form from "../../ui/Form.jsx";
import {FormRow} from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import {useSettings} from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice
        } = {}
    } = useSettings();

    // return <Spinner />;
    if (isLoading) return <Spinner />;

    // This time we are using UNCONTROLLED fields, so we will NOT store state
    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number'
                    id='min-nights'
                    defaultValue={minBookingLength}
                />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number'
                    id='max-nights'
                    defaultValue={maxBookingLength}
                />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number'
                    id='max-guests'
                    defaultValue={maxGuestsPerBooking}
                />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input
                    type='number'
                    id='breakfast-price'
                    defaultValue={breakfastPrice}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
