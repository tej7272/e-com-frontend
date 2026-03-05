import { toast } from "react-toastify";



export const handlePending = (state) => {
    state.loading = true;
    state.error = null
}


export const handleReject = (state, action) => {
    state.loading = false;
    toast.error(action.payload?.message || "Something went wrong");
}