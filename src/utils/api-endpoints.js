
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
       
    }
}