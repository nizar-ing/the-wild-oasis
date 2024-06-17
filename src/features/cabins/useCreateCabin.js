import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const {isLoading: isCreating, mutate: createCabin} = useMutation({
        mutationFn: createOrEditCabin, //  <==> (newCabin) => createCabin(newCabin)
        onSuccess: async () => {
            toast.success("New cabin successfully created");
            await queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isCreating, createCabin};
}
