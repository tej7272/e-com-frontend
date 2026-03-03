
const baseUrl = "http://192.168.1.15:5000/api/v1/admin"

export const apiEndPoints = {

    configuration: {
        getCategories: `${baseUrl}/configuration/category`,
        addCategory: `${baseUrl}/configuration/category`,
        updateCategory: `${baseUrl}/configuration/category`,
        deleteCategory: `${baseUrl}/configuration/category`,
    },


    // Master api's
    master: {

        master: `${baseUrl}/master`,
        // addBrand: `${baseUrl}/master/addBrand`,
        // updateBrand: `${baseUrl}/master/updateBrand`,
        // deleteBrand: `${baseUrl}/master/deleteBrand`,
        // addGender: `${baseUrl}/master/addGender`,
        // updateGender: `${baseUrl}/master/updateGender`,
        // deleteGender: `${baseUrl}/master/deleteGender`,
        // addCategory: `${baseUrl}/master/addCategory`,
        // updateCategory: `${baseUrl}/master/updateCategory`,
        // deleteCategory: `${baseUrl}/master/deleteCategory`,
        // addColor: `${baseUrl}/master/addColor`,
        // updateColor: `${baseUrl}/master/updateColor`,
        // deleteColor: `${baseUrl}/master/deleteColor`,
        // addStockStatus: `${baseUrl}/master/addStockStatus`,
        // updateStockStatus: `${baseUrl}/master/updateStockStatus`,
        // deleteStockStatus: `${baseUrl}/master/deleteStockStatus`,
        // addOrderStatus: `${baseUrl}/master/addOrderStatus`,
        // updateOrderStatus: `${baseUrl}/master/updateOrderStatus`,
        // deleteOrderStatus: `${baseUrl}/master/deleteOrderStatus`,
        // addSize: `${baseUrl}/master/addSize`,
        // updateSize: `${baseUrl}/master/updateSize`,
        // deleteSize: `${baseUrl}/master/deleteSize`,
    }
}