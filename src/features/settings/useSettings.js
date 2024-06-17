import {useQuery} from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings.js";

export function useSettings() {
    const { data: settings, isLoading, error } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    });

    return {settings, isLoading, error};
}
