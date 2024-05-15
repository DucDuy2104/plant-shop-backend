const express = require('express')
const router = express.Router()
const orderController = require('../controller/orders/OrderHistoryController')


//1. Buy 
//method: POST
//url: http://localhost:7000/orders/order
//response: {status: , message: , data: }
router.post('/order', async (req, res, next) => {
    try {
        const { email, products, total, phoneNumber, address } = req.body
        if( !email || !products || !total || !phoneNumber || !address) {
            return res.status(404).json({status: false, message: 'Invalid infomation!'})
        }
        if( products.length == 0) {
            return res.status(404).json({status: false, messgage: 'Empty product!'})
        }
        const data = await orderController.handleBuy(email, products, total, phoneNumber, address)
        return res.status(200).json({status: true, message: 'Order successfully!', data})
    } catch (error) {
        console.log('Buy err: ', error.message)
        return res.status(500).json({status: false, message: 'Order failure!'})
    }
})

//2. get orders 
//method: GET
//url: http://localhost:7000/orders/get?email=?
//response: {status: , message: , data: }
router.get('/get',async (req, res, next) => {
    try {
        const { email , status, page, limit } = req.query
        var query = {};
        if(email) {
            query = {
                ...query,
                email
            }
        }
        if(status) {
            query = {
                ...query,
                status
            }
        }
        const orders=  await orderController.getOrders(query, limit, page)
        return res.status(200).json({status: true, message: 'Get success!', data: orders})
    } catch (error) {
        console.log('Get orders err: ', error.message)
        return res.status(500).json({status: false, message: 'Get orders failure!'})
    }
})



//3. revenue
//method: GET
//url: http://localhost:7000/orders/revenue
//response: {status: , message: , data: }
router.get('/revenue', async (req, res, next) => {
    try {
        var { year }= req.query
        year = year || 2024
        const revenue = await orderController.getMonthlyRevenue(year)
        return res.status(200).json({status: true, message: 'Get success!', data: revenue})
    } catch (error) {
        console.log('Get revenue err: ', error.message)
        return res.status(500).json({status: false, message: 'Get revenue err'})
    }
})


//3. revenue
//method: PUT
//url: http://localhost:7000/orders/xac-nhan?id=?
//response: {status: , message: , data: }
router.put('/:type', async (req, res, next) => {
    try {
        const {type} = req.params
        const {id} = req.query
        if(!id) {
            return res.status(404).json({status: false, message: 'Id not found!'})
        }
        if(!type) {
            return res.status(404).json({status: false, message: 'Type not found!'})
        }
        const result = await orderController.changeStatus(type, id)
        return res.status(200).json({status: true, message: 'Change success!', data: result})
    } catch (error) {
        console.log('Change status err: ', error.message)
        return res.status(500).json({status: false, message:'Change failure!'})
    }
})

module.exports = router