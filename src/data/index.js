export const subCategories = [
    // Clothing
    { name: "T-Shirts",       category: "Clothing",      sizeGroup: "Clothing Sizes",      isActive: true },
    { name: "Shirts",         category: "Clothing",      sizeGroup: "Clothing Sizes",      isActive: true },
    { name: "Jeans",          category: "Clothing",      sizeGroup: "Waist Sizes",         isActive: true },
    { name: "Dresses",        category: "Clothing",      sizeGroup: "Clothing Sizes",      isActive: true },
    { name: "Jackets",        category: "Clothing",      sizeGroup: "Clothing Sizes",      isActive: true },
    { name: "Ethnic Wear",    category: "Clothing",      sizeGroup: "Clothing Sizes",      isActive: true },
    { name: "Activewear",     category: "Clothing",      sizeGroup: "Clothing Sizes",      isActive: true },

    // Footwear
    { name: "Sneakers",       category: "Footwear",      sizeGroup: "UK Shoe Sizes",       isActive: true },
    { name: "Formal Shoes",   category: "Footwear",      sizeGroup: "UK Shoe Sizes",       isActive: true },
    { name: "Sandals",        category: "Footwear",      sizeGroup: "UK Shoe Sizes",       isActive: true },
    { name: "Boots",          category: "Footwear",      sizeGroup: "UK Shoe Sizes",       isActive: true },
    { name: "Heels",          category: "Footwear",      sizeGroup: "EU Shoe Sizes",       isActive: true },

    // Electronics
    { name: "Smartphones",    category: "Electronics",   sizeGroup: null,                  isActive: true },
    { name: "Laptops",        category: "Electronics",   sizeGroup: "Laptop Screen Sizes", isActive: true },
    { name: "Televisions",    category: "Electronics",   sizeGroup: "TV Screen Sizes",     isActive: true },
    { name: "Headphones",     category: "Electronics",   sizeGroup: null,                  isActive: true },
    { name: "Tablets",        category: "Electronics",   sizeGroup: null,                  isActive: true },
    { name: "Cameras",        category: "Electronics",   sizeGroup: null,                  isActive: true },

    // Accessories
    { name: "Watches",        category: "Accessories",   sizeGroup: null,                  isActive: true },
    { name: "Bags",           category: "Accessories",   sizeGroup: null,                  isActive: true },
    { name: "Sunglasses",     category: "Accessories",   sizeGroup: null,                  isActive: true },
    { name: "Belts",          category: "Accessories",   sizeGroup: "Waist Sizes",         isActive: true },
    { name: "Jewellery",      category: "Accessories",   sizeGroup: null,                  isActive: true },
    { name: "Caps & Hats",    category: "Accessories",   sizeGroup: "Free Size",           isActive: true },

    // Sports
    { name: "Gym Equipment",  category: "Sports",        sizeGroup: null,                  isActive: true },
    { name: "Sports Shoes",   category: "Sports",        sizeGroup: "UK Shoe Sizes",       isActive: true },
    { name: "Sportswear",     category: "Sports",        sizeGroup: "Clothing Sizes",      isActive: true },
    { name: "Yoga & Fitness", category: "Sports",        sizeGroup: null,                  isActive: true },

    // Home & Living
    { name: "Furniture",      category: "Home & Living", sizeGroup: null,                  isActive: true },
    { name: "Bedding",        category: "Home & Living", sizeGroup: null,                  isActive: true },
    { name: "Kitchen",        category: "Home & Living", sizeGroup: null,                  isActive: true },
    { name: "Home Decor",     category: "Home & Living", sizeGroup: null,                  isActive: true },

    // Beauty
    { name: "Skincare",       category: "Beauty",        sizeGroup: null,                  isActive: true },
    { name: "Haircare",       category: "Beauty",        sizeGroup: null,                  isActive: true },
    { name: "Makeup",         category: "Beauty",        sizeGroup: null,                  isActive: true },
    { name: "Fragrances",     category: "Beauty",        sizeGroup: null,                  isActive: true },

    // Books
    { name: "Fiction",        category: "Books",         sizeGroup: null,                  isActive: true },
    { name: "Non-Fiction",    category: "Books",         sizeGroup: null,                  isActive: true },
    { name: "Academic",       category: "Books",         sizeGroup: null,                  isActive: true },
    { name: "Children",       category: "Books",         sizeGroup: null,                  isActive: true },
];



export const sizeGroups = [
    {
        name:  "Clothing Sizes",
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
    {
        name:  "UK Shoe Sizes",
        sizes: ["UK5", "UK6", "UK7", "UK8", "UK9", "UK10", "UK11"],
    },
    {
        name:  "EU Shoe Sizes",
        sizes: ["EU38", "EU39", "EU40", "EU41", "EU42", "EU43", "EU44"],
    },
    {
        name:  "TV Screen Sizes",
        sizes: ["32\"", "43\"", "50\"", "55\"", "65\"", "75\""],
    },
    {
        name:  "Laptop Screen Sizes",
        sizes: ["13\"", "14\"", "15.6\"", "17\""],
    },
    {
        name:  "Free Size",
        sizes: ["Free Size"],
    },
    {
        name:  "Waist Sizes",
        sizes: ["28", "30", "32", "34", "36", "38", "40"],
    },
];


export const categories = [
    { name: "Clothing",     description: "Apparel and fashion wear",        isActive: true },
    { name: "Footwear",     description: "Shoes, sandals and boots",        isActive: true },
    { name: "Electronics",  description: "Gadgets and electronic devices",  isActive: true },
    { name: "Accessories",  description: "Fashion accessories",             isActive: true },
    { name: "Sports",       description: "Sports and fitness equipment",    isActive: true },
    { name: "Home & Living",description: "Home decor and furniture",        isActive: true },
    { name: "Beauty",       description: "Skincare and cosmetics",          isActive: true },
    { name: "Books",        description: "Books and stationery",            isActive: true },
];