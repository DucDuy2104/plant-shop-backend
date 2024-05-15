const mongoose = require('mongoose');
const { CHO_XAC_NHAN } = require('../../constant/Constants');
const Schema = mongoose.Schema


// const productSchema = new Schema({
//     _id
//     name: {type: String, require: true},
//     image: {type: String, require: true},
//     price: {type: Number, require: true},
//     amount: {type: Number, require: true},
//     category: {type: String, require: true}
// })

const orderHistorySchema = new Schema({
    email: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now() },
    products: [],
    total: { type: Number, require: true },
    phoneNumber: { type: String, require: true },
    address: { type: String, require: true },
    status: { type: Number, default: CHO_XAC_NHAN}
});

// Tạo mô hình từ schema
module.exports = mongoose.models.order || mongoose.model('order', orderHistorySchema)
