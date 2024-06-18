import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";
import toast from "react-hot-toast";


export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {isLoading: isUpdating, mutate: updateSetting} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: async () => {
            toast.success("Setting successfully edited");
            await queryClient.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: error => toast.error(error.message)
    });

    return {isUpdating, updateSetting};
}
