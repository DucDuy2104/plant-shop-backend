const { CHO_XAC_NHAN, XAC_NHAN, HUY } = require('../../constant/Constants')
const ProductModel = require('../products/ProductModel')
const UserModel = require('../users/UserModel')
const OrderHistoryModel = require('./OrderHistoryModel')


//handle buy
const handleBuy = async (email, products, total, phoneNumber, address) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            throw new Error('Email not found!')
        }

        for (const product of products) {
            const productF = await ProductModel.findOne({ _id: product._id })
            if (!productF) {
                throw new Error('Product not exist!')
            }
            if (product.amount > productF.quantity) {
                throw new Error(`Out of stock for ${productF.name}`)
            }
        }

        for (const product of products) {
            const productF = await ProductModel.findOne({ _id: product._id })
            await ProductModel.findOneAndUpdate({ _id: productF._id }, { quantity: productF.quantity - product.amount })
        }

        const order = new OrderHistoryModel({
            email,
            products,
            total,
            phoneNumber,
            address
        })
        const result = await order.save()
        return result
    } catch (error) {
        console.log('Buy err: ', error.message)
        throw new Error(error.message)
    }
}

//get order
const getOrders = async (query, limit, page) => {
    try {
        limit = limit || 10
        page = page || 1
        skip = (page - 1) * limit
        const orders = await OrderHistoryModel.find(query).skip(skip).limit(limit)
        return orders
    } catch (error) {
        console.log('Get order err: ', error.message)
        throw new Error(error.message)
    }
}

//get revenue
const getMonthlyRevenue = async (year) => {
    try {
        const startYear = new Date(year, 0, 1);
        const endYear = new Date(year, 11, 31);
        const orders = await OrderHistoryModel.find(
            {
                date: {
                    $gte: startYear,
                    $lt: endYear
                }
            }
        );

        let monthlyTotal = Array(12).fill(0);
        for (let i = 0; i < orders.length; i++) {
            let month = orders[i].date.getMonth();

            monthlyTotal[month] += orders[i].total;
        }

        let result = monthlyTotal.map((total, index) => {
            return { month: index + 1, total: total };
        });

        return result;
    } catch (error) {
        console.error('Get revenue err: ', error.message);
        throw new Error(error.message)
    }
};

//change status
const changeStatus = async (type, order_id) => {
    try {
        const order = await OrderHistoryModel.findOne({ _id: order_id })
        if (!order) {
            throw new Error('Order not found!')
        }
        var result;
        switch (type) {
            case 'xac-nhan':
                if (order.status == CHO_XAC_NHAN) {
                    order.status = XAC_NHAN
                    result = await order.save()
                } else {
                    throw new Error('Invalid status')
                }
                break
            case 'huy':
                if (order.status <= XAC_NHAN) {
                    order.status = HUY
                    result = await order.save()
                } else {
                    throw new Error("Invalide status")
                }
                break
            default:
                throw new Error('Type not match!')
        }
        return result
    } catch (error) {
        console.log('Change staus err: ', error.message)
        throw new Error(error.message)
    }
}
module.exports = { handleBuy, getOrders, getMonthlyRevenue, changeStatus }