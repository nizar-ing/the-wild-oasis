import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const {isLoading: isEditing, mutate: editCabin} = useMutation({
        mutationFn: ({editCabinObj, id}) => createOrEditCabin(editCabinObj, id),
        onSuccess: async () => {
            toast.success("Cabin successfully edited");
            await queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isEditing, editCabin};
}
