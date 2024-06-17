import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
        mutationFn: deleteCabinApi, // <=> (id) => deleteCabin(id)
        onSuccess: async () => {
            toast.success("Cabin successfully deleted");
            await queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isDeleting, deleteCabin};
}
