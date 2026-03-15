import { AdminAuthContext } from "providers/AdminAuthProvider";
import { useContext } from "react";



export const useAdminAuth = () => useContext(AdminAuthContext)