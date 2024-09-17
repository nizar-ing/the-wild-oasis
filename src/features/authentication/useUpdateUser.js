import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import {updateCurrentUser} from "../../services/apiAuth.js";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const {mutate: updateUser, isLoading: isUpdating }= useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: async ({user}) => {
            toast.success("User account successfully updated");
            // queryClient.setQueryData("user", user); to re-fetching data manually. It doesn't work in this case ( i will search about this ).
            // after React 18 invalidateQueries does the matter even with file uploading :)
            // we cannot use the both together 'setQueryData' and 'invalidateQueries' with the queryClient
             await queryClient.invalidateQueries({
                 queryKey: ['user']
             });
        },
        onError: error => toast.error(error.message)
    });

    return {updateUser, isUpdating};
}
