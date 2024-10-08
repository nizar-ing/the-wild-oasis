import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as loginApi}  from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: ({user: user}) => {
            queryClient.setQueryData(['user'], user);
            navigate("/dashboard", {replace: true});
            toast.success("User logged in successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Provided email or password are incorrect");
        }
    });

    return {login, isLoading};
}
