import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout as logoutApi} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";

function UseLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
   const {mutate: logout, isLoading} = useMutation({
       mutationFn: logoutApi,
       onSuccess: () => {
           queryClient.removeQueries();
            navigate("/login", {replace: true});
       }
   });

   return {logout, isLoading};
}

export default UseLogout;
