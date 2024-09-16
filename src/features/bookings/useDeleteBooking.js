import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
        mutationFn: deleteBookingApi, // <=> (id) => deleteBooking(id)
        onSuccess: async () => {
            toast.success("Booking successfully deleted");
            await queryClient.invalidateQueries({
                queryKey: ['bookings']
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isDeleting, deleteBooking};
}
