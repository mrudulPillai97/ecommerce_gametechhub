const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true
    },
    
    collection: {
        type: String,
        required: [true, "Collection is required."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    price: {
        type: Number,
        required: [true, "Error: Please enter product price."],
        maxLength: [8, "Error: Price cannot exceed 8 digits."]
    },
    discountPrice: {
        type: Number,
        required: [true, "Discount Price is required."],
        maxLength: [8, "Error: Discount cannot exceed 2 digits."]
    },
    discountPercent: {
        type: Number,
        default: 0
    },
    images: [
        {
            imageId: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        required: [true, "Stock is required."],
        maxLength: [3, "Stock cannot exceed 3 digits."],
        default: 1
    },
   
    reviewsCount: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);