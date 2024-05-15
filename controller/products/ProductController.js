const ProductModel = require('./ProductModel')
const CategoryModel = require('../categories/CategryModel')
const mongoose = require('mongoose')

// 1. add new product
const addNewProduct = async (name, image, price, size, origin, quantity, category_id) => {
    try {
        const category = await CategoryModel.findOne({ _id: category_id })
        if (!category) {
            throw new Error("Category not found")
        }
        const productF = await ProductModel.findOne({ name: name })
        if (productF) {
            throw new Error("Product existed")
        }
        const product = new ProductModel({
            name, image, price, size, origin, quantity, category
        })
        const result = await product.save()
        return result
    } catch (error) {
        console.log('Add product error: ', error.message)
        throw new Error(error.message)
    }
}

//2. get all plant
const getAllPlant = async (limit, page) => {
    try {
        const skip = (page - 1) * limit
        const category_ids = [new mongoose.Types.ObjectId('65fad1c2a2d9efcb7cdb7070'), new mongoose.Types.ObjectId('65fad1c2a2d9efcb7cdb7071')]
        const plants = await ProductModel.find({ 'category._id': { $in: category_ids } }).skip(skip).limit(limit)
        if (!plants || plants.length === 0) {
            throw new Error("Plants not found")
        }
        return plants
    } catch (error) {
        console.log('Get plant error: ', error.message)
        throw new Error(error.message)
    }
}

//3. get all pot
const getAllPot = async (limit, page) => {
    try {
        const skip = (page - 1) * limit
        const category_id = new mongoose.Types.ObjectId('65fad1c2a2d9efcb7cdb7072')
        const pots = await ProductModel.find({ 'category._id': category_id }).skip(skip).limit(limit)
        if (!pots || pots.length === 0) {
            throw new Error("Pots not found")
        }
        return pots
    } catch (error) {

        console.log('Get pots error: ', error.message)
        throw new Error(error.message)
    }
}


//4. get all accessories
const getAllAccessory = async (limit, page) => {
    try {
        const skip = (page - 1) * limit
        const category_id = new mongoose.Types.ObjectId('65fad1c2a2d9efcb7cdb7073')
        const accessories = await ProductModel.find({ 'category._id': category_id }).skip(skip).limit(limit)
        if (!accessories || accessories.length === 0) {
            throw new Error("Accessory not found")
        }
        return accessories
    } catch (error) {

        console.log('Get accessories error: ', error.message)
        throw new Error(error.message)
    }
}

//5. get all products
const getAllProducts = async (limit, page) => {
    try {
        const skip = (page - 1) * limit
        const products = await ProductModel.find().skip(skip).limit(limit)
        if (!products || products.length === 0) {
            throw new Error("Products not found")
        }
        return products
    } catch (error) {
        console.log('Get products error: ', error.message)
        throw new Error(error.message)
    }
}

//6. get product by id
const getProductById = async (product_id) => {
    try {
        const product = await ProductModel.findOne({ _id: product_id })
        if (!product) {
            throw new Error("Product not found")
        }
        return product
    } catch (error) {
        console.log('Get products error: ', error.message)
        throw new Error(error.message)
    }
}

//7. update products
const updateProducts = async (product_id, name, image, price, size, origin, quantity) => {
    try {
        const product = await ProductModel.findOne({ _id: product_id })
        if (!product) {
            throw new Error("Product not found")
        }
        name = name || product.name
        image = image || product.image
        price = price || product.price
        size = size || product.size
        origin = origin || product.origin
        quantity = quantity || product.quantity
        const result = await ProductModel.findByIdAndUpdate(product_id, { name, image, price, size, origin, quantity, update_at: Date.now() }, { new: true })
        return result
    } catch (error) {
        console.log('Update products error: ', error.message)
        throw new Error(error.message)
    }
}


// 8. delete product
const deleteProduct = async (product_id) => {
    try {
        const result = await ProductModel.findOneAndDelete({ _id: product_id });
        if (!result) {
            throw new Error('Product not found');
        }
        return result;
    } catch (error) {
        console.log('Delete products error: ', error.message);
        throw new Error(error.message);
    }
};

//9. search product
const searchProduct = async (key) => {
    try {
        const products = await ProductModel.find({
            name: { $regex: key, $options: 'i' } // search with case insensitive 
        });
        if(!products || products.length == 0){
            throw new Error("Products not found!")
        }
        return products
    } catch (error) {
        console.log('Delete products error: ', error.message);
        throw new Error(error.message);
    }
}



module.exports = { addNewProduct, getAllPlant, getAllAccessory, getAllPot, getAllProducts, getProductById, updateProducts, searchProduct, deleteProduct }