import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    // Add any other properties as needed
});
export const Product = mongoose.model('Product', ProductSchema);
//# sourceMappingURL=Product.js.map