import { apiPostFirebaseLogin } from "@/API/login.api"
import { setUser } from "@/store/authSlice"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export const useLoginHook=()=>{
    const dispatch=useDispatch()
    return useMutation({
        mutationFn:apiPostFirebaseLogin,
        onSuccess:(data)=>{
            dispatch(setUser(data.user))
            toast.success(data?.message || "Login successful 🎉")
        },
        onError:(error)=>{
            const message =
            error.response?.data?.message ||
            error.message ||
            "Authentication failed";
    
          toast.error(message);
        }
    })
}