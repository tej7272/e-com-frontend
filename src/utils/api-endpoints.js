

const baseUrl = process.env.REACT_APP_BASE_URL;


export const apiEndPoints = {

    
    admin: {
        getFormConfig: `${baseUrl}/form-config`,
        auth: {
            login: `${baseUrl}/auth/login`,
            validate: `${baseUrl}/auth/validate`,
            adminInfo: `${baseUrl}/auth/user-info`,
            forgotPassword: `${baseUrl}/auth/forgot-password`,
            resetPassword: `${baseUrl}/auth/reset-password`,
        },
        configuration: {
            getCategories: `${baseUrl}/configuration/category`,
            addCategory: `${baseUrl}/configuration/category`,
            updateCategory: `${baseUrl}/configuration/category`,
            deleteCategory: `${baseUrl}/configuration/category`,
    
            getSizeGroups: `${baseUrl}/configuration/size-group`,
            addSizeGroup: `${baseUrl}/configuration/size-group`,
            updateSizeGroup: `${baseUrl}/configuration/size-group`,
            deleteSizeGroup: `${baseUrl}/configuration/size-group`,
    
            getSubCategories: `${baseUrl}/configuration/sub-category`,
            addSubCategory: `${baseUrl}/configuration/sub-category`,
            updateSubCategory: `${baseUrl}/configuration/sub-category`,
            deleteSubCategory: `${baseUrl}/configuration/sub-category`,
    
            getBrands: `${baseUrl}/configuration/brand`,
            addBrand: `${baseUrl}/configuration/brand`,
            updateBrand: `${baseUrl}/configuration/brand`,
            deleteBrand: `${baseUrl}/configuration/brand`,
    
            getColors: `${baseUrl}/configuration/color`,
            addColor: `${baseUrl}/configuration/color`,
            updateColor: `${baseUrl}/configuration/color`,
            deleteColor: `${baseUrl}/configuration/color`,
        },
    },


}