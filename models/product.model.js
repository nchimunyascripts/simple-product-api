const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
        },
        quantity: {
            type: Number,
            required: true,
            defualt: 0
        },
        price: {
            type: Number,
            required: true,
            defualt: 0
        },
        description: {
            type: String,
            required: [true, "Please add product description"],
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;
