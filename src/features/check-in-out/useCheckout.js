import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient();
    const {mutate: checkout, isLoading: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-out'
        }),
        onSuccess: async ({id}) => {
            toast.success(`Booking #${id} successfully checked out`);
            await queryClient.invalidateQueries({active: true});
        },
        onError: () => toast.error("There was an error while checking out")
    });
    return {checkout, isCheckingOut};
}
