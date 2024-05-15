const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductModel = new Schema({
    name: {type: String, require: true},
    image: {type: Array, default: []},
    price: {type: Number, require: true},
    size: {type: String, default: 'small'},
    origin: {type: String, default: 'Châu Phi'},
    quantity: {type: Number, require:  true},
    category: {type: Object, require: true},
    create_at: {type: Date, default:  Date.now()},
    update_at: {type: Date, default: Date.now()}
})

module.exports = mongoose.models.product || mongoose.model('product', ProductModel)