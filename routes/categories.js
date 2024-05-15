const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/categories/CategoryController')

//1. get categories
//method: GET
//url:  http://localhost:7000/categories/get?page=?&limit=?
//response: {status: , message: , data: }
router.get('/get', async (req, res, next) => {
    try {
        const {page , limit} =  req.query
        const categories = await CategoryController.getAllCategories(page, limit)
        if(!categories) {
            return res.status(404).json({status: false, message: 'Category not found'})
        }
        return res.status(200).json({status: true, message: 'Get category success',data: categories})
    } catch (error) {
        console.log('Get category err: ', error.message)
        return res.status(500).json({status: false, message: 'Get categoru failure!'})
        
    }
})

module.exports = router