const baseUrl = "http://localhost:5000/api/v1"

export const apiEndPoints = {

    // Master api's
    master: {
        master: `${baseUrl}/admin/master`,
        addBrand: `${baseUrl}/admin/master/addBrand`,
        updateBrand: `${baseUrl}/admin/master/updateBrand`,
        deleteBrand: `${baseUrl}/admin/master/deleteBrand`,
        addGender: `${baseUrl}/admin/master/addGender`,
        updateGender: `${baseUrl}/admin/master/updateGender`,
        deleteGender: `${baseUrl}/admin/master/deleteGender`,
        addCategory: `${baseUrl}/admin/master/addCategory`,
        updateCategory: `${baseUrl}/admin/master/updateCategory`,
        deleteCategory: `${baseUrl}/admin/master/deleteCategory`,
        addColor: `${baseUrl}/admin/master/addColor`,
        updateColor: `${baseUrl}/admin/master/updateColor`,
        deleteColor: `${baseUrl}/admin/master/deleteColor`,
        addStockStatus: `${baseUrl}/admin/master/addStockStatus`,
        updateStockStatus: `${baseUrl}/admin/master/updateStockStatus`,
        deleteStockStatus: `${baseUrl}/admin/master/deleteStockStatus`,
        addOrderStatus: `${baseUrl}/admin/master/addOrderStatus`,
        updateOrderStatus: `${baseUrl}/admin/master/updateOrderStatus`,
        deleteOrderStatus: `${baseUrl}/admin/master/deleteOrderStatus`,
        addSize: `${baseUrl}/admin/master/addSize`,
        updateSize: `${baseUrl}/admin/master/updateSize`,
        deleteSize: `${baseUrl}/admin/master/deleteSize`,
    }
}