
const baseUrl = "http://192.168.1.15:5000/api/v1/admin"

export const apiEndPoints = {

    getFormConfig: `${baseUrl}/form-config`,

    configuration: {
        getCategories: `${baseUrl}/configuration/category`,
        addCategory: `${baseUrl}/configuration/category`,
        updateCategory: `${baseUrl}/configuration/category`,
        deleteCategory: `${baseUrl}/configuration/category`,

        getSizeGroups: `${baseUrl}/configuration/size-group`,
        addSizeGroup: `${baseUrl}/configuration/size-group`,
        updateSizeGroup: `${baseUrl}/configuration/size-group`,
        deleteSizeGroup: `${baseUrl}/configuration/size-group`,
    },
}