const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

//get products
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const currentPage = Number(req.query.page) || 1;
    const resultsPerPage = 20;
    const skip = resultsPerPage * (currentPage - 1);
    let products, productsCount;
    const { search, sort, collection } = req.query;
    let sortQuery = {};

    search?.replace('%20', ' ');

    // Sort options
    switch(sort) {
        case 'new':
            sortQuery = { createdAt: -1 }; // Sort by created date, newest first
            break;
        case 'betterDiscount':
            sortQuery = { discountPercent: -1 }; // Sort by discount, highest to lowest
            break;
        case 'priceHighToLow':
            sortQuery = { discountPrice: -1 }; // Sort by price, high to low
            break;
        case 'priceLowToHigh':
            sortQuery = { discountPrice: 1 }; // Sort by price, low to high
            break;
        case 'betterRating':
            sortQuery = { ratingsCount: -1 }; // Sort by rating, highest to lowest
            break;
        default:
            // No sorting or default sorting
            break;
    }

    // Build query
    const query = {};
    if (search) {
        query.$or = [{name: {$regex: search, $options: "i"}}, {collection: {$regex: search, $options: "i"}}, {tags: {$regex: search, $options: "i"}}];
    }
    if (collection) {
        query.$and = collection;
    }

    // Execute query
    products = await Product.find(query)
    .sort(sortQuery)
    .limit(resultsPerPage)
    .skip(skip);

    productsCount = await Product.find(query).countDocuments();

    res.status(200).json({
        success: true,
        productsCount,
        products
    });
});

// get product
exports.getProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.productId);

    if(!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
});

const calculateDiscountPercent = (price, discountPrice) => {
    return (discountPrice/price)*100
}

// create product --admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
    const { name, description, collection, price, discountPrice, stock } = req.body;
    if(!name || !description || !collection || !price || !discountPrice || !stock) {
        return next(new ErrorHandler("Please fill all the details.", 404)); 
    }
    if(!req.body.images) {
        return next(new ErrorHandler("Please add Product Image.", 404)); 
    }

    if(typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        });

        imagesLinks.push({
            imageId: result.public_id,
            imageUrl: result.secure_url
        })
    }

    req.body.images = imagesLinks;
    req.body.discountPercent = calculateDiscountPercent(price, discountPrice);
    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// update product --admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
    const { name, description, collection, price, discountPrice, stock } = req.body;

    let product = await Product.findById(req.params.productId);

    if(!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    if(!name || !description || !collection || !price || !discountPrice || !stock) {
        return next(new ErrorHandler("Please fill all the details.", 404)); 
    }
    // if(!req.body.images) {
    //     return next(new ErrorHandler("Please add Product Image.", 404)); 
    // }

    if(typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if(images !== undefined) {
        // delete images from cloudinary
        for(let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].imageId);
        }
        
        const imagesLinks = [];
        
        // upload images into cloudinary
        for(let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });
            
            imagesLinks.push({
                imageId: result.public_id,
                imageUrl: result.secure_url
            })
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Product has been saved.",
        product
    })
});

// delete product --admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.productId);

    if(!product) {
        return next(new ErrorHandler("Product not found.", 404)); 
    }

    for(let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].imageId);
    }

    await Product.deleteOne({_id: req.params.productId});

    res.status(200).json({
        success: true,
        message: "Product has been deleted."
    })
});

// get products list - admin
exports.getProductsList = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    const productsCount = await Product.countDocuments();

    res.status(200).json({
        success: true,
        productsCount,
        products
    });
});

// create or update review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.rating = rating,
                review.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review);
        product.reviewsCount = product.reviews.length;
    }

    let average = 0;
    product.reviews.forEach(review => {
        average += review.rating;
    }) 

    product.ratingsCount = average / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Review has been saved."
    })
});

// get reviews of product
exports.getReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviewsCount: product.reviewsCount,
        reviews: product.reviews
    })
});

// delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString());

    let average = 0;
    reviews.forEach(review => {
        average += review.rating;
    }) 

    const ratingsCount = average / reviews.length;

    const reviewsCount = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        reviewsCount,
        ratingsCount
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Review has been deleted."
    })
});

