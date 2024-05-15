const CategryModel = require('./CategryModel')


//1. get all category
const getAllCategories = async (page, limit) => {
    try {
        page = page || 1
        limit = limit || 10
        const skip = (page - 1) * limit
        const categories = await CategryModel.find().skip(skip).limit(limit)
        if(!categories) {
            throw new Error('Category not found!')
        }
        return categories
    } catch (error) {
        console.log('Get category err: ', error.message)
        throw new Error('Get category failure!')
    }
}


module.exports = { getAllCategories }


