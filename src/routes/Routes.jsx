import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { adminRoutes } from "./index";
import { Route, Routes } from "react-router-dom";


const AllRoutes = (props) => {
    return(
        <Routes>
            <Route>
                {
                    adminRoutes.map((adminRoute, index) => <Route 
                        key={index}
                        path={adminRoute.path}
                        element={<AdminLayout {...props}>{adminRoute.element}</AdminLayout>}
                    />
                )}
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        
    )
    

}

export default AllRoutes