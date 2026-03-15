import { toast } from "react-toastify";


export const handlePending = (state) => {
    state.loading = true;
    state.error   = null;
};

export const handleRejected = (state, action) => {
    state.loading = false;
    state.error   = action.payload?.message;
    console.log("action.pay", action.payload?.message)
    if (!action.payload?.errors) {
        toast.error(action.payload?.message || "Something went wrong");
    }
};