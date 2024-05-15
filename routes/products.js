const express = require('express');
const router = express.Router();
const ProductController = require('../controller/products/ProductController');
const ProductModel = require('../controller/products/ProductModel');


// 1. add new product
// method: POST
// url: /localhost:7000/products/add-new
// response: {status: ,message: , data}
router.post('/add-new', async (req, res, next) => {
    try {
        const { name, image, price, size, origin, quantity, category_id } = req.body
        if (!name || !image || !price || !size || !origin || !quantity || !category_id) {
            return res.status(404).json({ status: false, message: "Invalid infomation" })
        }
        const result = await ProductController.addNewProduct(name, image, price, size, origin, quantity, category_id)
        return res.status(200).json({ status: true, message: 'Add successful', data: result })
    } catch (error) {
        console.log('Add Err: ', error.message)
        return res.status(500).json({ status: false, message: 'Add failure' })
    }
})

// 2. get product
// method: GET
// url: /localhost:7000/products/plants?page=3&limit=2
// response: {status: ,message: , data}
router.get('/get/:type', async (req, res, next) => {
    try {
        var { page, limit } = req.query
        const { type } = req.params
        page = page || 1
        limit = limit || 10
        var data;
        switch (type) {
            case 'plants':
                data = await ProductController.getAllPlant(limit, page)
                break;
            case 'pots':
                data = await ProductController.getAllPot(limit, page)
                break;
            case 'accessories':
                data = await ProductController.getAllAccessory(limit, page)
                break;
            case 'all':
                data = await ProductController.getAllProducts(limit, page)
                break;
            default: 
                return res.status(404).json({status: false, message: 'type not found'})
        }
        return res.status(200).json({ status: true, message: 'Get products successful', data: data })
    } catch (error) {
        console.log('Get products err: ', error.message)
        return res.status(500).json({ status: false, message: 'Get productss failure' })
    }
})

// 3. get product by id
// method: GET
// url: /localhost:7000/products?id=?
// response: {status: ,message: , data}
router.get('/',async(req, res, next) => {
    try {
        const {id} =  req.query
        if(!id) {
            return res.status(404).json({status: false, message: 'Id not found'})
        }
        const data = await ProductController.getProductById(id)
        return res.status(200).json({status: true, message: 'Get product successfull', data: data})
    } catch (error) {
        console.log('Get product err: ', error.message)
        return res.status(500).json({ status: false, message: 'Get products failure' })
    }
})

// 4. update product
// method: GET
// url: /localhost:7000/products/update?id=?
// response: {status: ,message: , data}
router.post('/update', async(req, res, next) => {
    try {
        const {id} =  req.query
        const {name , image, price, size, origin, quantity} =  req.body
        if(!id) {
            return res.status(404).json({status: false, message:'Id not found'})
        }
        const data =await ProductController.updateProducts(id, name,image,price, size, origin, quantity)
        return res.status(200).json({status: true, message: 'Update successfull', data})
    
    } catch (error) {
        console.log('Update product err: ', error.message)
        return res.status(500).json({ status: false, message: 'Update products failure' })
        
    }
})

// 5. delete product
// method: DELETE
// url: /localhost:7000/products/delete?id=?
// response: {status: ,message: , data}

router.delete('/delete', async (req, res, next)=> {
    try {
        const { id } = req.query
        if(!id) {
            return res.status(404).json({status: false, message: 'ID not found'})
        }
        const result =  await ProductController.deleteProduct(id)
        return res.status(200).json({status: true, message:'Delete success', data: result})
    } catch (error) {
        console.log('Delete product err: ', error.message)
        return res.status(500).json({ status: false, message: 'Delete products failure' })
    }
})

// 6. search product
// method: GET
// url: /localhost:7000/products/search?key=?
// response: {status: ,message: , data}
router.get('/search', async (req, res, next)=> {
    try {
        const { key } = req.query
        if(!key) {
            return res.status(404).json({status: false, message:'Key not found'})
        }
        const products = await ProductController.searchProduct(key)
        return res.status(200).json({status: true, message: 'Get success!', data: products})
    } catch (error) {
        console.log('Search product err: ', error.message)
        return res.status(500).json({ status: false, message: 'Search products failure' })
    }
})

module.exports = router