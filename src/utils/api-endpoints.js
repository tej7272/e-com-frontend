

const baseUrl = process.env.REACT_APP_BASE_URL;


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

        getSubCategories: `${baseUrl}/configuration/sub-category`,
        addSubCategory: `${baseUrl}/configuration/sub-category`,
        updateSubCategory: `${baseUrl}/configuration/sub-category`,
        deleteSubCategory: `${baseUrl}/configuration/sub-category`,
    },
}