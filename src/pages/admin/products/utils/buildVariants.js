
export const buildVariants = (sizes = [], colors = [], existing = []) => {
    return sizes.flatMap((size) =>
        colors.map((color) => {
            const prev = existing.find(
                (v) => v.size === size && v.colorId === color._id
            );
            return prev ?? {
                size,
                colorId: color._id,
                colorName: color.name,
                colorHex:  color.hex,
                price: '',
                mrp: '',
                stock: '',
                sku:`SKU-${size}-${color.name.substring(0, 3).toUpperCase()}`,
            };
        }
    )
  );
}
  