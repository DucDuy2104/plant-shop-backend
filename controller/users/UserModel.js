const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho user
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    address: {
        type: String,

    },
    phoneNumber: {
        type: String
    },
    carts: {
        type: Array,
        default: []
    },
    orderHistory: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    },
    role:{
        type: Number,
        default: 1
    }, // 1: user, 2: admin
    verificationCode: {
        type: String,
        require: true
    }
});

// Tạo model từ schema
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);
