const { generateVerificationCode } = require('../../global-function/renderCode')
const { sendEmail } = require('../../global-function/sendVerification')
const UserModel = require('./UserModel')
var bcrypt = require('bcryptjs')
const OrderHistoryModel = require('../orders/OrderHistoryModel')

// 1. register
const register = async (name, email, password) => {
    try {
        var user = await UserModel.findOne({ email: email })
        if (user) {
            throw new Error("Email was used")
        }

        var salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);


        user = new UserModel({
            name,
            email,
            password,
            verificationCode: generateVerificationCode()
        })
        const result = await user.save()
        const userObj = result.toObject()
        sendEmail(email, userObj.verificationCode)
        delete userObj.password
        delete userObj.verificationCode
        return userObj
    } catch (error) {
        console.log('Register error: ', error.message)
        throw new Error(error.message)
    }
}

// 2. login
const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            throw new Error("Email not found")
        }
        if (!(bcrypt.compareSync(password, user.password))) {
            throw new Error("Invalid password")
        }
        if (!user.verified) {
            throw new Error("Email not verified!")
        }
        const userObj = user.toObject()
        delete userObj.password
        delete userObj.verificationCode
        return userObj;
    } catch (error) {
        console.log('Login error: ', error.message)
        throw new Error(error.message)
    }
}

//3. update
const updateUser = async (email, name, address, phone, image) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            throw new Error("User not found")
        }
        name = name || user.name
        address = address || user.address
        phone = phone || user.phone
        image =  image || user.image
        const result = await UserModel.findOneAndUpdate({ email: email }, { name: name, address: address, phone: phone, image: image, update_at: Date.now() }, {new:  true})
        return result
    } catch (error) {
        console.log('Update error: ', error.message)
        throw new Error(error.message)
    }
}

//4. verify
const verifyUser = async (email, verificationCode) => {
    try {
        const user = await UserModel.findOne({ email: email, verificationCode: verificationCode })
        if (!user) {
            throw new Error("User not found")
        }
        const result = await UserModel.findOneAndUpdate({ verificationCode: verificationCode }, { verified: true }, { new: true })
        return result
    } catch (error) {
        console.log('Verify error: ', error.message)
        throw new Error(error.message)
    }
}


module.exports = { register, login, updateUser, verifyUser }