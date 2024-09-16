import {useMutation} from "@tanstack/react-query";
import {login as loginApi}  from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate();
    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => {
            navigate('/dashboard');
            toast.success("User successfully logged in");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Provided email or password are incorrect");
        }
    });

    return {login, isLoading};
}
